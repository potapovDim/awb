const { expect } = require('chai')

const client = require('../interface/client')

const Google = require('./po/google.po')

describe('Google base example', () => {
  let browser = null

  const baseURL = 'https://www.google.com.ua/'

  const googlePage = new Google()

  before(async () => {

    browser = client().chrome()
    await browser.startSelenium()
    await browser.goTo(baseURL)
  })

  after(async () => {
    await browser.closeBrowser()
    await browser.stopSelenium()
  })

  it('search git hub potapovDim', async () => {
    await googlePage.find('git hub potapovDim')
    expect(await googlePage.getResultSearchText()).to.includes('potapovDim')
  })
})
