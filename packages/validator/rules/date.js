module.exports = (value) => {
  return !isNaN(Date.parse(value))
}
