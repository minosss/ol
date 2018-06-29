# @shayin/only

[![](https://img.shields.io/npm/v/@shayin/only.svg)](https://www.npmjs.com/package/@shayin/only)
[![](https://img.shields.io/npm/dm/@shayin/only.svg)](https://www.npmjs.com/package/@shayin/only)

* [x] tag

## Install

```
npm i @shayin/only
```

## Options

* `omitempty`(default: `true`): ignore if prop includes in `omitemptyValues`
* `omitemptyValues`(defaults: `[null, undefined]`): values of omitempty
* `parse{PropType}`: you can define your custom parse method here. like `parseString`, typeof is used by default or you can define in the tag. eg: `type:"foo"` and add `parseFoo` method

## Example

* `json`: `(name),[omitempty],[type]`, eg: `json:"foo,omitempty"`

```js
const only = require('@shayin/only')

let p = {}
p.user = {
    firstname: 'foo',
    lastname: null
}
p.count = 2.14
p.comments = [{
    user: 'bb',
    createAt: '2018-06-11 14:23:24'
}, {
    user: 'aa',
    createAt: '2018-06-11 14:23:24'
}]

const res = only(p, {
  user: {
    firstname: `json:"first_name" xml:"FirstName"`,
    lastname: `json:"last_name,omitempty" xml:"LastName"`
  },
  count: `type:"number" xml:"Count"`,
  comments: {
    $: `json:"cms" type:"array"`,
    user: `json:"author"`,
    createAt: `json:"create_at,,timestamp"`
  }
}, {
  // use json tag.
  tagName: 'json',
  parseTimestamp: (so, st) => {
    // format date
    return new Date(so).getTime() / 1000
  }
})

console.log(res)

/*
output
{ user: { first_name: 'foo' },
  count: 2.14,
  cms:
   [ { author: 'bb', create_at: 1528698204 },
     { author: 'aa', create_at: 1528698204 } ] }
*/
```

## License

MIT.
