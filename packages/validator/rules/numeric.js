const numeric = /^[+-]?([0-9]*[.])?[0-9]+$/
const numericNoSymbols = /^[0-9]+$/

module.exports = (value) => {
  if (Array.isArray(value)) {
    return value.every(val => numeric.test(String(val)))
  }
  return numeric.test(String(value))
}
