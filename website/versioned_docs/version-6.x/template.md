---
id: version-6.x-babel-template
title: babel-template
sidebar_label: babel-template
original_id: babel-template
---

在计算机科学中，这被称为 quasiquotes(逆符号) 的实现。

## 安装

```sh
npm install --save-dev babel-template
```

## 使用

```js
import template from "babel-template";
import generate from "babel-generator";
import * as t from "babel-types";

const buildRequire = template(`
  var IMPORT_NAME = require(SOURCE);
`);

const ast = buildRequire({
  IMPORT_NAME: t.identifier("myModule"),
  SOURCE: t.stringLiteral("my-module")
});

console.log(generate(ast).code);
```

```js
const myModule = require("my-module");
```

## API

### `template(code, [opts])`

#### code

类型: `string`

#### options

`babel-template` 接收 [babylon] 中的所有选项，并为它自己指定一些默认值：

* `allowReturnOutsideFunction` 默认设置为 `true` 。
* `allowSuperOutsideMethod` 默认设置为 `true` 。

##### preserveComments

类型: `boolean`
默认值: `false`

将其设置为 `true` 以保留来自 `code` 参数的任何注释.

#### 返回值

`babel-template` 返回一个带有可选替换对象一起调用的 `function` 。有关示例，请参阅用法部分。

[babylon]: https://github.com/babel/babylon#options
