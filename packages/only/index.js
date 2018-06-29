const struct = require('./struct')

function hasParse(target, method) {
  return target && method in target && 'function' === typeof target[method]
}

class Parser {
  constructor ({ tagName = 'only', delimiter = ',', omitempty = true, omitemptyValues = [null, undefined], ...opts }) {
    this.options = {
      // only -> $only
      tagName: tagName.padStart(tagName.length+1, '$'),
      delimiter,
      omitempty,
      omitemptyValues,
      ...opts
    }
  }

  getParse (type) {
    const methodName = 'parse' + type[0].toUpperCase() + type.substr(1)
    let method = v => v || null
    if (hasParse(this.options, methodName)) {
      method = this.options[methodName]
    } else if (hasParse(this, methodName)) {
      method = this[methodName].bind(this)
    }
    return method
  }

  parseTag (val) {
    if (val === '-') {
      return {
        ignore: true
      }
    }
    const { delimiter } = this.options
    const values = val.split(delimiter).map(t => t.trim())
    return {
      alias: values[0],
      ignore: false,
      omitempty: values.includes('omitempty'),
      type: values[2]
    }
  }

  parseNumber (so, st) {
    return parseFloat(so)
  }

  parseString (so, st) {
    return so.toString()
  }

  parseArray (so, st) {
    if (!so || !Array.isArray(so)) return []
    return so.map(s => {
      const type = typeof s
      return this.getParse(type)(s, st)
    })
  }

  parseObject (so, st) {
    if (!so || !st) return null
    const { tagName, omitempty, omitemptyValues } = this.options
    return Object.keys(st)
      .filter(k => !k.startsWith('$'))
      .reduce((ret, k) => {
        const prop = st[k]

        const t = this.parseTag(prop[tagName] || k)
        if (t.ignore) return ret

        const propVal = so[k]
        if (omitempty && t.omitempty && omitemptyValues.includes(propVal))  return ret

        // NOTE: typeof [0, 1] will oupput obejct.
        const type = t.type ? t.type : Array.isArray(propVal) ? 'array' : typeof propVal

        ret[t.alias||k] = this.getParse(type)(propVal, prop)
        return ret
      }, {})
  }
}

module.exports = function (so, st = {}, opts = {}) {
  if (!so) return {}
  const parser = new Parser(opts)
  const s = struct(st)
  const res = parser.parseObject(so, s)
  return res
}
