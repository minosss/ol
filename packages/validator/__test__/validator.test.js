const { oneOf, validator } = require('../index')

test('测试验证简单的对象', () => {
  const obj = { foo: { bar: 'bar' } }
  expect(validator([{ foo: 1, bar: 'bar1' }, { foo: 2, bar: 'bar2' }], { '*.foo': 'numeric', '*.bar': 'alpha_num' })).toEqual([])
})

test('验证错误的数字', () => {
  const str = 'a123'
  const rule = 'numeric'
  expect(validator(str, rule).join('')).toEqual('numeric')
})

test('验证多个规则通过其中一个oneOf', () => {
  const str = '3'
  const rule = oneOf('array', 'numeric|in:3,4')
  expect(validator(str, rule)).toBe(true)
})

test('测试包含对象的数组', () => {
  const arr = [{ a: 1}, { a: 2 }]
  const rule = { '*.a': 'numeric' }
  expect(validator(arr, rule)).toEqual([])
})
