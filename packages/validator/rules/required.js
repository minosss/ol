module.exports = (value, options, {rules}) => {
  if (rules.nullable && value !== undefined) return true
  if (value === undefined || value === null) return false
  if (typeof value === 'string' && value === '') return false
  if (Array.isArray(value)) return value.length > 0
  return true
}
