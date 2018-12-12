const concat = require('lodash.concat')
const multiChar = '*'

function cached(fn) {
  const cache = Object.create(null)
  return function(str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

function isObject(obj) {
  return obj != null && typeof obj === 'object' && Array.isArray(obj) === false
}

function isFunction(fn) {
  return typeof fn === 'function'
}

function isValidObject(val) {
  return isObject(val) || Array.isArray(val) || typeof val === 'function';
}

function getValue(target, path, defaultValue) {
  if (!isValidObject(target)) {
    return typeof defaultValue !== 'undefined' ? defaultValue : target
  }

  if (typeof path === 'number') {
    path = String(path)
  }

  let segs = Array.isArray(path) ? path : path.split('.')
  let len = segs.length
  let idx = 0
  let isArr = false
  let value = target

  do {
    let prop = segs[idx]
    let isArray = Array.isArray(value)

    if (prop in value) {
      value = value[prop]
    } else if (isArr && prop !== multiChar && Array.isArray(value)) {
      let _path = segs.slice(idx)
      value = value.map(val => getValue(val, _path))
    } else if (prop === multiChar && Array.isArray(value)) {
      if (isArr) {
        // *.* flatten nested array
        value = concat.apply(this, value)
      }
      isArr = true
    } else if (isArray) {
      value = value.map(val => val[prop])
    }
  } while (++idx < len && isValidObject(value))

  if (idx === len) {
    return value
  }

  return defaultValue
}

module.exports = {
  cached,
  getValue,
  isObject,
  isFunction
}
