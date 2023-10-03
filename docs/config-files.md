---
title: 配置文件
id: config-files
---

## 配置文件类型

Babel 有两种并行的配置文件方式，可以一起使用，也可以单独使用。

<details>
  <summary>History</summary>

| 版本 | 变更 |
| --- | --- |
| `v7.21.0` | Support `.babelrc.cts` and `babel.config.cts` (Experimental) |
| `v7.8.0`  | Support `.babelrc.mjs` and `babel.config.mjs` |
| `v7.7.0`  | Support `.babelrc.json`, `.babelrc.cjs`, `babel.config.json`, `babel.config.cjs` |
</details>

- 项目范围的配置
  - `babel.config.*` 文件，可用如下不同扩展名： `.json`, `.js`, `.cjs`, `.mjs`。
- 相对文件的配置
  - `.babelrc.*` 文件，可用如下不同扩展名： `.json`, `.js`, `.cjs`, `.mjs`。
  - 不带扩展名的 `.babelrc`。
  - 带有 `"babel"` 属性的 `package.json` 文件。

## 项目范围的配置

在 Babel 7.x 新版本中，Babel 有一个 ["root"](options.md#root) 目录的概念，
默认为当前的工作目录文件夹。
对于项目范围的配置，Babel 将在根目录中自动搜索 `"babel.config.json"` 文件，
或使用了 [支持的扩展名](#supported-file-extensions) 的等效文件。
另外，用户可以使用显式的 ["configFile"](options.md#configfile) 值覆盖默认的配置文件搜索行为。

因为项目范围的配置文件与配置文件的物理位置是分离的，
所以它们非常适合必须广泛应用的配置，
甚至允许插件和预设轻松地应用于 `node_modules` 或符号链接包中的文件，
这在 Babel 6.x 中通常是很难配置的。

项目范围配置的主要缺点是，因为它依赖于工作目录，
如果工作目录不是单体式仓库的根目录，那么在单体式仓库中使用它会更加痛苦。
有关如何在这种上下文中使用配置文件的示例，请参阅 [单体式仓库](#monorepos) 文档。

也可以通过将 ["configFile"](options.md#configfile) 设置为 `false` 来禁用项目范围的配置。

## 相对文件的配置

Babel 从正在编译（受以下警告限制）的 ["filename"](options.md#filename) 开始搜索目录结构来加载 `.babelrc.json` 文件，
或使用了 [支持的扩展名](#supported-file-extensions) 的等效文件。
这种功能非常强大，
因为它允许你为子 package 创建独立的配置。
相对文件的配置可以设置 [merged](options.md#merging) 使它们特定的配置覆盖项目范围的配置值，
尽管这也可以通过 ["overrides"](options.md#overrides) 来实现。

当使用相对文件的配置时，需要考虑一些边缘情况:

- 一旦找到包含 `package.json` 的目录，搜索就会停止，
  因此相对文件的配置仅适用于单个包。
- 正在编译的 ["filename"](options.md#filename) 必须在 ["babelrcRoots"](options.md#babelrcroots) packages 中，
  否则搜索将被完全跳过。

这些警告意味着：

- `.babelrc.json` 文件*仅应用于*它们自己包中的文件
- `.babelrc.json` 文件将被忽略如果不在 Babel 的 "根" 包中，
  除非你选择使用 ["babelrcRoots"](options.md#babelrcroots)

有关如何配置具有多个包的单体式仓库的更多讨论，请参阅 [单体式仓库](#monorepos) 文档。
还可以通过将 ["babelrc"](options.md#babelrc) 设置为 `false` 来禁用相对文件的配置。

### 6.x vs 7.x `.babelrc` 加载

来自 Babel 6.x 的用户可能会遇到这两个边缘情况，这是 Babel 7.x 中的新功能。
这两项限制是为了解决 Babel 6.x 中常见的 footguns 而增加的：

- `.babelrc` 文件经常出乎意料地应用于 `node_modules` 依赖项。
- `.babelrc` 文件 _无法_ 应用于符号链接 `node_modules`，当人们期望它们表现得像正常的依赖时。
- `.babelrc` 文件 _在_ `node_modules` 依赖关系中将被检测，
  即使它们内部的插件和预设通常没有安装，
  甚至可能在编译该文件的 Babel 版本中无效。

这些情况*主要*会给使用单体式仓库结构的用户造成问题，
如果你有

```text
.babelrc
packages/
  mod1/
    package.json
    src/index.js
  mod2/
    package.json
    src/index.js
```

该配置现在将被完全忽略，因为它跨越了包边界。

一种替代方法是在每个子包中创建一个 `.babelrc`，将 ["extends"](options.md#extends) 用作

```json title=".babelrc.json"
{ "extends": "../../.babelrc" }
```

不幸的是，这种方法可能有点重复，根据 Babel 的使用方式，
可能需要设置 ["babelrcRoots"](options.md#babelrcroots)。

考虑到这一点，将 `.babelrc` 重命名为 [项目范围的 "babel.config.json"](#project-wide-configuration)可能更可取。
正如上面在项目范围部分提到的，
这可能需要显式设置 ["configFile"](options.md#configfile)，
因为如果工作目录不正确，Babel 将找不到配置文件。

## 支持的文件扩展名

可以使用 Node.js 本地支持的任何文件扩展名配置 Babel，正如上面[配置文件类型](#configuration-file-types)章节提到的一样：

- `babel.config.json` 和 `.babelrc.json` 被解析为 JSON5，并且应该包含一个 Babel 接受的选项格式匹配的对象。
  它们从 `v7.7.0` 开始支持。

  我们建议尽可能使用这种文件类型：
  如果你的复杂配置有条件表达式或是在构建时计算的，JS 配置文件则非常方便。
  然而，缺点是 JS 配置的静态可分析性较差，
  因此对可缓存性、代码检测、IDE 自动完成等有负面影响。
  由于 `babel.config.json` 和 `.babelrc.json` 是静态 JSON 文件，
  因此它允许其他使用 Babel 的工具，如绑定器，安全地缓存 Babel 的结果，
  这可能会带来巨大的构建性能优势。

- `babel.config.cjs` 和 `.babelrc.cjs` 允许你使用 `module.exports` 将配置定义为 CommonJS。
  它们从 `v7.7.0` 开始支持。

- `babel.config.mjs` 和 `.babelrc.mjs` 使用原生 ECMAScript 模块。它们在 Node.js 13.2+（或使用 `--experimental-modules` 标志的更早版本）被支持。
  请记住，原生 ECMAScript 模块是异步的（这就是 `import()` 总是返回 promise 的原因！）
  因此，同步调用 Babel 时将抛出 `.mjs` 配置文件。
  它们从 `v7.8.0` 开始支持。

- 当你的 `package.json` 文件包含 [`"type": "module"`](https://nodejs.org/api/esm.html#esm_code_package_json_code_code_type_code_field) 选项时，
  `babel.config.js` 和 `.babelrc.js` 的行为类似 `.mjs`，
  否则它们与 `.cjs` 文件完全相同。

- `babel.config.cts` and `.babelrc.cts` allow you to define your configuration as Typescript + CommonJS. You must either install `@babel/preset-typescript`, or run Babel using `ts-node`.

  :::note
  🚧 This functionality is experimental. It's not possible yet to use `babel.config.ts` and `babel.config.mts` files, pending stabilization of the Node.js ESM loader API.
  :::

JavaScript configuration files can either export an object, or a function that when called will
return the generated configuration.
Function-returning configs are given a few special powers because they can access an API exposed
by Babel itself. See [Config Function API](#config-function-api) for more information.

:::note
For compatibility reasons, `.babelrc` is an alias for `.babelrc.json`.
:::

## 单体式仓库

单体式结构的仓库通常包含许多包，
这意味着它们通常会遇到 [相对文件的配置](#file-relative-configuration)
和配置文件加载中提到的警告。
本节旨在帮助用户了解如何实现单体式仓库配置。

对于单体式仓库设置，需要理解的核心是 Babel 将你的工作目录作为其逻辑 ["root"](options.md#root)，
如果你想要在特定的子包中运行 Babel 工具，而不希望 Babel 作为一个整体应用于仓库，
则会出现问题。

另外，确定是要使用 [`.babelrc.json`](#file-relative-configuration) 文件还是只使用中央的 [`babel.config.json`](#project-wide-configuration) 文件也很重要。
与 Babel 6 一样，子文件夹特定的配置不需要 [`.babelrc.json`](#file-relative-configuration) 文件，
因此在 Babel 7 中通常不需要这些文件，
而是使用 [`babel.config.json`](#project-wide-configuration)。

### 根 `babel.config.json` 文件

任何单体式仓库结构的第一步都应该是在存储库根目录中创建一个 [`babel.config.json`](#project-wide-configuration) 文件。
这确立了 Babel 的核心概念，即仓库的基准目录。
即使你想用 [`.babelrc.json`](#file-relative-configuration) 文件来单独配置每个包，
将其作为仓库级别选项的位置也很重要。

你通常可以将所有仓库配置放在根 [`babel.config.json`](#project-wide-configuration) 中。
使用 ["overrides"](options.md#overrides)，
你可以轻松定仅适用于仓库的特定子文件夹的配置，
这通常比在仓库中创建许多 `.babelrc.json` 文件更容易遵循。

您可能会遇到的第一个问题是，默认情况下，
Babel 希望从 ["root"](options.md#root) 设置的目录加载 [`babel.config.json`](#project-wide-configuration) 文件，
这意味着如果你创建了一个 [`babel.config.json`](#project-wide-configuration),
却在单个包中运行 Babel，例如：

```shell title="Shell"
cd packages/some-package;
babel src -d dist
```

在该上下文中 Babel 使用的 ["root"](options.md#root) _不是_ 你仓库的根目录，
它将无法找到 [`babel.config.json`](#project-wide-configuration) 文件。

如果你所有的构建脚本都是相对于你的仓库根目录运行的，那么应该已经可以工作了，
但是如果你是在子包中运行 Babel 编译过程，
那么你需要告诉 Babel 在哪里查找配置。有几种方法可以做到这一点，
但是推荐的方法是将 ["rootMode"](options.md#rootmode) 选项设置为 `"upward"`，
这将使 Babel 从工作目录向上搜索 [`babel.config.json`](#project-wide-configuration) 文件，
并使用其位置作为 ["root"](options.md#root) 的值。

测试你的配置是否被检测到的一个有用方法是，
如果配置是一个 [`babel.config.json`](#project-wide-configuration) JavaScript 文件，则在其中放置 `console.log()` 调用：
日志将在 Babel 第一次加载时执行。

设置这个值的方式因项目而异，但是这里有一些例子：

#### CLI

```shell title="Shell"
babel --root-mode upward src -d lib
```

#### @babel/register

```js title="JavaScript"
require("@babel/register")({
  rootMode: "upward",
});
```

#### Webpack

```js title="webpack.config.js"
module: {
  rules: [
    {
      loader: "babel-loader",
      options: {
        rootMode: "upward",
      },
    },
  ];
}
```

#### Jest

Jest
通常安装在单体式仓库的根目录，可能不需要配置，但是如果它在每个包中都安装，配置起来可能会更加复杂。

主要部分是创建一个自定义 jest transformer 文件，该文件包装
`babel-jest` 的默认行为，以便设置选项，例如：

```js title="wrapper.js"
module.exports = require("babel-jest").default.createTransformer({
  rootMode: "upward",
});
```

将其保存在某个位置后，你可以在 Jest 选项中的
[transform 选项](https://jestjs.io/docs/en/configuration#transform-object-string-string) 中使用处于 `babel-jest` 位置的这个文件：

```json title="jest.config.js"
"transform": {
  "^.+\\.jsx?$": "./path/to/wrapper.js"
},
```

因此所有的 JS 文件都将使用你指定的已启用该选项的 `babel-jest` 版本进行处理。

:::note
When using `babel-jest` &lt; 27, you must omit the `.default` part: `require("babel-jest").createTransformer({ ...`.
:::

> 注意：当使用 `babel-jest` 等版本时，你必须删除 `.default` 部分：`require("babel-jest").createTransformer({ ...`。

有很多工具，但最核心的是，如果工作目录还不是单体式仓库的根目录，它们需要启用
`rootMode` 选项。

### 子包的 `.babelrc.json` 文件

类似于 [`babel.config.json`](#project-wide-configuration) 文件必须位于 ["root"](options.md#root) 中的方式，
[`.babelrc.json`](#file-relative-configuration) 文件必须位于根目录的 _package_ 下。 这意味着，工作目录既会受载入的[`babel.config.json`](#project-wide-configuration)影响
 ，也会受载入的[`.babelrc.json`](#file-relative-configuration) 影响。

假设你已经像上面讨论的那样正确地加载了
[`babel.config.json`](#project-wide-configuration) 文件，Babel 将只处理根包（而不是子包）中的
[`.babelrc.json`](#file-relative-configuration) 文件，例如

```text
package.json
babel.config.js
packages/
  mod/
    package.json
    .babelrc.json
    index.js
```

编译 `packages/mod/index.js` 文件将不会加载 `packages/mod/.babelrc.json` 因为
[`.babelrc.json`](#file-relative-configuration) 位于子包，而不是根包中。

要启用对该 [`.babelrc.json`](#file-relative-configuration) 的处理，你需要在 [`babel.config.json`](#project-wide-configuration) 文件中使用
["babelrcRoots"](options.md#babelrcroots) 选项来执行以下操作

```js title="JavaScript"
babelrcRoots: [
  ".",
  "packages/*",
],
```

因此 Babel 将认为所有匹配 `packages/*` 的包与原来的仓库根目录一起，都被允许加载
[`.babelrc.json`](#file-relative-configuration) 文件。

## 配置函数 API

JS 配置文件可以导出一个将传递配置函数 API 的函数：

```js title="JavaScript"
module.exports = function(api) {
  return {};
};
```

`api` 对象与配置文件特定的 API 一起暴露了
Babel 本身暴露于其索引模块的所有内容：

### `api.version`

类型：`string`<br />

正在加载配置文件的 Babel 版本的版本字符串。

### `api.cache`

JS 配置很棒，因为他们可以动态计算配置，
但缺点是它使缓存变得更加困难。Babel
希望避免每次编译文件时都重新执行配置函数，
因为这样还需要重新执行该配置中引用的所有插件和预设函数。

为了避免这种情况，Babel
希望用户在配置函数时告诉它如何管理配置文件中的缓存。

- `api.cache.forever()` - Permacache 计算的配置，永远不再调用该函数。
- `api.cache.never()` - 不要缓存此配置，并且每次都重新执行该功能。
- `api.cache.using(() => process.env.NODE_ENV)` - 根据 `NODE_ENV` 的值缓存。
  每次 `using` 回调返回的值都不是预期的值，总体而言
  将再次调用 config 函数，并将新条目添加到缓存中。
- `api.cache.invalidate(() => process.env.NODE_ENV)` - 根据 `NODE_ENV` 的值缓存。
  每次 `using` 回调返回的值都不是预期的值，总体而言
  将再次调用 config 函数，缓存中的所有条目将替换为结果。
- `api.cache(true)` - 与 `api.cache.forever()` 相同
- `api.cache(false)` - 与 `api.cache.never()` 相同

由于实际的回调结果用于检查缓存条目是否有效，因此建议使用
那：

- 回调应该小而且没有副作用。
- 回调应该返回可能的最小范围的值。例如
  `.using(() => process.env.NODE_ENV)`上面的用法并不理想，因为它会造成一个未知的
  高速缓存条目的数量取决于检测到多少个 `NODE_ENV` 值。
  `.using(() => process.env.NODE_ENV === "development")` 更安全，因为缓存条目
  只能是 `true` 或 `false`。

### `api.env(...)`

由于 `NODE_ENV` 是一种相当常见的切换行为方式，因此 Babel 还包含一个 API 函数
专门为此而设。此 API 用作检查的快速方法
加载了 Babel 的 ["envName"](options.md#envname) ，将 `NODE_ENV` 考虑在内
如果没有设置其他覆盖环境。

它有几种不同的形式：

- `api.env("production")` 返回 `true` 如果 `envName === "production"`.
- `api.env(["development", "test"])` 返回 `true` 如果 `["development", "test"].includes(envName)`.
- `api.env()` 返回当前的 `envName` 字符串。
- `api.env(envName => envName.startsWith("test-"))` 如果 env 以 "test-" 开头，则返回 `true`。

:::note
This function internally makes use of [`api.cache`](#apicache) mentioned above to ensure that Babel is aware that this build depends on a specific `envName`. You should not use it alongside with `api.cache.forever()` or `api.cache.never()`.
:::

### `api.caller(cb)`

此 API 用作访问已传递给 Babel 的 `caller` 数据的方法。
由于 Babel 的许多实例可能在不同的 `caller` 的同一进程中运行
值，这个 API 旨在自动配置 `api.cache`，就像 `api.env()` 一样。

`caller` 值可用作回调函数的第一个参数。
最好用有类似的东西

```js title="JavaScript"
function isBabelRegister(caller) {
  return !!(caller && caller.name === "@babel/register");
}

module.exports = function(api) {
  const isRegister = api.caller(isBabelRegister);

  return {
    // ...
  };
};
```

根据特定环境切换配置行为。

### `api.assertVersion(range)`

虽然 `api.version` 在一般情况下很有用，但有时候声明你的版本会很好。
此 API 公开了一种简单的方法：

```js title="JavaScript"
module.exports = function(api) {
  api.assertVersion("^7.2");

  return {
    // ...
  };
};
```
