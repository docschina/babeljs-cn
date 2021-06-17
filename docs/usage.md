---
id: usage
title: 使用指南
---

无论你是“终端用户”还是基于 Babel 自身构建一个集成工具的用户，Babel 工具链中都有很多工具可以让你轻松使用 Babel。这里简要介绍下这些工具，你可以在文档的“用法”部分中阅读有关它们的更多信息。

> 如果你正在使用框架，不同框架配置 Babel 的方式可能会有所不同，实际上有些框架已经为你配置。具体的配置方法请查看 [交互式设置指南](/setup.html)。

## 概览

本文将向你展示如何将使用 ES2015+ 语法的 JavaScript 应用程序代码编译为适用于当前浏览器的代码。这将涉及转换新语法和 polyfill 缺失的功能。

整个设置过程包括：

1. 运行这些命令以安装 packages:

   ```sh
   npm install --save-dev @babel/core @babel/cli @babel/preset-env
   ```

2. 使用以下内容在项目的根目录中创建名为 `babel.config.json` (需要 `v7.8.0` 及以上版本) 的配置文件：

   ```json
   {
     "presets": [
       [
         "@babel/env",
         {
           "targets": {
             "edge": "17",
             "firefox": "60",
             "chrome": "67",
             "safari": "11.1"
           },
           "useBuiltIns": "usage",
           "corejs": "3.6.5"
         }
       ]
     ]
   }
   ```

> 上面的浏览器列表只是一个随意的例子。你必须根据想要支持的浏览器进行调整。更多 `@babel/preset-env` 选项，请查看 [这里](preset-env.md)。

或者使用 `babel.config.js`，如果你在使用旧版本 Babel

```js
const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
      corejs: "3.6.4",
    },
  ],
];

module.exports = { presets };
```

3. 运行此命令将所有代码从 `src` 目录编译到 `lib`：

   ```sh
   ./node_modules/.bin/babel src --out-dir lib
   ```

   > 你可以通过 npm@5.2.0 附带的 npm package runner，用 `npx babel` 替换 `./node_modules/.bin/babel` 来缩短该命令。

请继续阅读，了解其工作原理的逐步说明以及对所使用的每种工具的介绍。

## CLI 的基本用法

你需要的所有 Babel 模块都将作为单独的 npm 包发布，其范围为 `@babel`（自版本 7 开始）。这种模块化设计允许每种工具都针对特定用例设计。下面我们来看看 `@babel/core` 和 `@babel/cli`。

### 核心库

Babel 的核心功能容纳于 [@babel/core](core.md) 模块。通过以下命令安装后：

```sh
npm install --save-dev @babel/core
```

你可以直接在 JavaScript 中 `require` 它并像下面这样使用它：

```js
const babel = require("@babel/core");

babel.transformSync("code", optionsObject);
```

但作为终端用户，你可能需要安装其他工具，并且通过此工具提供的接口来使用 `@babel/core`，这样更容易与你的开发过程集成。即便其中的大部分选项可以通过其他工具进行设置，你可能还是需要查看 Babel 文档页面来了解这些选项。

### CLI 工具

[@babel/cli](cli.md) 是一个允许你在终端使用 babel 的工具。这是安装命令和基本用法示例：

```sh
npm install --save-dev @babel/core @babel/cli

./node_modules/.bin/babel src --out-dir lib
```

它解析 `src` 目录中的所有 JavaScript 文件，使用我们设置的转换规则,并将转换后每个文件输出到 `lib` 目录。由于我们还没有设置转换规则，这里输出代码将与输入保持一致（不保留确切的代码样式）。我们可以指定我们想要的转换规则，通过把它们作为选项传给 CLI。

我们使用上面的 `--out-dir` 选项。你可以通过使用 `--help` 运行它来查看 cli 工具接收的其余选项。但对我们来说最重要的是 `--plugins` 和 `--presets`。

## plugins & presets

转换规则会体现为插件的形式，插件是小型 JavaScript 程序，它指示 Babel 如何进行代码转换。你甚至可以编写自己的插件，来应用你想要的任何转换规则。想要将 ES2015+ 语法转换为 ES5，我们可以依赖类似 `@babel/plugin-transform-arrow-functions` 这样的官方插件，如：

```sh
npm install --save-dev @babel/plugin-transform-arrow-functions

./node_modules/.bin/babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions
```

现在代码中的所有箭头函数都将被转换为 ES5 兼容的函数表达式：

```js
const fn = () => 1;

// 转为

var fn = function fn() {
  return 1;
};
```

这是一个好的开始！如果代码中还有其他 ES2015+ 功能也需要转换。我们可以使用一个 "preset"，其中包含着一组预先设定的插件，而不是逐一添加我们想要的所有插件。

就像使用 plugins 一样，你也可以创建自己的 preset，分享你需要的任何插件组合。在这个例子中，我们使用了 `env` preset。

```sh
npm install --save-dev @babel/preset-env

./node_modules/.bin/babel src --out-dir lib --presets=@babel/env
```

没有任何配置，这个 preset 包括支持现代 JavaScript（ES2015，ES2016 等）的所有插件。然而 presets 也可以接收配置选项。相比从终端传入 cli 和 preset 选项，我们还可以使用另一种方式传入选项：通过配置文件。

## 配置文件

> 根据你的需要，可以使用几种不同形式的配置文件。请务必阅读有关如何 [配置 Babel](configuration.md) 的深入指南以获取更多信息。

现在，让我们创建一个名为 `babel.config.json` (需要 `v7.8.0` 及以上) 的文件，其中包含以下内容：

```json
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        }
      }
    ]
  ]
}
```

现在 `env` preset 只会为目标浏览器中没有的功能加载转换插件。上面已经介绍过所有语法。接下来我们看看 polyfills。

## polyfill

> 🚨 <span id="polyfill-deprecated">自</span> Babel 7.4.0 起，此 package 已被弃用，你可以直接引入 `core-js/stable`（用于 polyfill ECMAScript 新特性）以及 `regenerator-runtime/runtime` (被用于转译 generator 函数)：
>
> ```js
> import "core-js/stable";
> import "regenerator-runtime/runtime";
> ```

[@babel/polyfill](polyfill.md) 模块包括 [core-js](https://github.com/zloirock/core-js) 和一个自定义 [regenerator runtime](https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js)，用于模拟完整的 ES2015+ 环境。

这意味着你可以使用像 `Promise` 或 `WeakMap` 这样的新内置函数，像 `Array.from` 或 `Object.assign` 这样的静态方法，像 `Array.prototype.includes` 这样的实例方法，以及（提供 regenerator 插件后可以使用） generator 函数。为了做到这一点，polyfill 会在全局作用域和类似 `String` 这样的内置对象的原型对象上添加对象或方法。

对于 library/tool 作者来说，这可能显得多余。如果你不需要像 `Array.prototype.includes` 这样的实例方法，可以使用 [transform runtime](plugin-transform-runtime.md) 插件，来避免 `@babel/polyfill` 污染全局作用域。

更进一步，如果你明确知道需要 polyfill 的那些功能，可以直接从 [core-js](https://github.com/zloirock/core-js#commonjs) 中引用。

由于我们正在构建一个应用程序，我们可以只安装 `@babel/polyfill`:

```sh
npm install --save @babel/polyfill
```

> 注意：使用 `--save` 选项，而不是 `--save-dev`，这是因为 polyfill 需要在运行时中在源代码之前执行。

幸运的是，对于我们来说，我们使用的是 `env` preset，其中有一个 `"useBuiltIns"` 选项，当设置为 `"usage"` 时，实际上针对最后一个版本的浏览器应用优化，只会包含你需要的 polyfill。使用此新选项，配置更改如下：

```json
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```

Babel 将检查你的所有代码，以查找目标环境中缺少的功能，并仅包含所需的 polyfill。例如这段代码：

```js
Promise.resolve().finally();
```

会变成这样（因为 Edge 17 没有 `Promise.prototype.finally`）：

```js
require("core-js/modules/es.promise.finally");

Promise.resolve().finally();
```

如果没有将 `env` preset 的 `"useBuiltIns"` 选项的设置为 `"usage"` ，我们必须在入口起点的其他代码之前先完整 polyfill *一次*。

For example:

```json
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "entry"
      }
    ]
  ]
}
```
Then import [core-js](https://github.com/zloirock/core-js) (to polyfill ECMAScript features) and [regenerator runtime](https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js) (needed only if you are transpiling generators) first, in our entry file to emulate a full ES2015+ environment since [@babel/polyfill](polyfill.md) has been <a href="#polyfill-deprecated">deprecated</a>:

```js
 import "core-js/stable";
 import "regenerator-runtime/runtime";
 ```

## 总结

我们使用 `@babel/cli` 从终端运行 Babel，`@babel/polyfill` 用于 polyfill 所有新的 JavaScript 功能，`env` preset 只包含我们使用的功能的转换规则，polyfills 用于填充目标浏览器中缺少的功能。

有关使用构建系统设置 Babel，以及 IDE 等更多信息，请查看 [交互式设置指南](/setup.html)。
