---
title: 配置文件
id: config-files
---

## 配置文件类型

Babel 有两种并行的配置文件方式，可以一起使用，也可以单独使用。

* 项目范围的配置
* 相关文件的配置
  * `.babelrc`（和 `.babelrc.js`）文件
  * 带有 `"babel"` 键的 `package.json` 文件


## 项目范围的配置

Babel 7.x 中的新功能，Babel 具有 ["root"](options.md#root) 目录的概念，默认为
到当前的工作目录。对于项目范围的配置，Babel 将自动搜索
相对对于此根目录下的 `"babel.config.js"` 。或者，用户可以使用显式
 ["configFile"](options.md#configfile) 值覆盖默认的配置文件搜索行为。

因为项目范围的配置文件与项目本身的文件的物理位置分开，
这是个非常合适并值得广泛应用的配置方式，
它甚至允许将 plugins 和 presets 轻松应用于 `node_modules` 或符号链接包中的文件，
要实现这个操作在传统的 Babel 6.x 中配置是非常痛苦。

项目范围配置的主要缺点是，因为它依赖于工作目录
如果工作目录不是 monorepo root，那么在 monorepos 中使用会更加痛苦。
例如：

```text
babel.config.js
packages/
  mod1/
    package.json
    src/index.js
  mod2/
    package.json
    src/index.js
```
并且各个包负责运行他们的构建（以及他们的工作
Babel 的目录是单独的包），`babel.config.js` 文件不会自动生成
加载，用户将需要手动设置它的路径。

也可以通过将 ["configFile"](options.md#configfile) 设置为 `false` 来禁用项目范围的配置。

## 相关文件的配置

通过搜索，Babel 加载 `.babelrc`（和 `.babelrc.js` /`package.json＃babel`）文件
目录结构从正在编译的 ["filename"](options.md#filename) 开始。这种方式
功能强大，因为它允许你为子文件创建独立的配置
存储库。相关文件的配置可以设置 [merged](options.md#merging) 
使它们特定的配置覆盖项目范围的配置值，
你也可以通过设置 ["overrides"](options.md#overrides) 来完成。

使用文件相对配置时需要考虑一些边缘情况：
* 一旦找到包含 `package.json` 的目录，搜索将停止，因此是相对配置
  仅适用于单个包装。
* 正在编译的 ["filename"](options.md#filename) 必须有
  ["babelrcRoots"](options.md#babelrcroots) 包，否则将完全跳过搜索。

通过将 ["babelrc"](options.md#babelrc) 设置为 `false`，也可以禁用文件相关配置。

### 6.x vs 7.x `.babelrc` loading

来自 Babel 6.x 的用户可能会在这两个边缘情况下绊倒，这是 Babel 7.x 中的新功能。
添加了这两个限制以解决 Babel 6.x 中的常见脚注：

* `.babelrc` 文件经常出乎意料地应用于 `node_modules` 依赖项。
* `.babelrc` 文件 _failed_ 应用于符号链接 `node_modules`，当人们期望它们表现得像正常的依赖。
* `.babelrc` 文件 _in_ `node_modules` 依赖关系将被检测到，即使插件和
  它们内部的预设通常没有安装，甚至可能在版本中无效
  Babel 编译文件。

对于具有 monorepo 结构的用户来说，这些情况会产生问题，因为如果你这样做的话
有
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
配置现在将被完全忽略，因为它跨越包边界

一种替代方法是在每个使用 ["extends"](options.md#extends) 的子包中创建 `.babelrc` 
```json
{ "extends": "../../.babelrc" }
```
不幸的是，这种方法可能有点重复，取决于如何使用 Babel，
可能需要设置 ["babelrcRoots"](options.md#babelrcroots)。

鉴于此，可能更希望将 `.babelrc` 重命名为
[project-wide "babel.config.js"](#project-wide-configuration)。如项目范围所述
上面的部分，这可能需要显式设置 ["configFile"](options.md#configfile)
因为如果工作目录不正确，Babel 将找不到配置文件。


## 配置格式

各个配置文件的格式本身分为 JS 文件和 [JSON5](https://json5.org/) 文件。

### JSON5

任何不是 `.js` 文件的文件都将被解析为 JSON5 并且应该包含一个对象匹配
 Babel 接受的 [options](options.md) 格式。

### JavaScript

任何 `.js` 文件都是 `require()` ed 并且应该导出配置对象或函数
这将在调用时返回配置对象。用户可以包括的主要好处是
JS 逻辑构建他们的配置结构，可能允许共享配置逻辑
更容易。 `.js` 文件可以用作 [project-wide configuration](#project-wide-configuration) 或
通过 `.babelrc.js` 文件 [file-relative configuration](#file-relative-configuration)。

功能返回配置具有一些特殊功能，因为它们可以访问暴露的API
由 Babel 本身。有关详细信息，请参阅 [Config Function API](#config-function-api) 。

## 配置函数API

JS 配置文件可以导出一个将传递配置函数 API 的函数：

```js
module.exports = function(api) {
  return {};
}
```

`api` 对象暴露了 everthing Babel 本身暴露于其索引模块，以及
配置文件特定的 API：

### `api.version`

Type: `string`<br />

正在加载配置文件的 Babel 版本的版本字符串。

### `api.cache`

JS 配置很棒，因为他们可以动态计算配置，但缺点是
有一点，它使缓存更难。巴贝尔希望避免重新执行
每次编译文件时配置功能，因为那时它也需要
重新执行该配置中引用的任何插件和预设功能。

避免这种情况，Babel 希望用户在配置函数时告诉它如何管理
在配置文件中缓存。

* `api.cache.forever()` - Permacache 计算的配置，永远不再调用该函数。
* `api.cache.never()` - 不要缓存此配置，并且每次都重新执行该功能。
* `api.cache.using(() => process.env.NODE_ENV)` - 根据 `NODE_ENV` 的值缓存。
  每次 `using` 回调返回的值都不是预期的值，总体而言
  将再次调用 config 函数，并将新条目添加到缓存中。
* `api.cache.invalidate(() => process.env.NODE_ENV)` - 根据 `NODE_ENV` 的值缓存。
  每次 `using` 回调返回的值都不是预期的值，总体而言
  将再次调用 config 函数，缓存中的所有条目将替换为结果。

由于实际的回调结果用于检查缓存条目是否有效，因此建议使用
那：

* 回调应该小而且没有副作用。
* 回调应该返回可能的最小范围的值。例如
  `.using(() => process.env.NODE_ENV)` 上面的用法并不理想，因为它会造成一个未知的
  高速缓存条目的数量取决于检测到多少个 `NODE_ENV` 值。
  `.using(() => process.env.NODE_ENV === "development")` 更安全，因为缓存条目
  只能是 `true` 或 `false`。


### `api.env(...)`

由于 `NODE_ENV` 是一种相当常见的切换行为方式，因此 Babel 还包含一个 API 函数
专门为此而设。此 API 用作检查的快速方法
加载了 Babel 的 ["envName"](options.md#envname) ，将 `NODE_ENV` 考虑在内
如果没有设置其他覆盖环境。

它有几种不同的形式：

* `api.env("production")` 返回 `true` 如果 `envName === "production"`.
* `api.env(["development", "test"])` 返回 `true` 如果 `["development", "test"].includes(envName)`.
* `api.env()` 返回当前的 `envName` 字符串。
* `api.env(envName => envName.startsWith("test-"))` 如果 env 以 "test-" 开头，则返回 `true`。

这个函数在内部使用下面提到的 `api.cache` 来确保这一点
 Babel 意识到这个构建取决于特定的 `envName`。


### `api.caller(cb)`

此 API 用作访问已传递给 Babel 的 `caller` 数据的方法。
由于 Babel 的许多实例可能在不同的 `caller` 的同一进程中运行
值，这个 API 旨在自动配置 `api.cache`，就像 `api.env()` 一样。

`caller` 值可用作回调函数的第一个参数。最好用
有类似的东西
```js
function isBabelRegister(caller) {
  return !!(caller && caller.name === "@babel/register");
}

module.exports = function(api) {
  const isRegister = api.caller(isBabelRegister);

  return {
    // ...
  };
}
```
根据特定环境切换配置行为。


### `api.assertVersion(range)`

虽然 `api.version` 在一般情况下很有用，但有时候声明你的版本会很好。
此 API 公开了一种简单的方法：
```js
module.exports = function(api) {
  api.assertVersion("^7.2");

  return {
    // ...
  };
};
```


