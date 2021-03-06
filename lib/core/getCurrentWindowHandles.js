const getLocalEnv = require('./env')

const {baseOptions, urlPathes} = getLocalEnv()

module.exports = function name(request) {
  return async function(sessionId, options) {
    if(!options) options = {...baseOptions}
    const {body} = await request.get(urlPathes.windowHandles(sessionId), null, options)
    return body
  }
}
