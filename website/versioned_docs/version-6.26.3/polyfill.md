---
id: version-6.26.3-babel-polyfill
title: babel-polyfill
sidebar_label: babel-polyfill
original_id: babel-polyfill
---

Babel 包含一个可自定义的 [regenerator runtime](https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js) 和 [core-js](https://github.com/zloirock/core-js) 的 [polyfill](<https://en.wikipedia.org/wiki/Polyfill_(programming)>)。

它会仿效一个完整的 ES2015+ 环境，并意图运行于一个应用中而不是一个库/工具。这个 polyfill 会在使用 `babel-node` 时自动加载。

这意味着你可以使用新的内置对象比如 `Promise` 或者 `WeakMap`, 静态方法比如 `Array.from` 或者 `Object.assign`, 实例方法比如 `Array.prototype.includes` 和生成器函数（提供给你使用 [regenerator](plugin-transform-regenerator.md) 插件）。为了达到这一点， polyfill 添加到了全局范围，就像原生类型比如 `String` 一样。

## 安装

```sh
npm install --save babel-polyfill
```

> 因为这是一个 polyfill （它需要在你的源代码之前运行），我们需要让它成为一个 `dependency`，而不是一个 `devDependency` 。

## 在 Node / Browserify / webpack 中使用

你需要在你的应用**入口**顶部通过 require 将 polyfill 引入进来。

> 确保它在任何其他代码/依赖声明之前被调用！

```js
require("babel-polyfill");
```

如果你在你的应用**入口**使用 ES6 的 `import` 语法，你需要在**入口**顶部通过 import 将 polyfill 引入，以确保它能够最先加载：

```js
import "babel-polyfill";
```

使用 webpack，有许多种方式可以包含 polyfills：

- 当与 [`babel-preset-env`](preset-env.md) 一起使用时，

  - 如果在 `.babelrc` 中设置 `useBuiltIns: 'usage'`，则不要在 `webpack.config.js` entry 数组或 source 中包含 `babel-polyfill`。注意，仍然需要安装 `babel-polyfill`。

  - 如果在 `.babelrc` 中设置 `useBuiltIns: 'entry'`，那么在上面讨论的 `require` 或 `import` 的应用程序入口的顶部引入 `babel-polyfill`。

  - 如果在 `.babelrc` 中设置 `useBuiltIns: 'false'`，将 `babel-polyfill` 添加到 `webpack.config.js` 的入口数组中。

```js
module.exports = {
  entry: ["babel-polyfill", "./app/js"],
};
```
- 如果没有使用 [`babel-preset-env`](preset-env.md)，那么将 `babel-polyfill` 添加到 webpack 的 entry 数组中。它仍然可以通过 `import` 或者 `require` 添加到应用程序 entry 顶部，但不建议这样做。

> 我们不建议你导入整个 polyfill：尝试使用 `useBuiltIns` 选项或仅手动导入你需要的 polyfill（从当前 package 或其他地方）。

## 在浏览器中使用

可以在 `babel-polyfill` npm 发布版中的 `dist/polyfill.js` 文件中找到它。
它需要在你编译过的 Babel 代码**之前**被包括进去。你可以将它追加到你编译过的代码中，或者在这些代码之前通过 `<script>` 引入它。

**注意：** 不要通过类似 browserify 等手段来 `require` 它，用 `babel-polyfill`。

## 细节

> ##### 如果你在寻找可以在工具/库中使用的不会修改全局内容的东西，请查阅 [`transform-runtime`](plugin-transform-runtime.md) 插件。这意味着你将不能使用上文中提到的实例方法，比如 `Array.prototype.includes` 。

注意：你可能不需要 `babel-polyfill` 或者运行时插件，这取决于你实际想用 ES2015 中的哪个方法。你可能只想[载入某些你正在使用的特定 polyfills](https://github.com/zloirock/core-js#commonjs) (比如 `Object.assign`)，或者只是记录加载 library 的环境应该包含特定的 polyfills 。

