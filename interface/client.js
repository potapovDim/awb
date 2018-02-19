const elementsInitializer = require('./element')

const fetchy = require('./fetchy')

const LOCAL = ['localhost', '127.0.0.1']

const { InterfaceError } = require('./interfaceError')

const { Keys } = require('./event/keys')

const initializator = require('./core')

const path = require('path')

function StartProvider() {
  const { fork } = require('child_process')

  const forked = fork(path.resolve(__dirname, './webdriver.js'))

  forked.send({ msg: 'startStandalone' })

  return new Promise((resolve) => {
    forked.on('message', ({ msg }) => {
      if (msg === 'server started') {
        resolve(forked)
      } else if (msg === 'selenium already started on port 4444') {
        forked.kill()
        console.log('selenium already started on port 4444')
      }
      resolve()
    })
  }).then((proc) => {
    if (proc) {
      proc.on('message', (msg) => {
        if (msg = 'server stoped') {
          proc.kill()
        }
      })
      return proc
    }
  })
}

function WaitProviderStop(proc, parentProc) {
  return new Promise((resolve) => {

    proc.on('message', (msg) => {
      if (msg === 'server stoped') {
        resolve()
      }
    })
    proc.send({ msg: 'stop' })
  })
}

function initializatorClient(requests, capabilities) {
  const {
    resizeWindow,
    killSession,
    initSession,
    goToUrl,
    getUrl,
    getTitle,
    executeScript,
    sleep,
    waitCondition
  } = requests
  class Client {

    constructor() {
      this.Keys = Keys
      this.sessionId = null
      this.capabilities = capabilities
      this.seleniumProc = null
    }

    get localStorage() {
      return {
        set: async (key, value) => {
          await executeScript(this.sessionId, function (data) {
            const [key, value] = data
            localStorage.setItem(key, value)
          }, [key, value])
        },
        get: async (key) => {
          const data = await executeScript(this.sessionId, function (data) {
            const [key] = data
            return localStorage.getItem(key)
          }, key)
          return data
        },
        clear: async () => {
          await executeScript(this.sessionId, function () { localStorage.clear() })
        },
        getAll: async () => {
          const data = await executeScript(this.sessionId, function () {
            return JSON.stringify(localStorage)
          })
          return JSON.parse(data)
        }
      }
    }
    get sessionStorage() {
      return {
        set: async (key, value) => {
          await executeScript(this.sessionId, function (data) {
            const [key, value] = data
            sessionStorage.setItem(key, value)
          }, [key, value])
        },
        get: async (key) => {
          const data = await executeScript(this.sessionId, function (data) {
            const [key] = data
            return sessionStorage.getItem(key)
          }, key)
          return data
        },
        clear: async () => {
          await executeScript(this.sessionId, function () { sessionStorage.clear() })
        },
        getAll: async () => {
          const data = await executeScript(this.sessionId, function () {
            return JSON.stringify(sessionStorage)
          })
          return JSON.parse(data)
        }
      }
    }

    async refresh() {
      await refreshCurrentPage(this.sessionId)
    }

    async back() {
      await backHistory(this.sessionId)
    }

    async forward() {
      await forwardHistory(this.sessionId)
    }

    async takeScreenshot() {
      !this.sessionId
        && await this.getSession()
      const data = await getScreenshot(this.sessionId)
      return data.value
    }

    async waitForUrlIncludes(url, time) {
      !this.sessionId
        && await this.getSession()
      const condition = await waitCondition(getUrl.bind(this, this.sessionId), time)
    }

    async resizeWindow(width, height) {
      if (typeof width !== 'number' || typeof height !== 'number') {
        throw new InterfaceError('Width and height should be a number')
      }
      !this.sessionId
        && await this.getSession()
      await resizeWindow(this.sessionId, { width, height })
    }

    async startSelenium() {
      const proc = await StartProvider()
      this.seleniumProc = proc
    }

    async switchToFrame(selector) {
      const body = await toFrame(this.sessionId, selector)
    }

    async stopSelenium() {
      await WaitProviderStop(this.seleniumProc, process)
    }

    async getSession() {
      const { sessionId } = await initSession(this.capabilities)
      this.sessionId = sessionId
      if (!global.___sessionId) {
        global.___sessionId = this.sessionId
      }

      if (this.timeouts) {
        await setScriptTimeout(this.sessionId, this.timeouts)
      }
    }

    async closeCurrentTab() {
      const resp = await closeCurrentTab(this.sessionId)
    }

    async executeScript(script, ...args) {
      const result = await executeScript(this.sessionId, script, args)
      if (result.value) {
        return result.value
      }
    }

    async executeScriptAsync(script, ...args) {
      const result = await executeScriptAsync(this.sessionId, script, args)
      if (result.value) {
        return result.value
      }
    }

    async getUrl() {
      if (!this.sessionId) {
        console.error('Cant do it, session does not open')
      }
      const { value } = await getUrl(this.sessionId)
      return value
    }

    async sleep(time) {
      await sleep(time)
    }

    async getTitle() {
      if (!this.sessionId) {
        console.error('Cant do it, session does not open')
      }
      const { value } = await getTitle(this.sessionId)
      return value
    }

    async goTo(url) {
      !this.sessionId
        && await this.getSession()
      await goToUrl(this.sessionId, url)
    }

    async getBrowserTabs() {
      !this.sessionId
        && await this.getSession()
      const { value } = await getCurrentWindowHandles(this.sessionId)
      return value
    }

    async getCurrentBrowserTab() {
      !this.sessionId
        && await this.getSession()
      const { value } = await getCurrentWindowHandle(this.sessionId)
      return value
    }

    async switchToTab(index) {
      const tabs = await this.getBrowserTabs()
      if (tabs.length <= index) {
        console.error('tabs quantity less then index')
        return
      }
      const { value } = await openTab(this.sessionId, tabs[index])
    }

    async closeBrowser() {
      if (this.sessionId) {
        if (this.sessionId === global.___sessionId) global.___sessionId = null
        const { status } = await killSession(this.sessionId)
        this.sessionId = null
      }
    }
  }

  return { Client }
}

const browserDefaultCaps = {
  javascriptEnabled: true,
  acceptSslCerts: true,
  platform: 'ANY'
}

const defautlOpts = {
  withStandalone: true,
  remote: false,
  directConnect: false,
  browser: 'chrome',
  host: 'localhost',
  port: 4444,
  requestTime: 5000,
  path: '/wd/hub/session',
  timeout: 5000
}

module.exports = function (opts = defautlOpts) {

  let baseRequestUrl = null

  if (!opts['browserCaps']) {
    if (!opts['browser']) {
      opts['browser'] = 'chrome'
    }
    browserDefaultCaps['browserName'] = opts['browser']
    opts['browserCaps'] = browserDefaultCaps
  }

  const { withStandalone, remote, directConnect, browser, host, port, path, timeout, browserCaps } = opts

  if (LOCAL.includes(host) && !remote) {
    baseRequestUrl = withStandalone ? `http://127.0.0.1:${port}/wd/hub/` : `http://127.0.0.1:${port}/`
    console.log('local')
  } else if (remote) {
    baseRequestUrl = `${host}${port ? ':' + port + '/' : '/'}`
  }

  const baseRequest = {
    get: fetchy.bind(fetchy, "GET", baseRequestUrl, timeout),
    post: fetchy.bind(fetchy, "POST", baseRequestUrl, timeout),
    put: fetchy.bind(fetchy, "PUT", baseRequestUrl, timeout),
    delete: fetchy.bind(fetchy, "DELETE", baseRequestUrl, timeout)
  }

  const requests = initializator(baseRequest)

  const { Client } = initializatorClient(requests, browserCaps)

  const client = new Client()

  const { Element, Elements } = elementsInitializer(requests, client)

  return {
    element: (...args) => new Element(...args),
    elements: (...args) => new Elements(...args),
    client
  }
}
// module.exports.initiatorInstance = Initiator
// module.exports.browserInstance = Browser
