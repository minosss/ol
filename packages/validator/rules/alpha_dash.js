const alphaDash = /^[0-9A-Z_-]+$/i

module.exports = (value) => {
  return (typeof value === 'string' || typeof value === 'number') && alphaDash.test(value)
}
