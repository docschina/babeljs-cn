---
id: version-6.x-babel-plugin-transform-runtime
title: babel-plugin-transform-runtime
sidebar_label: transform-runtime
original_id: babel-plugin-transform-runtime
---

注意：例如 `"foobar".includes("foo")` 等实例方法将不起作用，因为这需要修改现有的内置插件（此时使用 [`babel-polyfill`](babel-polyfill)）。

## 为什么?

Babel 使用了非常小的 helpers 来实现诸如 `_extend` 等常用功能。默认情况下，它将被添加到每个通过 require 引用它的文件中。这种重复（操作）有时是不必要的，特别是当你的应用程序被拆分为多个文件时。

这时则需要使用 `transform-runtime`：所有的 helper 都会引用模块 `babel-runtime`，以避免编译输出的重复问题。这个运行时会被编译到你的构建版本当中。

这个转译器的另外一个目的就是为你的代码创建一个沙盒环境。如果你使用了 [babel-polyfill](babel-polyfill)，它提供了诸如 `Promise`，`Set` 以及 `Map` 之类的内置插件，这些将污染全局作用域。虽然这对于应用程序或命令行工具来说可能是好事，但如果你的代码打算发布为供其他人使用的库，或你无法完全控制代码运行的环境，则会成为问题。

转译器将这些内置插件起了别名 `core-js`，这样你就可以无缝的使用它们，并且无需使用 polyfill。

请参阅 [Technical details](#technical-details) 以获取更多信息，可以了解它如何工作以及发生转换的类型。

## 安装

**注意 - 生产依赖 vs. 开发依赖**

在大多数情况下，你应该安装 `babel-plugin-transform-runtime` 作为开发依赖（使用 `--save-dev`）。

```sh
npm install --save-dev babel-plugin-transform-runtime
```

并且将 `babel-runtime` 作为生产依赖（使用 `--save`）。

```sh
npm install --save babel-runtime
```

转译插件通常只用于开发，但你已部署/已发布的代码依赖于运行时（runtime）。有关更多详细信息，请参阅以下示例。

## 用法

### 通过 `.babelrc`（推荐）

将以下内容添加到你的 `.babelrc` 文件中：

未包含选项：

```json
{
  "plugins": ["transform-runtime"]
}
```

包含选项:

```json
{
  "plugins": [
    ["transform-runtime", {
      "helpers": false,
      "polyfill": false,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }]
  ]
}
```

### 通过 CLI

```sh
babel --plugins transform-runtime script.js
```

### 通过 Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-runtime"]
});
```

## 选项

### `helpers`

`boolean`， 默认为 `true`。

是否切换将内联（inline）的 Babel helper（`classCallCheck`，`extends` 等）替换为对 `moduleName` 的调用。

欲了解更多，请查阅 [Helper aliasing](#helper-aliasing)。

### `polyfill`

`boolean`，默认为 `true`。

是否切换新的内置插件（`Promise`，`Set`，`Map`等）为使用非全局污染的 polyfill。

欲了解更多，请查阅 [`core-js` aliasing](#core-js-aliasing)。

### `regenerator`

`boolean`，默认为 `true`。

是否切换 generator 函数为不污染全局作用域的 regenerator 运行时。

欲了解更多，请查阅 [Regenerator aliasing](#regenerator-aliasing)。

### `moduleName`

`string`，默认为 `"babel-runtime"`。

当引入 helper 时，设置要使用的模块的名称/路径。

示例：

```json
{
  "moduleName": "flavortown/runtime"
}
```

```js
import extends from 'flavortown/runtime/helpers/extends';
```

## Technical details

`runtime` 编译器插件做了以下三件事：

* 当你使用 generators/async 函数时，自动引入 `babel-runtime/regenerator` 。
* 自动引入 `babel-runtime/core-js` 并映射 ES6 静态方法和内置插件。
* 移除内联的 Babel helper 并使用模块 `babel-runtime/helpers` 代替。

这意味着什么？基本上，你可以使用诸如 `Promise`，`Set`，`Symbol` 等内置函数，以及所有需要 polyfill 来完成且不带来全局污染的 Babel 功能，因此非常适合作为库使用。

确保你引入 `babel-runtime` 作为依赖。

### Regenerator aliasing

每当你使用 generator 函数或 async 函数时：

```javascript
function* foo() {

}
```

生成如下内容：

```javascript
"use strict";

var _marked = [foo].map(regeneratorRuntime.mark);

function foo() {
  return regeneratorRuntime.wrap(function foo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}
```

这并不理想，因为它依赖于被包含的 regenerator 运行时，这会污染全局作用域。

然而，使用 `runtime` 转译器，它被编译为：

```javascript
"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [foo].map(_regenerator2.default.mark);

function foo() {
  return _regenerator2.default.wrap(function foo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}
```

这意味着你可以使用 regenerator 运行时而不会污染当前环境。

### `core-js` aliasing

有时你可能想要使用新的内置函数，例如 `Map`，`Set`，`Promise` 等。使用这些函数的唯一方式通常是引入一个污染全局的 polyfill。

`runtime` 转译器做了如下改变：

```javascript
var sym = Symbol();

var promise = new Promise;

console.log(arr[Symbol.iterator]());
```

输出如下内容：

```javascript
"use strict";

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sym = (0, _symbol2.default)();

var promise = new _promise2.default();

console.log((0, _getIterator3.default)(arr));
```

这意味着你可以无缝的使用这些原生内置的和静态方法，且无需担心它们的来源。

**注意：** 例如 `"foobar".includes("foo")` 等实例方法将**不会**正常工作。

### Helper aliasing

通常，Babel 会将 helper 放置在文件顶部执行通用任务，以避免在文件中出现重复代码。有时这些 helper 可能会变得笨重，并且在文件中添加不必要的重复代码。该 `runtime`
转译器将所有 helper 调用替换为一个模块。

这意味着下面的代码：

```javascript
class Person {
}
```

通常会变成：

```javascript
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function Person() {
  _classCallCheck(this, Person);
};
```

`runtime` 转译器会将其变成：

```javascript
"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Person = function Person() {
  (0, _classCallCheck3.default)(this, Person);
};
```
