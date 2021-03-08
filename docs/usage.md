---
id: usage
title: 使用指南
---

Babel 工具链中有很多工具可以让你轻松使用 Babel，无论你是“终端用户”还是构建 Babel 本身的集成。本文是快速使用这些工具的指南，你可以在文档的“用法”部分中阅读有关它们的更多信息。

> 如果你正在使用框架，不同框架配置 Babel 的方式可能会有所不同，实际上有些框架已经为你配置。具体的配置方法请查看[交互式设置指南](/setup.html)。

## 概览

本文将向你展示如何将使用 ES2015+ 语法的 JavaScript 应用程序代码编译为适用于当前浏览器的代码。这将涉及转换新语法和实现缺失的功能。

整个设置过程包括：

1. 运行这些命令以安装 packages:

   ```sh
   npm install --save-dev @babel/core @babel/cli @babel/preset-env
   npm install --save @babel/polyfill
   ```

2. 使用以下内容在项目的根目录中创建名为 `babel.config.json` (requires `v7.8.0` and above) 的配置文件：

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

<<<<<<< HEAD
    > 上面的浏览器列表只是一个随意的例子。你必须根据想要支持的浏览器进行调整。
=======
   > The browsers list above is just an arbitrary example. You will have to adapt it for the browsers you want to support. See [here](preset-env.md) for more `@babel/preset-env` options.
>>>>>>> 37c55e7040f7274f42c2572df800b562693ea61b

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

   > 你可以通过 npm@5.2.0 附带的 npm 包运行器，用 `npx babel` 替换 `./node_modules/.bin/babel` 来缩短该命令。

请继续阅读，了解其工作原理的逐步说明以及对所使用的每种工具的介绍。

## CLI 的基本用法

你需要的所有 Babel 模块都将作为单独的 npm 包发布，其范围为 `@babel`（自版本7开始）。这种模块化设计允许每种工具都针对特定用例设计。下面我们来看看 `@babel/core` 和 `@babel/cli`。

### 核心库

Babel 的核心功能在 [@babel/core](core.md) 模块。通过以下命令安装后：

```sh
npm install --save-dev @babel/core
```

你可以直接在 JavaScript 中 `require` 它并像下面这样使用它：

```js
const babel = require("@babel/core");

babel.transformSync("code", optionsObject);
```

但作为终端用户，你可能希望安装其他工具作为 `@babel/core` 的接口，并能很好地集成在你的开发过程中。即便如此，你仍可能需要查看其文档页面以了解这些选项，其中大部分选项也可以通过其他工具进行设置。

### CLI 工具

[@babel/cli](cli.md) 是一个允许你从终端使用 babel 的工具。这是安装命令和基本用法示例：

```sh
npm install --save-dev @babel/core @babel/cli

./node_modules/.bin/babel src --out-dir lib
```

它使用我们设置的解析方式来解析 `src` 目录中的所有 JavaScript 文件，并将转换后每个文件输出到 `lib` 目录。由于我们还没有设置解析方式，这里输出代码将与输入相同（不保留确切的代码样式）。我们可以通过将它们作为选项传入来指定我们想要的解析方式。

我们使用上面的 `--out-dir` 选项。你可以通过使用 `--help` 运行它来查看 cli 工具接受的其余选项。但对我们来说最重要的是 `--plugins` 和 `--presets`。

## Plugins & Presets

代码转换以插件的形式出现，插件是小型 JavaScript 程序，它指示 Babel 如何对代码进行转换。你甚至可以编写自己的插件来应用你想要的任何代码转换。要将ES2015+ 语法转换为 ES5，我们可以依赖官方插件，如 `@ babel / plugin-transform-arrow-functions`：

```sh
npm install --save-dev @babel/plugin-transform-arrow-functions

./node_modules/.bin/babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions
```

现在我们代码中的所有箭头函数都将转换为 ES5 兼容函数表达式：

```js
const fn = () => 1;

// converted to

var fn = function fn() {
  return 1;
};
```

这是一个好的开始！如果想要转换代码中还有其他 ES2015+ 功能。我们可以使用 "preset" 来代替预先设定的一组插件，而不是逐一添加我们想要的所有插件。

就像使用 plugins 一样，你也可以创建自己的 preset，分享你需要的任何插件组合。在这个例子中，我们使用了 `env` preset。

```sh
npm install --save-dev @babel/preset-env

./node_modules/.bin/babel src --out-dir lib --presets=@babel/env
```

没有任何配置，这个 preset 包括支持现代 JavaScript（ES2015，ES2016 等）的所有插件。但是 presets 也可以选择。我们不从终端传入 cli 和 preset 选项，而是通过另一种传入选项的方式：配置文件。

## 配置

> 根据你的需要，可以使用几种不同的方法配置文件。请务必阅读有关如何 [配置 Babel](configuration.md) 的深入指南以获取更多信息。

现在，让我们创建一个名为 `babel.config.json` (requires `v7.8.0` and above) 的文件，其中包含以下内容：

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

现在 `env` preset 只会为目标浏览器中没有的功能加载转换插件。接下来我们看看 polyfills。

## Polyfill

<<<<<<< HEAD
> 🚨 自 Babel 7.4.0 起，该 package 已被弃用，你可以直接引入 `core-js/stable`（为 ECMAScript 新特性提供的 polyfill）以及 `regenerator-runtime/runtime` (需要转译 generator 函数)：
=======
> 🚨 As of Babel 7.4.0, this package has been deprecated in favor of directly including `core-js/stable` (to polyfill ECMAScript features) and `regenerator-runtime/runtime` (needed to use transpiled generator functions):
>
>>>>>>> 37c55e7040f7274f42c2572df800b562693ea61b
> ```js
> import "core-js/stable";
> import "regenerator-runtime/runtime";
> ```

[@babel/polyfill](polyfill.md) 模块包括 [core-js](https://github.com/zloirock/core-js) 和自定义 [regenerator runtime](https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js) 来模拟完整的 ES2015+ 环境。

这意味着你可以使用像 `Promise` 或 `WeakMap` 这样的新内置函数，像 `Array.from` 或 `Object.assign` 这样的静态方法，像`Array.prototype.includes` 这样的实例方法，以及 generator 函数（提供给你使用 regenerator 插件）。为了做到这一点，polyfill 增加了全局范围以及像 `String` 这样的原生原型。

对于 library/tool 作者来说，这可能太多了。如果你不需要像 `Array.prototype.includes` 这样的实例方法，可以使用[ [transform runtime](plugin-transform-runtime.md) 插件而不是 `@babel/polyfill` 污染全局范围。

更进一步，如果你确切知道需要实现的功能，可以直接从 [core-js](https://github.com/zloirock/core-js#commonjs) 中获取它们。

由于我们正在构建一个应用程序，我们可以只安装 `@babel/polyfill`:

```sh
npm install --save @babel/polyfill
```

> 注意 `--save` 选项而不是 `--save-dev`，因为这是一个需要在源代码之前运行的 polyfill。

幸运的是，对于我们来说，我们使用的是 `env` preset，其中有一个 `"useBuiltIns"` 选项，当设置为 `"usage"` 时，实际上将应用上面提到的最后一个优化，只包括你需要的 polyfill。使用此新选项，配置更改如下：

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

会变成这个（因为 Edge 17 没有 `Promise.prototype.finally`）：

```js
require("core-js/modules/es.promise.finally");

Promise.resolve().finally();
```

如果我们没有将 `env` preset 的 `"useBuiltIns"` 选项的设置为 `"usage"` ，就必须在其他代码之前 require *仅一次*完整的 polyfill。

## 总结

我们使用 `@babel / cli` 从终端运行 Babel，`@babel/polyfill` 来实现所有新的 JavaScript 功能，`env` preset 只包含我们使用的功能的转换，实现我们的目标浏览器中缺少的功能。

有关使用构建系统，IDE 等设置 Babel 的更多信息，请查看[交互式设置指南](/setup.html)。
