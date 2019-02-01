const convert = require('../lib/convert')

module.exports = async function (context, request) {
  if (request.body) {
    let body = request.body
    const result = await convert(context, body)
    context.response = {
      body: result
    }
  } else {
    context.response = {
      status: 400,
      body: 'Please see https://github.com/telemark/azure-function-convert-pdf for usage'
    }
  }
  return context
}
