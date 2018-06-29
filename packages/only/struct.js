const SELF_SIGN = '$'
const TAG_REGEXP = new RegExp('((.*?):"(.*?)")\\s?', 'g')

module.exports = function field (obj = {}) {
  function tag (val) {
    let tags = {}
    let tag
    while ((tag = TAG_REGEXP.exec(val)) != null) {
      tags[`$${tag[2]}`] = tag[3]
    }
    return tags
  }

  let struct = {}
  if (obj[SELF_SIGN]) {
    struct = tag(obj[SELF_SIGN])
    delete obj[SELF_SIGN]
  }
  return Object.keys(obj).reduce(function(ret, key) {
    let val = obj[key]
    if ('string' === typeof val) {
      ret[key] = tag(val)
    } else {
      ret[key] = field(val)
    }
    return ret
  }, struct)
}
