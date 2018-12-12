# validator

验证，类似 `laravel` 的validation功能，有些规则用的 `validator.js`，获取值参考了 `get-value`。
反馈信息还没想好要咋弄，大概是模板加参数吧。

## 安装

使用npm:

```sh
$ npm i @shayin/validator
```

使用yarn:

```sh
$ yarn add @shayin/validator
```

## 例子

### 字符串

```js
// 字母
validator('foobar', 'alpha') // => []
// 字母加数字
validator('foo123', 'alpha|numeric') // => ['alpha', 'numeric']
// 数字
validator('123', 'alpha|numeric') // => ['alpha']
validator('123', 'numeric') // => []
```

### 简单数组

```js
validator([1, 2, 3], 'array|numeric') // => []
validator([1, 2, 3], 'array|string') // => ['string']
```

### 对象数组

```js
// 验证数组下的对象foo是数字，bar是字母+数字
validator([{ foo: 1, bar: 'bar1' }, { foo: 2, bar: 'bar2' }], { '*.foo': 'numeric', '*.bar': 'alpha_num' })
```

### 简单对象属性

```js
// 字符串
validator({ foo: 'bar' }, { foo: 'string' }) // => []
// 属性值为数字，并且在1-4内
validator({ foo: 2 }, { foo: 'numeric|in:1,2,3,4' }) // => []
```

### 多层嵌套数组

```js
validator([
  [{ foo: 1 }, { foo: 1 }],
  [{ foo: 2 }, { foo: 3 }],
  [{ foo: 3 }, { foo: 4 }],
], { '*.*.foo': 'numeric' }) // => []
```

## 支持规则

TODO

## 许可

```
Copyright (c) 2018 mino <minoscc+dev@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
