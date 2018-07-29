---
id: version-6.x-babel-preset-env
title: babel-preset-env
sidebar_label: env
original_id: babel-preset-env
---

```sh
npm install babel-preset-env --save-dev
```

在没有任何配置选项的情况下，babel-preset-env 与 babel-preset-latest（或者 babel-preset-es2015，babel-preset-es2016 和 babel-preset-es2017一起）的行为完全相同。

```json
{
  "presets": ["env"]
}
```

你也可以仅仅配置项目所支持浏览器所需的 polyfill 和 transform 。只编译所需的代码会使你的代码包更小。

示例中只包含了支持每个浏览器最后两个版本和 Safari 大于等于 7 版本所需的 polyfill 和代码转换。我们使用 [browserslist](https://github.com/ai/browserslist) 来解析这些信息，所以你可以使用 [browserslist 支持的有效的查询格式](https://github.com/ai/browserslist#queries)。

```json
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}
```

同样，如果你目标开发 Node.js 而不是浏览器应用的话，你可以配置 babel-preset-env 仅包含特定版本所需的 polyfill 和 transform：

```json
{
  "presets": [
    ["env", {
      "targets": {
        "node": "6.10"
      }
    }]
  ]
}
```

方便起见，你可以使用 `"node": "current"` 来包含用于运行 Babel 的 Node.js 最新版所必需的 polyfill 和 transform 。

```json
{
  "presets": [
    ["env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
}
```

看一下如下很多选项 (特别是 `useBuiltIns` 用更少的 polyfill)!

- [如何运行](#如何运行)
- [安装](#安装)
- [使用](#使用)
- [选项](#选项)
- [举例](#举例)
- [注意事项](#注意事项)
- [其余项目](#其余项目)

## 如何运行

### 确定支持ECMAScript新特性的运行环境

使用 [`compat-table`](https://github.com/kangax/compat-table) 等外部数据来确定浏览器支持情况。（如果必要的话我们可以提PR）

![](https://cloud.githubusercontent.com/assets/588473/19214029/58deebce-8d48-11e6-9004-ee3fbcb75d8b.png)

我们可以定期运行 [build-data.js](https://github.com/babel/babel-preset-env/blob/master/scripts/build-data.js) 来生成 [plugins.json](https://github.com/babel/babel-preset-env/blob/master/data/plugins.json)。

参考: [#7](https://github.com/babel/babel-preset-env/issues/7)

### 保持JavaScript新特性和Babel插件的映射关系

> 目前位于 [plugin-features.js](https://github.com/babel/babel-preset-env/blob/master/data/plugin-features.js)。

在多数情况下这应该很直截了当。在一些情况下，可能需要分割为很多插件或者某些插件不够独立（或不能实现）。

### 支持被认为是 `latest` 的Babel所有插件

> 没有选项的默认行为与 `babel-preset-latest` 相同。

它不会包含 `stage-x` 插件。env 将会支持我们认为最新版本的JavaScript的所有插件（过我们匹配在 [`babel-preset-latest`](preset-latest) 中所作的）。

参考: [#14](https://github.com/babel/babel-preset-env/issues/14)

### 确定在 preset 的插件中支持的最低浏览器版本。

如果你的项目需要支持 IE8 和 Chrome 55 。它必须包括IE8所支持的所有插件，因为你仍然需要支持它们。

### 支持一个目标选项 `"node": "current"` 用来编译当前node版本。

例如，如果你基于Node 6构建项目，箭头函数将不会被转换。但项目基于Node 0.12的时候，它们将会被转换。

### 支持像 autoprefixer 一样的 `browsers` 选项。

使用[browserslist](https://github.com/ai/browserslist)通过像 `> 1%, last 2 versions` 查询语句来声明支持的环境。

参考: [#19](https://github.com/babel/babel-preset-env/pull/19)

## 安装

通过 [npm](https://www.npmjs.com):

```sh
npm install --save-dev babel-preset-env
```

或 [yarn](https://yarnpkg.com):

```sh
yarn add babel-preset-env --dev
```

## 使用

没有选项的默认行为将运行所有transform（与 [babel-preset-latest](plugins/preset-latest/) 相同）。

```json
{
  "presets": ["env"]
}
```

## 选项

有关设置预设选项的更多信息，请参阅 [plugin/preset options](plugins#plugin-preset-选项) 文档。

### `targets`

`{ [string]: number | string }`, 默认为 `{}`。

支持一个运行环境的对象

每个目标环境都有一个数字或字符串 (我们建议在使用次要版本的时候使用字符串，例如 `node: "6.10"`)。

运行示例环境: `chrome`, `opera`, `edge`, `firefox`, `safari`, `ie`, `ios`, `android`, `node`, `electron`。

这些 [数据](https://github.com/babel/babel-preset-env/blob/master/data/plugins.json) 是通过从 [compat-table](https://kangax.github.io/compat-table) 中提取数据的 [build-data 脚本](https://github.com/babel/babel-preset-env/blob/master/scripts/build-data.js) 中生成的。

### `targets.node`

`number | string | "current" | true`

如果需要编译当前node版本，你可以指定 `"node": true` 或者 `"node": "current"`, 它与 `"node": process.versions.node` 相同。

### `targets.browsers`

`Array<string> | string`

可以利用 [browserslist](https://github.com/ai/browserslist) 查询选择的浏览器 (例如: last 2 versions, > 5%)。

请注意，浏览器的结果会被来自 `targets` 的明确条目覆盖。

### `targets.uglify`

`true`

在使用 `uglify-js` 压缩代码时, 由于 `uglify-js` 不支持任何ES2015+语法，因此浏览器运行时可能会遇到语法错误。

为了防止这些错误的发生 - 将 `uglify` 选项设置为 `true`， 它将会启用所有的翻译插件, 因此你的代码会被编译为ES5. 然而， `useBuiltIns` 选项仍然会像之前一样工作，只包含你的目标浏览器所需要的 polyfills。

> Uglify通过 [uglify-es](https://github.com/mishoo/UglifyJS2/tree/harmony) 支持ES2015语法。如果您使用`uglify-es`不支持的语法，我们推荐使用 [babel-minify](https://github.com/babel/minify)。

> 注意: 这个选项在 2.x 中已经弃用，并且用 [`forceAllTransforms` 选项](https://github.com/babel/babel-preset-env/pull/264)来替代.

### `spec`

`boolean`， 默认为 `false`。

对在这个 preset 中支持它们的插件启用更符合规范，但可能较慢的方式。

### `loose`

`boolean`， 默认为 `false`。

允许它们为这个 preset 的任何插件启用"loose" 转换。

### `modules`

`"amd" | "umd" | "systemjs" | "commonjs" | false`， 默认为 `"commonjs"`.

启用将ES6模块语法转换为另一种模块类型。

将其设置为 `false` 就不会转换模块。

### `debug`

`boolean`， 默认为 `false`。

将使用的目标浏览器/插件和在 [数据插件版本](https://github.com/babel/babel-preset-env/blob/master/data/plugins.json) 中指定的版本用 `console.log` 输出。

### `include`

`Array<string>`， 默认为`[]`。

> 注意: `whitelist` 已经被弃用，将在下一个主要版本中删除。

它总是包含一系列插件。

有效的选项包括。

- [Babel plugins](https://github.com/babel/babel-preset-env/blob/master/data/plugin-features.js) - 支持 (`babel-plugin-transform-es2015-spread`) 和无前缀的 (`transform-es2015-spread`)。

- [Built-ins](https://github.com/babel/babel-preset-env/blob/master/data/built-in-features.js)，例如 `map`、 `set`、 或者 `object.assign`。

如果原生的环境有个bug，或者不支持的功能与支持的功能的组合不起作用，这个选项将会是一个非常有用的选项。

例如， Node 4 支持原生类但不支持类扩展。如果 `super` 与扩展参数一起使用，那么需要 `include` 选项 `transform-es2015-classes` 因为如果不是以 `super` 方式进行传播，则不可能进行传输。

> 注意: `include` 与 `exclude` 选项 _仅仅_ 适用于 [preset中包含的插件](https://github.com/babel/babel-preset-env/blob/master/data/plugin-features.js); 所以，例如，包含 `transform-do-expressions` 或者不包含 `transform-function-bind` 将会抛出错误. 要在preset中使用 _不包含_ 的插件, 请直接将它们添加到你的 [config](babelrc) 中。

### `exclude`

`Array<string>`，默认为 `[]`。

总是移除的数组插件。

可能的选项与 `include` 选项相同。

如果你不使用生成器并且不想包含 `regeneratorRuntime` (当使用 `useBuiltIns` 时)或者使用另一个像[fast-async](https://github.com/MatAtBread/fast-async)而不是[Babel's async-to-gen](transform-async-generator-functions)的插件，这个选项对于像 `transform-regenerator` 这样的"黑名单"转换很有用。

### `useBuiltIns`

`boolean`，默认为 `false`。

一种将polyfill应用于 `babel-preset-env` 中的方法 (通过 "babel-polyfill")。

> 注意: 目前这种方式并没有像普通的"babel-polyfill"那样的试验性polyfill/stage-x内置插件。
> 这只适用于npm >= 3（无论如何应该与Babel 6一起使用）。

```
npm install babel-polyfill --save
```

这个选项可以启用一个新的插件来替换语句 `import "babel-polyfill"` 或者 `require("babel-polyfill")` 以及基于浏览器环境的 `babel-polyfill` 个性化需求。

> 注意: 在你的整个应用里只使用一次 `require("babel-polyfill");`。 
> 多次 imports 或 requires `babel-polyfill` 会引起报错，因为它可能导致全局冲突和其他难以追踪的问题。
> 我们建议创建一个只包含 `require` 语句的单个入口文件。

**In**

```js
import "babel-polyfill";
```

**Out (基于环境的不同)**

```js
import "core-js/modules/es7.string.pad-start";
import "core-js/modules/es7.string.pad-end";
import "core-js/modules/web.timers";
import "core-js/modules/web.immediate";
import "core-js/modules/web.dom.iterable";
```

这也将直接用于 `core-js` (`import "core-js";`)

```
npm install core-js --save
```

---

## 举例

### 导出各种目标浏览器

```js
export class A {}
```

#### 只针对 Chrome 52

**.babelrc**

```json
{
  "presets": [
    ["env", {
      "targets": {
        "chrome": 52
      }
    }]
  ]
}
```

**Out**

```js
class A {}
exports.A = A;
```

#### 目标浏览器为 使用 webpack 2/rollup 和 loose 模式的 Chrome 52 

**.babelrc**

```json
{
  "presets": [
    ["env", {
      "targets": {
        "chrome": 52
      },
      "modules": false,
      "loose": true
    }]
  ]
}
```

**Out**

```js
export class A {}
```

#### 通过 browserslist 指定特定浏览器

**.babelrc**

```json
{
  "presets": [
    ["env", {
      "targets": {
        "chrome": 52,
        "browsers": ["last 2 versions", "safari 7"]
      }
    }]
  ]
}
```

**Out**

```js
export var A = function A() {
  _classCallCheck(this, A);
};
```

#### 通过 `node: true` 或 `node: "current"` 来指定node版本

**.babelrc**

```json
{
  "presets": [
    ["env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
}
```

**Out**

```js
class A {}
exports.A = A;
```

### 显示调试输出

**.babelrc**

```json
{
  "presets": [
    [ "env", {
      "targets": {
        "safari": 10
      },
      "modules": false,
      "useBuiltIns": true,
      "debug": true
    }]
  ]
}
```

**stdout**

```sh
Using targets:
{
  "safari": 10
}

Modules transform: false

Using plugins:
  transform-exponentiation-operator {}
  transform-async-to-generator {}

Using polyfills:
  es7.object.values {}
  es7.object.entries {}
  es7.object.get-own-property-descriptors {}
  web.timers {}
  web.immediate {}
  web.dom.iterable {}
```

### 包含和排除特定的插件/内置插件

> 始终包含箭头函数，明确排除生成器

```json
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      },
      "include": ["transform-es2015-arrow-functions", "es6.map"],
      "exclude": ["transform-regenerator", "es6.set"]
    }]
  ]
}
```

## 注意事项

如果在使用 [object-rest-spread](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-object-rest-spread) 转换时 发生 `SyntaxError: Unexpected token ...` 错误请确保该插件更新至至少 `v6.19.0`。

## 其余项目

- [babel-preset-modern-browsers](https://github.com/christophehurpeau/babel-preset-modern-browsers)
- ?
