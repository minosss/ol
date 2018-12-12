const alpha = /^[A-Z]+$/i

module.exports = (value) => {
  return typeof value === 'string' && alpha.test(value)
}
