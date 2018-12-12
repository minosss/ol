module.exports = (value) => {
  try {
    const obj = JSON.parse(value)
    return !!obj && typeof obj === 'object'
  } catch(e) {}
  return false
}
