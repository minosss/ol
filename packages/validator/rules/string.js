const isString = (value, options, rules) => {
  return typeof value === 'string' && (value !== '' || !!rules.nullable)
}

module.exports = (value, options, {rules}) => {
  if (Array.isArray(value)) {
    return value.every(val => isString(val, options, rules))
  }
  return isString(value, options, rules)
}
