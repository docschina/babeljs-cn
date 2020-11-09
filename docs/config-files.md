---
title: 配置文件
id: config-files
---

## 配置文件类型

Babel 有两种并行的配置文件方式，可以一起使用，也可以单独使用。

<<<<<<< HEAD
* 项目范围的配置
  * `babel.config.json` 文件，以及不同扩展名的文件
* 相关文件的配置
  * `.babelrc.json` 文件，以及不同扩展名的文件
  * 带有 `"babel"` 键的 `package.json` 文件
=======
<details>
  <summary>History</summary>
| Version | Changes |
| --- | --- |
| `v7.8.0` | Support `.babelrc.mjs` and `babel.config.mjs` |
| `v7.7.0` | Support `.babelrc.json`, `.babelrc.cjs`, `babel.config.json`, `babel.config.cjs` |
</details>

- Project-wide configuration
  - `babel.config.json` files, with the different extensions (`.js`, `.cjs`, `.mjs`)
- File-relative configuration
  - `.babelrc.json` files, with the different extensions (`.babelrc`, `.js`, `.cjs`, `.mjs`)
  - `package.json` files with a `"babel"` key
>>>>>>> 501c215d927a3640d65e957bd010428a33c73aaa

## 项目范围的配置

Babel 7.x 中的新功能，Babel 具有 ["root"](options.md#root) 目录的概念，默认为
到当前的工作目录。对于项目范围的配置，Babel 将自动搜索
对于此根目录下的 `"babel.config.json"` 文件，或者，在此根目录中使用支持[扩展名](#supported-file-extensions)的方式。
再者，用户可以使用显式 
["configFile"](options.md#configfile) 值覆盖默认的配置文件搜索行为。

因为项目范围的配置文件与项目本身的文件的物理位置分开，
这是个非常合适并值得广泛应用的配置方式，
它甚至允许将 plugins 和 presets 轻松应用于 `node_modules` 或符号链接包中的文件，
要实现这个操作在传统的 Babel 6.x 中配置是非常痛苦。

项目范围配置的主要缺点是，因为它依赖于工作目录
如果工作目录不是 monorepo root，那么在 monorepos 中使用会更加痛苦。
See the [monorepo](#monorepos) documentation for examples of how to use config files in that context.

也可以通过将 ["configFile"](options.md#configfile) 设置为 `false` 来禁用项目范围的配置。

## 相关文件的配置

Babel 通过从被编译（受以下警告限制） ["filename"](options.md#filename) 所处的目录来加载 `.babelrc.json` 文件，
或者加载其它[扩展类型](#supported-file-extensions)的等效文件。
这种功能非常强大，因为它允许你为子 package 创建独立的配置。
相关文件的配置可以设置 [merged](options.md#merging) 
使它们特定的配置覆盖项目范围的配置值，
你也可以通过设置 ["overrides"](options.md#overrides) 来完成。

<<<<<<< HEAD
这些警告意味着：
* `.babelrc.json` 文件*仅*适用于自己的 package。
* `.babelrc.json` 文件在 packages 中，除非你选择加入 ["babelrcRoots"](options.md#babelrcroots) 字段，否则 Babel 将忽略的 root。

有关如何配置具有多个 packages 的 monorepos 的更多讨论，请参阅 [monorepo](#monorepos) 相关文档。
通过将 ["babelrc"](options.md#babelrc) 设置为 `false`，也可以禁用文件相关配置。
=======
There are a few edge cases to consider when using a file-relative config:

- Searching will stop once a directory containing a `package.json` is found, so a relative config
  only applies within a single package.
- The ["filename"](options.md#filename) being compiled must be inside of
  ["babelrcRoots"](options.md#babelrcroots) packages, or else searching will be skipped entirely.

These caveats mean that:

- `.babelrc.json` files _only_ apply to files within their own package
- `.babelrc.json` files in packages that aren't Babel's 'root' are ignored unless you opt in
  with ["babelrcRoots"](options.md#babelrcroots).

See the [monorepo](#monorepos) documentation for more discussion on how to configure monorepos that have many packages.
File-relative configs can also be disabled by setting ["babelrc"](options.md#babelrc) to `false`.
>>>>>>> 501c215d927a3640d65e957bd010428a33c73aaa

### 6.x vs 7.x `.babelrc` loading

来自 Babel 6.x 的用户可能会在这两个边缘情况下绊倒，这是 Babel 7.x 中的新功能。
添加了这两个限制以解决 Babel 6.x 中的常见脚注：

<<<<<<< HEAD
* `.babelrc` 文件经常出乎意料地应用于 `node_modules` 依赖项。
* `.babelrc` 文件 _failed_ 应用于符号链接 `node_modules`，当人们期望它们表现得像正常的依赖。
* `.babelrc` 文件 _in_ `node_modules` 依赖关系将被检测到，即使插件和
  它们内部的预设通常没有安装，甚至可能在版本中无效
  Babel 编译文件。

对于具有 monorepo 结构的用户来说，这些情况会产生问题，因为如果你这样做的话
有
=======
- `.babelrc` files applied to `node_modules` dependencies, often unexpectedly.
- `.babelrc` files _failed_ to apply to symlinked `node_modules` when people expected them to behave like normal dependencies.
- `.babelrc` files _in_ `node_modules` dependencies would be detected, even though the plugins and
  presets inside they were generally not installed, and may not even be valid in the version of
  Babel compiling the file.

These cases will _primarily_ cause issues for users with a monorepo structure, because if you
have

>>>>>>> 501c215d927a3640d65e957bd010428a33c73aaa
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
<<<<<<< HEAD
配置现在将被完全忽略，因为它跨越包边界

一种替代方法是在每个使用 ["extends"](options.md#extends) 的子包中创建 `.babelrc` 
```json
{ "extends": "../../.babelrc" }
```
不幸的是，这种方法可能有点重复，取决于如何使用 Babel，
可能需要设置 ["babelrcRoots"](options.md#babelrcroots)。
=======

the config will now be entirely ignored, because it is across a package boundary.

One alternative would be to create a `.babelrc` in each sub-package that uses ["extends"](options.md#extends) as

```json
{ "extends": "../../.babelrc" }
```

Unfortunately, this approach can be a bit repetitive, and depending on how Babel is being used,
could require setting ["babelrcRoots"](options.md#babelrcroots).
>>>>>>> 501c215d927a3640d65e957bd010428a33c73aaa

鉴于此，可能更希望将 `.babelrc` 重命名为
[project-wide "babel.config.json"](#project-wide-configuration)。如项目范围所述
上面的部分，这可能需要显式设置 ["configFile"](options.md#configfile)
因为如果工作目录不正确，Babel 将找不到配置文件。

## Supported file extensions

Babel can be configured using any file extension natively supported by Node.js: you can use `.json`,
`.js`, `.cjs` and `.mjs`, both for `babel.config.json` and `.babelrc.json` files.

- `babel.config.json` and `.babelrc.json` are parsed as JSON5 and should contain an object matching
  the [options](options.md) format that Babel accepts. They have been supported since `v7.7.0`.

  We recommend using this file type wherever possible: JS config files are
  handy if you have complex configuration that is conditional or otherwise computed at build time.
  However, the downside is that JS configs are less statically analyzable, and therefore have
  negative effects on cacheability, linting, IDE autocomplete, etc.
  Since `babel.config.json` and `.babelrc.json` are static JSON files, it allows other tools that
  use Babel such as bundlers to cache the results of Babel safely, which can be a huge build
  performance win.

- `babel.config.cjs` and `.babelrc.cjs` allow you to define your configuration as CommonJS,
  using `module.exports`. They have been supported since `v7.7.0`.

- `babel.config.mjs` and `.babelrc.mjs` use native ECMAScript modules. They are supported by Node.js 13.2+ (or older versions via the `--experimental-modules` flag).
  Please remember that native ECMAScript modules are asynchronous (that's why `import()` always
  returns a promise!): for this reason, `.mjs` config files will throw when calling Babel
  synchronously. They have been supported since `v7.8.0`.

- `babel.config.js` and `.babelrc.js` behave like the `.mjs` equivalents when your `package.json`
  file contains the [`"type": "module"`](https://nodejs.org/api/esm.html#esm_code_package_json_code_code_type_code_field)
  option, otherwise they are exactly the same as the `.cjs` files.

JavaScript configuration files can either export an object, or a function that when called will
return the generated configuration.
Function-returning configs are given a few special powers because they can access an API exposed
by Babel itself. See [Config Function API](#config-function-api) for more information.

> For compatibility reasons, `.babelrc` is an alias for `.babelrc.json`.

## Monorepos

Monorepo-structured repositories usually contain many packages, which means that they frequently
run into the caveats mentioned in [file-relative configuration](#file-relative-configuration)
and config file loading in general. This section is aimed at helping users understand how
to approach monorepo configuration.

With monorepo setups, the core thing to understand is that Babel treats your working directory
as its logical ["root"](options.md#root), which causes problems if you want to run Babel
tools within a specific sub-package without having Babel apply to the repo as a whole.

Separately, it is also important to decide if you want to use [`.babelrc.json`](#file-relative-configuration)
files or just a central [`babel.config.json`](#project-wide-configuration). [`.babelrc.json`](#file-relative-configuration)
files are not required for subfolder-specific configuration like they were in Babel 6, so often
they are not needed in Babel 7, in favor of [`babel.config.json`](#project-wide-configuration).

### Root `babel.config.json` file

The first step in any monorepo structure should be to create a [`babel.config.json`](#project-wide-configuration)
file in repository root. This establishes Babel's core concept of the base directory of your repository.
Even if you want to use [`.babelrc.json`](#file-relative-configuration) files to configure each separate package,
it is important to have as a place for repo-level options.

You can often place all of your repo configuration in the root [`babel.config.json`](#project-wide-configuration).
With ["overrides"](options.md#overrides), you can easily
specify configuration that only applies to certain subfolders of your repository, which can often be easier to
follow than creating many `.babelrc.json` files across the repo.

The first issue you'll likely run into is that by default, Babel expects to load [`babel.config.json`](#project-wide-configuration)
files from the directory set as its ["root"](options.md#root), which means that if you create
a [`babel.config.json`](#project-wide-configuration), but run
Babel inside an individual package, e.g.

```bash
cd packages/some-package;
babel src -d dist
```

the ["root"](options.md#root) Babel is using in that context is _not_ your monorepo root,
and it won't be able to find the [`babel.config.json`](#project-wide-configuration) file.

If all of your build scripts run relative to your repository root, things should already work, but if
you are running your Babel compilation process from within a subpackage, you need to tell Babel where
to look for the config. There are a few ways to do that, but the recommended way is
the ["rootMode"](options.md#rootmode) option with `"upward"`, which will make Babel search from
the working directory upward looking for your [`babel.config.json`](#project-wide-configuration) file,
and will use its location as the ["root"](options.md#root) value.

One helpful way to test if your config is being detected is to place a `console.log()` call
inside of it if it is a [`babel.config.json`](#project-wide-configuration) JavaScript file: the log will execute
the first time Babel loads it.

How you set this value varies by project, but here are a few examples:

#### CLI

```bash
babel --root-mode upward src -d lib
```

#### @babel/register

```js
require("@babel/register")({
  rootMode: "upward",
});
```

#### Webpack

```js
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

Jest is often installed at the root of the monorepo and may not require configuration,
but if it is installed per-package it can unfortunately be more complex to configure.

The main part is creating a custom jest transformer file that wraps `babel-jest`'s default
behavior in order to set the option, e.g.

```js
module.exports = require("babel-jest").createTransformer({
  rootMode: "upward",
});
```

and with that saved somewhere, you'd then use that file in the place of `babel-jest` in
your Jest options via the [transform option](https://jestjs.io/docs/en/configuration#transform-object-string-string):

```json
"transform": {
  "^.+\\.jsx?$": "./path/to/wrapper.js"
},
```

so all JS files will be processed with your version of `babel-jest` with the option enabled.

#### Others

There are tons of tools, but at the core of it is that they need the `rootMode` option enabled
if the working directory is not already the monorepo root.

### Subpackage `.babelrc.json` files

Similar to the the way [`babel.config.json`](#project-wide-configuration) files are required to be in the ["root"](options.md#root),
[`.babelrc.json`](#file-relative-configuration) files must be in the root _package_, by default. This means that, the same way the
working directory affects [`babel.config.json`](#project-wide-configuration) loading, it also affects [`.babelrc.json`](#file-relative-configuration) loading.

Assuming you've already gotten your [`babel.config.json`](#project-wide-configuration) file loaded properly as discussed above,
Babel will only process [`.babelrc.json`](#file-relative-configuration) files inside that root package (and not subpackages),
so given for instance

```text
package.json
babel.config.js
packages/
  mod/
    package.json
    .babelrc.json
    index.js
```

compiling the `packages/mod/index.js` file will not load `packages/mod/.babelrc.json` because
this [`.babelrc.json`](#file-relative-configuration) is within a sub-package, not the root package.

To enable processing of that [`.babelrc.json`](#file-relative-configuration), you will want to use the ["babelrcRoots"](options.md#babelrcroots)
option from inside your [`babel.config.json`](#project-wide-configuration) file to do

```js
babelrcRoots: [
  ".",
  "packages/*",
],
```

so that Babel will consider all `packages/*` packages as allowed to load [`.babelrc.json`](#file-relative-configuration) files,
along with the original repo root.

## 配置函数API

JS 配置文件可以导出一个将传递配置函数 API 的函数：

```js
module.exports = function(api) {
  return {};
};
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

<<<<<<< HEAD
* `api.cache.forever()` - Permacache 计算的配置，永远不再调用该函数。
* `api.cache.never()` - 不要缓存此配置，并且每次都重新执行该功能。
* `api.cache.using(() => process.env.NODE_ENV)` - 根据 `NODE_ENV` 的值缓存。
  每次 `using` 回调返回的值都不是预期的值，总体而言
  将再次调用 config 函数，并将新条目添加到缓存中。
* `api.cache.invalidate(() => process.env.NODE_ENV)` - 根据 `NODE_ENV` 的值缓存。
  每次 `using` 回调返回的值都不是预期的值，总体而言
  将再次调用 config 函数，缓存中的所有条目将替换为结果。
* `api.cache(true)` - 与 `api.cache.forever()` 相同
* `api.cache(false)` - 与 `api.cache.never()` 相同
=======
- `api.cache.forever()` - Permacache the computed config and never call the function again.
- `api.cache.never()` - Do not cache this config, and re-execute the function every time.
- `api.cache.using(() => process.env.NODE_ENV)` - Cache based on the value of `NODE_ENV`.
  Any time the `using` callback returns a value other than the one that was expected, the overall
  config function will be called again and a new entry will be added to the cache.
- `api.cache.invalidate(() => process.env.NODE_ENV)` - Cache based on the value of `NODE_ENV`.
  Any time the `using` callback returns a value other than the one that was expected, the overall
  config function will be called again and all entries in the cache will be replaced with the result.
- `api.cache(true)` - Same as `api.cache.forever()`
- `api.cache(false)` - Same as `api.cache.never()`
>>>>>>> 501c215d927a3640d65e957bd010428a33c73aaa

由于实际的回调结果用于检查缓存条目是否有效，因此建议使用
那：

<<<<<<< HEAD
* 回调应该小而且没有副作用。
* 回调应该返回可能的最小范围的值。例如
  `.using(() => process.env.NODE_ENV)` 上面的用法并不理想，因为它会造成一个未知的
  高速缓存条目的数量取决于检测到多少个 `NODE_ENV` 值。
  `.using(() => process.env.NODE_ENV === "development")` 更安全，因为缓存条目
  只能是 `true` 或 `false`。
=======
- Callbacks should be small and side-effect free.
- Callbacks should return values with the smallest range possible. For example, the
  `.using(() => process.env.NODE_ENV)` usage above is not ideal because it would create an unknown
  number of cache entries depending on how many values of `NODE_ENV` are detected. It would be
  safer to do `.using(() => process.env.NODE_ENV === "development")` because then the cache entry
  can only ever be `true` or `false`.
>>>>>>> 501c215d927a3640d65e957bd010428a33c73aaa

### `api.env(...)`

由于 `NODE_ENV` 是一种相当常见的切换行为方式，因此 Babel 还包含一个 API 函数
专门为此而设。此 API 用作检查的快速方法
加载了 Babel 的 ["envName"](options.md#envname) ，将 `NODE_ENV` 考虑在内
如果没有设置其他覆盖环境。

它有几种不同的形式：

<<<<<<< HEAD
* `api.env("production")` 返回 `true` 如果 `envName === "production"`.
* `api.env(["development", "test"])` 返回 `true` 如果 `["development", "test"].includes(envName)`.
* `api.env()` 返回当前的 `envName` 字符串。
* `api.env(envName => envName.startsWith("test-"))` 如果 env 以 "test-" 开头，则返回 `true`。
=======
- `api.env("production")` returns `true` if `envName === "production"`.
- `api.env(["development", "test"])` returns `true` if `["development", "test"].includes(envName)`.
- `api.env()` returns the current `envName` string.
- `api.env(envName => envName.startsWith("test-"))` returns `true` if the env starts with "test-".
>>>>>>> 501c215d927a3640d65e957bd010428a33c73aaa

> **Note:** This function internally makes use of [`api.cache`](#apicache) mentioned above to ensure that Babel is aware that this build depends on a specific `envName`. You should not use it alongside with `api.cache.forever()` or `api.cache.never()`.

### `api.caller(cb)`

此 API 用作访问已传递给 Babel 的 `caller` 数据的方法。
由于 Babel 的许多实例可能在不同的 `caller` 的同一进程中运行
值，这个 API 旨在自动配置 `api.cache`，就像 `api.env()` 一样。

<<<<<<< HEAD
`caller` 值可用作回调函数的第一个参数。最好用
有类似的东西
=======
The `caller` value is available as the first parameter of the callback function. It is best used
with something like

>>>>>>> 501c215d927a3640d65e957bd010428a33c73aaa
```js
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
<<<<<<< HEAD
根据特定环境切换配置行为。
=======
>>>>>>> 501c215d927a3640d65e957bd010428a33c73aaa

to toggle configuration behavior based on a specific environment.

### `api.assertVersion(range)`

<<<<<<< HEAD
虽然 `api.version` 在一般情况下很有用，但有时候声明你的版本会很好。
此 API 公开了一种简单的方法：
=======
While `api.version` can be useful in general, it's sometimes nice to just declare your version.
This API exposes a simple way to do that with:

>>>>>>> 501c215d927a3640d65e957bd010428a33c73aaa
```js
module.exports = function(api) {
  api.assertVersion("^7.2");

  return {
    // ...
  };
};
```
