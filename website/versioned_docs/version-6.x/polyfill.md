---
id: version-6.x-babel-polyfill
title: babel-polyfill
sidebar_label: babel-polyfill
original_id: babel-polyfill
---

Babel 包含一个可自定义的 [regenerator runtime](https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js) 和 [core-js](https://github.com/zloirock/core-js) 的 [polyfill](https://en.wikipedia.org/wiki/Polyfill_(programming))。

它会仿效一个完整的 ES2015+ 环境，并意图运行于一个应用中而不是一个库/工具。这个 polyfill 会在使用 `babel-node` 时自动加载。

这意味着你可以使用新的内置对象比如 `Promise` 或者 `WeakMap`, 静态方法比如 `Array.from` 或者 `Object.assign`, 实例方法比如 `Array.prototype.includes` 和生成器函数（提供给你使用 [regenerator](/docs/plugins/transform-regenerator/) 插件）。为了达到这一点， polyfill 添加到了全局范围，就像原生类型比如 `String` 一样。

## 安装

```sh
npm install --save babel-polyfill
```

> 因为这是一个 polyfill （它需要在你的源代码之前运行），我们需要让它成为一个 `dependency`，而不是一个 `devDependency` 。

## 在 Node / Browserify / Webpack 中使用

你需要在你的应用**入口**顶部通过 require 将 polyfill 引入进来。

> 确保它在任何其他代码/依赖声明之前被调用！

```js
require("babel-polyfill");
```

如果你在你的应用**入口**使用 ES6 的 `import` 语法，你需要在**入口**顶部通过 import 将 polyfill 引入，以确保它能够最先加载：

```js
import "babel-polyfill";
```

在 `webpack.config.js` 中，将 `babel-polyfill` 加到你的 entry 数组中：

```js
module.exports = {
  entry: ["babel-polyfill", "./app/js"]
};
```

## 在浏览器中使用

可以在 `babel-polyfill` npm 发布版中的 `dist/polyfill.js` 文件中找到它。
它需要在你编译过的 Babel 代码**之前**被包括进去。你可以将它追加到你编译过的代码中，或者在这些代码之前通过 `<script>` 引入它。

**注意：** 不要通过类似 browserify 等手段来 `require` 它，用 `babel-polyfill`。

## 细节

> ##### 如果你在寻找可以在工具/库中使用的不会修改全局内容的东西，请查阅 [`transform-runtime`](babel-plugin-transform-runtime) 插件。这意味着你将不能使用上文中提到的实例方法，比如 `Array.prototype.includes` 。

注意：你可能不需要 `babel-polyfill` 或者运行时插件，这取决于你实际想用 ES2015 中的哪个方法。你可能只想[载入某些你正在使用的特定 polyfills](https://github.com/zloirock/core-js#commonjs) (比如 `Object.assign`)，或者只是记录加载 library 的环境应该包含特定的 polyfills 。

