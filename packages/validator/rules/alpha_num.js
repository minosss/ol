const alphaNum = /^[0-9A-Z]+$/i

module.exports = (value) => {
  return (typeof value === 'string' || typeof value === 'number') && alphaNum.test(value)
}
