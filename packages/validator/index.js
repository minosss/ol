const Rules = require('./rules')
const { isObject, isFunction, cached, getValue } = require('./utils')

const parseRule = cached((rule) => {
  let params = []
  const name = rule.split(':')[0]
  if (rule.includes(':')) {
    params = rule.split(':')[1].split(',').map(str => str.trim())
  }
  return { name, params }
})

const parseRules = cached((rules) => {
  return rules.split('|').reduce(function(prev, name) {
    let rule = parseRule(name)
    if (rule.name) {
      prev[rule.name] = rule.params
    }
    return prev
  }, {})
})

/**
 *
 */
function oneOf(...rules) {
  return (target) => {
    return rules.some(rule => {
      if (isFunction(rule)) {
        return rule(target)
      } else if (typeof rule === 'string') {
        let _rules = parseRules(rule)
        return Object.keys(_rules).every(_rule => {
          return Rules[_rule] && Rules[_rule].call(this, target, _rules[_rule], { target, rules: _rules })
        })
      }
      return false
    })
  }
}

/**
 *
 */
function validator(target, rules, options = {}) {
  let errors = []

  if (typeof rules === 'string') {
    let _rules = parseRules(rules)
    for (let rule in _rules) {
      if (Rules[rule] && Rules[rule].call(this, target, _rules[rule], { target, rules: _rules }) !== true) {
        errors.push(rule)
      }
    }
  } else if (isFunction(rules)) {
    return rules(target)
  } else if (isObject(rules)) {
    for (let path in rules) {
      let fieldRules = parseRules(rules[path])
      let fieldValue = getValue(target, path, [])

      for (let rule in fieldRules) {
        if (Rules[rule]) {
          let arr = Array.isArray(fieldValue) ? fieldValue : [fieldValue]
          for (let val of arr) {
            if (Rules[rule].call(this, val, fieldRules[rule], { target, rules: fieldRules }) !== true) {
              errors.push(`${rule}: ${val} is not validated value.`)
            }
          }
        }
      }
    }
  }

  return errors
}

module.exports = {
  validator,
  oneOf
}
