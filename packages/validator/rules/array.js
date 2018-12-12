module.exports = (value, options, {rules}) => {
  return Array.isArray(value) && (value.length > 0 || !!rules.nullable)
}
