---
id: usage
title: 使用指南
---

Babel工具链中有很多工具可以让你轻松使用Babel，无论你是“终端用户”还是构建Babel本身的集成。这是快速使用这些工具的指南，你可以在文档的“用法”部分中阅读有关它们的更多信息。

> 如果你正在使用框架，配置Babel的工作可能会有所不同或实际上已经为你处理。请查看我们的[交互式设置指南](/setup.html) 
## 概览

本指南将向你展示如何将使用ES2015 +语法的JavaScript应用程序代码编译为适用于当前浏览器的代码。这将涉及转换新语法和实现缺失的功能。

整个设置过程的包括：

1. 运行这些命令以安装 packages：

    ```sh
    npm install --save-dev @babel/core @babel/cli @babel/preset-env
    npm install --save @babel/polyfill
    ```
2. 使用以下内容在项目的根目录中创建名为 `babel.config.js` 的配置文件：
    ```js
    const presets = [
      ["@babel/env", {
        targets: {
          edge: "17",
          firefox: "60",
          chrome: "67",
          safari: "11.1"
        },
        useBuiltIns: "usage"
      }]
    ];

    module.exports = { presets };
    ```

    > 上面的浏览器列表只是一个随意的例子。你必须根据要支持的浏览器进行调整。

3. 并运行此命令将所有代码从 `src` 目录编译到 `lib`：

    ```sh
    ./node_modules/.bin/babel src --out-dir lib
    ```

    > 你可以通过npm@5.2.0附带的npm包运行器，用 `npx babel` 替换 `./node_modules/.bin/babel` 来缩短该命令。

请继续阅读，了解其工作原理的逐步说明以及对所使用的每种工具的介绍。

## CLI的基本用法

All the Babel modules you'll need are published as separate npm packages scoped under `@babel` (since version 7). This modular design allows for various tools each designed for a specific use case. Here we'll look at `@babel/core` and `@babel/cli`.
你需要的所有Babel模块都将作为单独的npm包发布，其范围为 `@ babel`（自版本7开始）。这种模块化设计允许每种工具都针对特定用例设计。查看 `@ babel / core` 和 `@ babel / cli` 。

### 核心库

The core functionality of Babel resides at the [@babel/core](core.md) module. After installing it:
Babel的核心功能在 [@babel/core](core.md) 模块。使用以下指令安装：
```sh
npm install --save-dev @babel/core
```

你可以直接在JavaScript中 `require` 它并像下面这样使用它：

```js
const babel = require("@babel/core");

babel.transform("code", optionsObject);
```
但作为终端，你可能希望安装其他工具作为 `@babel/core` 的接口，并与你的开发过程很好地集成。即便如此，你仍可能需要查看其文档页面以了解这些选项，其中大部分选项也可以通过其他工具进行设置。

### CLI 工具

[@babel/cli](cli.md) 是一个允许你从终端使用babel的工具。这是安装命令和基本用法示例：
```sh
npm install --save-dev @babel/core @babel/cli

./node_modules/.bin/babel src --out-dir lib
```

它解析 `src` 目录中的所有JavaScript文件，应用我们告诉它的任何转换，并将每个文件输出到 `lib` 目录。由于我们还没有告诉它应用任何转换，输出代码将与输入相同（不保留确切的代码样式）。我们可以通过将它们作为选项传递来指定我们想要的转换。

我们使用上面的 `--out-dir` 选项。你可以通过使用 `--help` 运行它来查看cli工具接受的其余选项。但对我们来说最重要的是 `--plugins` 和 `--presets`。

## Plugins & Presets

Transformations come in the form of plugins, which are small JavaScript programs that instruct Babel on how to carry out transformations to the code. You can even write your own plugins to apply any transformations you want to your code. To transform ES2015+ syntax into ES5 we can rely on official plugins like `@babel/plugin-transform-arrow-functions`:

```sh
npm install --save-dev @babel/plugin-transform-arrow-functions

./node_modules/.bin/babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions
```

Now any arrow functions in our code will be transformed into ES5 compatible function expressions:

```js
const fn = () => 1;

// converted to

var fn = function fn() {
    return 1;
};
```

That's a good start! But we also have other ES2015+ features in our code that we want transformed. Instead of adding all the plugins we want one by one, we can use a "preset" which is just a pre-determined set of plugins.

Just like with plugins, you can create your own presets too to share any combination of plugins you need. For our use case here, there's an excellent preset named `env`.

```sh
npm install --save-dev @babel/preset-env

./node_modules/.bin/babel src --out-dir lib --presets=@babel/env
```

Without any configuration, this preset will include all plugins to support modern JavaScript (ES2015, ES2016, etc.). But presets can take options too. Rather than passing both cli and preset options from the terminal, let's look at another way of passing options: configuration files.

## Configuration

> There are a few different ways to use configuration files depending on your needs. Be sure to read our in-depth guide on how to [configure Babel](configuration.md) for more information.

For now, let's create a file called `babel.config.js` with the following content:

```js
const presets = [
  ["@babel/env", {
    targets: {
      edge: "17",
      firefox: "60",
      chrome: "67",
      safari: "11.1"
    }
  }]
];

module.exports = { presets };
```

Now the `env` preset will only load transformation plugins for features that are not available in our target browsers. We're all set for syntax. Let's look at polyfills next.

## Polyfill

The [@babel/polyfill](polyfill.md) module includes [core-js](https://github.com/zloirock/core-js) and a custom [regenerator runtime](https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js) to emulate a full ES2015+ environment.

This means you can use new built-ins like `Promise` or `WeakMap`, static methods like `Array.from` or `Object.assign`, instance methods like `Array.prototype.includes`, and generator functions (provided you use the [regenerator](https://babeljs.io/docs/plugins/transform-regenerator/) plugin). The polyfill adds to the global scope as well as native prototypes like `String` in order to do this.

For library/tool authors this may be too much. If you don't need the instance methods like `Array.prototype.includes` you can do without polluting the global scope altogether by using the [transform runtime](plugin-transform-runtime.md) plugin instead of `@babel/polyfill`.

To go one step further, if you know exactly what features you need polyfills for, you can require them directly from [core-js](https://github.com/zloirock/core-js#commonjs).

Since we're building an application we can just install `@babel/polyfill`:

```sh
npm install --save @babel/polyfill
```

> Note the `--save` option instead of `--save-dev` as this is a polyfill that needs to run before your source code.

Now luckily for us, we're using the `env` preset which has a `"useBuiltIns"` option that when set to `"usage"` will practically apply the last optimization mentioned above where you only include the polyfills you need. With this new option the configuration changes like this:

```js
const presets = [
  ["@babel/env", {
    targets: {
      edge: "17",
      firefox: "60",
      chrome: "67",
      safari: "11.1"
    },
    useBuiltIns: "usage"
  }]
];

module.exports = { presets };
```

Babel will now inspect all your code for features that are missing in your target environments and include only the required polyfills. For example this code:

```js
Promise.resolve().finally()
```

would turn into this (because Edge 17 doesn't have `Promise.prototype.finally`):

```js
require("core-js/modules/es.promise.finally");

Promise.resolve().finally()
```

If we weren't using the `env` preset with the `"useBuiltIns"` option set to `"usage"` we would've had to require the full polyfill *only once* in our entry point before any other code.

## Summary

We used `@babel/cli` to run Babel from the terminal, `@babel/polyfill` to polyfill all the new JavaScript features, and the `env` preset to only include the transformations and polyfills for the features that we use and that are missing in our target browsers.

For more information on setting up Babel with your build system, IDE, and more, check out our [interactive setup guide](/setup.html).
