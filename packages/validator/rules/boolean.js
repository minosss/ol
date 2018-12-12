const acceptable = [true, false, 0, 1, '0', '1']

module.exports = (value) => {
  return acceptable.includes(value)
}
