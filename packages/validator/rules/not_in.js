const validateIn = require('./in')

module.exports = (value, options) => {
  return !validateIn(value, options)
}
