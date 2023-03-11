---
title: "升级至 Babel 7"
id: v7-migration
translators:
  - fikyair
---

使用者可参阅此文档升级至 Babel 7。点击 [这里](v7-migration-api.md) 查看 API 的所有变更。

<!--truncate-->

因为不是每一个破坏性变更都会影响到每一个项目，所以我们依据每个变更在升级时产生破坏的可能性测试，对它们进行了排序。

## 所有的 Babel

> 已取消对 Node.js 0.10、0.12、4 和 5 的支持 [#5025](https://github.com/babel/babel/pull/5025), [#5041](https://github.com/babel/babel/pull/5041), [#7755](https://github.com/babel/babel/pull/7755), [#5186](https://github.com/babel/babel/pull/5186)

我们强烈建议你使用较新版本的 Node.js (LTS v8)，因为较旧的版本不再进行维护了。
有关更多信息，请参阅 [nodejs/LTS](https://github.com/nodejs/LTS)。

这意味着虽然 Babel _本身_ 不能在旧版本的 Node 上运行。它仍然可以在旧版本的 Node 上 _输出_ 代码。

## 查阅参数的变更

请阅读 [6.x vs 7.x comparison](config-files.md#6x-vs-7x-babelrc-loading) 了解更多信息。

Babel 之前在处理 `node_modules` 、symlinks 以及 monorepos 时有一些问题。为此，我们进行了一些更改：Babel 将停止查找 `package.json` 边界而支持查找链。对于 monorepos，我们添加了一个新的 `babel.config.js` 文件，它将集中管理我们所有包的配置（或者你也可以为每个包进行单独配置）。在 7.1 中，我们引入了 [`rootMode`](options.md#rootmode) 选项，以便在必要时进一步查找。

<<<<<<< HEAD
## [弃用年度预设](/blog/2017/12/27/nearing-the-7.0-release.html#deprecated-yearly-presets-eg-babel-preset-es20xx)
=======
## [Yearly Preset Deprecations](https://babeljs.io/blog/2017/12/27/nearing-the-7.0-release.html#deprecated-yearly-presets-eg-babel-preset-es20xx)
>>>>>>> e0b83b4e6f2450b75726da0a515b8d937ee04c77

“env“ 预设已经推出一年多了, 也完全取代了我们早期拥有并且推荐的一些预设。

- `babel-preset-es2015`
- `babel-preset-es2016`
- `babel-preset-es2017`
- `babel-preset-latest`
- 以上组合 ^

这些预设应替换为 “env” 预设。

## [弃用 Stage 预设](https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets)

我们正在删除 Stage 预设，以支持已明确提案的使用。你可以查看 [stage-0 README](https://github.com/babel/babel/tree/755ec192e22c6b6e00782e4810366d0166fdbebd/packages/babel-preset-stage-0#babelpreset-stage-0) 文件来了解更多迁移步骤。

想自动执行升级操作，你可以执行 [`npx babel-upgrade`](https://github.com/babel/babel-upgrade) 命令 (相关 PR 在[此处](https://github.com/babel/babel-upgrade/pull/69))。

## [移除在 `@babel/polyfill` 里的 polyfills 提案](https://github.com/babel/babel/issues/8416)

基于与前文相同的观点，我们从 `@babel/polyfill` 中删除了 polyfill 提案。

现在 `@babel/polyfill` 大多只是`core-js` v2 的别名。[源文件](https://github.com/babel/babel/blob/master/packages/babel-polyfill/src/index.js)

使用它之前只需要导入 2 个包：

```js title="JavaScript"
import "core-js/shim"; // included < Stage 4 proposals
import "regenerator-runtime/runtime";
```

如果你想使用这些被移除了的提案, 你需要单独导入它们。你应该直接从 [`core-js`](https://github.com/zloirock/core-js/tree/v2#usage) 包或 npm 上的其他包中导入它们。

例如：

```js title="JavaScript"
// for core-js v2:
import "core-js/fn/array/flat-map";

// for core-js v3:
import "core-js/features/array/flat-map";
```

以下是 `core-js` v2 中 Stage < 3 的 polyfills 提案列表。

<details>

```js title="JavaScript"
// core-js v2

// Stage 3
import "core-js/fn/string/trim-left";
import "core-js/fn/string/trim-right";
import "core-js/fn/string/match-all";
import "core-js/fn/array/flat-map";
import "core-js/fn/array/flatten"; // RENAMED
import "core-js/fn/global";

// Stage 1
import "core-js/fn/symbol/observable";
import "core-js/fn/promise/try";
import "core-js/fn/observable";

// Stage 1 Math Extensions
import "core-js/fn/math/clamp";
import "core-js/fn/math/deg-per-rad";
import "core-js/fn/math/degrees";
import "core-js/fn/math/fscale";
import "core-js/fn/math/iaddh";
import "core-js/fn/math/isubh";
import "core-js/fn/math/imulh";
import "core-js/fn/math/rad-per-deg";
import "core-js/fn/math/radians";
import "core-js/fn/math/scale";
import "core-js/fn/math/umulh";
import "core-js/fn/math/signbit";

// Stage 1 "of and from on collection constructors"
import "core-js/fn/map/of";
import "core-js/fn/set/of";
import "core-js/fn/weak-map/of";
import "core-js/fn/weak-set/of";
import "core-js/fn/map/from";
import "core-js/fn/set/from";
import "core-js/fn/weak-map/from";
import "core-js/fn/weak-set/from";

// Stage 0
import "core-js/fn/string/at";

// Nonstandard
import "core-js/fn/object/define-getter";
import "core-js/fn/object/define-setter";
import "core-js/fn/object/lookup-getter";
import "core-js/fn/object/lookup-setter";
// import "core-js/fn/map/to-json"; // Not available standalone
// import "core-js/fn/set/to-json"; // Not available standalone

import "core-js/fn/system/global";
import "core-js/fn/error/is-error";
import "core-js/fn/asap";

// Decorator metadata? Not sure of stage/proposal
import "core-js/fn/reflect/define-metadata";
import "core-js/fn/reflect/delete-metadata";
import "core-js/fn/reflect/get-metadata";
import "core-js/fn/reflect/get-metadata-keys";
import "core-js/fn/reflect/get-own-metadata";
import "core-js/fn/reflect/get-own-metadata-keys";
import "core-js/fn/reflect/has-metadata";
import "core-js/fn/reflect/has-own-metadata";
import "core-js/fn/reflect/metadata";
```

</details>

<<<<<<< HEAD
## [版本控制/依赖关系](/blog/2017/12/27/nearing-the-7.0-release.html#peer-dependencies-integrations)
=======
## [Versioning/Dependencies](https://babeljs.io/blog/2017/12/27/nearing-the-7.0-release.html#peer-dependencies--integrations)
>>>>>>> e0b83b4e6f2450b75726da0a515b8d937ee04c77

现在大多数插件/顶级包在 `@babel/core` 上都有一个 `peerDependency`。

## 重命名包

- `babylon` 现在叫 `@babel/parser`

你仍然可以在配置中使用包名的简写版本（不带有 `preset-` 或 `plugin-`前缀），但为了清晰起见，我选择使用整个包名（也许我们应该直接删除它，因为它并不会节省太多的操作）。

```diff
{
-  "presets": ["@babel/preset-react"],
+  "presets": ["@babel/react"], // this is equivalent
-  "plugins": ["@babel/transform-runtime"],
+  "plugins": ["@babel/plugin-transform-runtime"], // same
}
```

### 作用域包

<<<<<<< HEAD
最重要的变化是最后将所有包切换到 [scoped packages](/blog/2017/12/27/nearing-the-7.0-release.html#renames-scoped-packages-babel-x)（[monorepo](https://github.com/babel/babel/tree/main/packages) 中的文件夹名称未更改，因此其 `package.json` 中的名称则没变）。
=======
The most important change is finally switching all packages to [scoped packages](https://babeljs.io/blog/2017/12/27/nearing-the-7.0-release.html#renames-scoped-packages-babel-x) (the folder names in the [monorepo](https://github.com/babel/babel/tree/main/packages) are not changed but the name in its `package.json` is).
>>>>>>> e0b83b4e6f2450b75726da0a515b8d937ee04c77

这意味着不会再有意外/故意地抢注名称、与社区插件明确分隔或更简单命名约定争议等问题。

你的依赖项需要像这样修改：

`babel-cli` -> `@babel/cli`. 对我们来说，我们基本上是从用 `@babel/` 替换 `babel-` 开始的。

#### 在配置中使用

你仍然可以使用简写方式来指定预设或插件。但是，由于作用域包的切换，你仍然必须指定 `@babel/`，就像你有自己的预设要添加到配置中一样。

```js title="babel.config.js"
module.exports = {
  presets: ["@babel/env"], // "@babel/preset-env"
  plugins: ["@babel/transform-arrow-functions"], // same as "@babel/plugin-transform-arrow-functions"
};
```

<<<<<<< HEAD
### [对于 TC39 提案，切换到 `-proposal-`](/blog/2017/12/27/nearing-the-7.0-release.html#renames-proposal)
=======
### [Switch to `-proposal-` for TC39 Proposals](https://babeljs.io/blog/2017/12/27/nearing-the-7.0-release.html#renames-proposal)
>>>>>>> e0b83b4e6f2450b75726da0a515b8d937ee04c77

这意味着任何不在年度版本（ES2015、ES2016 等）中的插件都应该重命名为 `-proposal`。 这样我们就可以更好地表明提案并未正式应用于 JavaScript。

例如:

- `@babel/plugin-transform-function-bind` is now `@babel/plugin-proposal-function-bind` (Stage 0)
- `@babel/plugin-transform-class-properties` is now `@babel/plugin-proposal-class-properties` (Stage 3)

这也意味着当提案进入第 4 阶段时，我们应该重命名包。

<<<<<<< HEAD
### [从包名称中删除年份](/blog/2017/12/27/nearing-the-7.0-release.html#renames-drop-the-year-from-the-plugin-name)
=======
### [Remove the year from package names](https://babeljs.io/blog/2017/12/27/nearing-the-7.0-release.html#renames-drop-the-year-from-the-plugin-name)
>>>>>>> e0b83b4e6f2450b75726da0a515b8d937ee04c77

一些插件的名称中有 `-es3-` 或 `-es2015-`，但这些都是不必要的。

`@babel/plugin-transform-es2015-classes` 变成 `@babel/plugin-transform-classes`.

## CommonJS 中的 `"use strict"` 和 `this`

Babel 6 对要处理的任何文件都会随意地执行 ES6 模块转换，从未考虑文件中是否真的有 ES6 导入/导出。这会将文件范围内对 `this` 的引用重写为 `undefined`，并在 Babel 处理的所有 CommonJS 模块的顶部插入 `"use strict"`。

```js title="JavaScript"
// input.js
this;
```

```js title="JavaScript"
// output.js v6
"use strict"; // assumed strict modules
undefined; // changed this to undefined
```

```js title="JavaScript"
// output.js v7
this;
```

这种行为在 Babel 7 中已受到限制，因此对于 `transform-es2015-modules-commonjs` 转换，只有在文件中有 ES6 导入或导出时才会更改文件。（编者注：如果我们采纳这个 https://github.com/babel/babel/issues/6242，可能会再次改变，所以我们想在发布之前重新审阅）。

```js title="JavaScript"
// input2.js
import "a";
```

```js title="JavaScript"
// output.js v6 and v7
"use strict";
require("a");
```

如果你依赖 Babel 自动将 `"use strict"` 注入到你所有的 CommonJS 模块中，你需要在你的 Babel 配置中明确使用 `transform-strict-mode` 插件。

## React 和 Flow 预设的分离

`babel-preset-react` 一直包含 Flow 插件。这给用户造成了很多问题，由于错字而无意中使用了 `flow` 语法，或者在没有使用 `flow` 进行类型检查的情况下误添加了它，从而导致报错。

当我们决定支持 TypeScript 时，这个问题变得更加复杂。 如果你想使用 React 和 TypeScript 预设，我们必须想办法通过文件类型或指令自动打开/关闭语法。 最后，我们发现完全分离预设会更容易一点儿。

预设使 Babel 能够解析 Flow / TypeScript（以及其他方言 / 语言）提供的类型，然后在编译为 JavaScript 时将它们抽离。

```diff
{
-  "presets": ["@babel/preset-react"]
+  "presets": ["@babel/preset-react", "@babel/preset-flow"] // parse & remove flow types
+  "presets": ["@babel/preset-react", "@babel/preset-typescript"] // parse & remove typescript types
}
```

## 配置解析

Babel 7 的配置选项比 Babel 6 更严格。
之前以逗号分隔的字符串可用于预设，例如。`"presets": 'es2015, es2016'` 在技术上是有效的, 现在已经失效了，需要将其改成数组 [#5463](https://github.com/babel/babel/pull/5463)。

注意，这并不适用于 CLI，在 CLI 中 `——presets es2015,es2016` 肯定仍然有效。

```diff
{
-  "presets": "@babel/preset-env, @babel/preset-react"
+  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

## 插件 / 预设导出

为了保持一致性，所有插件 / 预设现在都应该导出一个函数而不是一个对象（[参考 babel/babel#6494](https://github.com/babel/babel/pull/6494)）。这个配置将帮助我们进行缓存。

## 解析基于字符串的配置值

在 Babel 6 中，直接传递给 Babel（而不是从配置文件）的配置值是相对于正在编译的文件进行解析的，这样会导致很多混乱。

在 Babel 7 中，配置值可与加载它们的配置文件一致，也可与工作目录是一致的。

对于 `presets` 和 `plugins` 值，这种变化意味着 CLI 将在以下情况下表现良好。

```shell title="Shell"
babel --presets @babel/preset-env ../file.js
```

如果 `node_modules` 文件夹放在 `.` 中，在 Babel 6 中这找不到预设。

这个更改也会影响 `only` 和 `ignore`，接下来将对其进行扩展。

## 基于路径的 `only` 和 `ignore` 模式

在 Babel 6 中，`only` 和 `ignore` 被视为通用匹配字符串，而不是文件路径 glob。所以像这样 `*.foo.js` 会匹配 `./**/*.foo.js`，而这会让大多数用户感到疑惑。

在 Babel 7 中，基于路径的 glob 模式，可以是相对路径或绝对路径。这意味着，如果你正在使用这些模式，您现在可能至少需要为它们添加一个 `**/` 前缀，以确保你的模式与目录深度匹配。

`only` 和 `ignore` 模式 _确实_ 仍然适用于目录，所以你也可以使用 `only: './tests'` 只编译你的 `tests` 目录中的文件，而无需使用 `**/* .js` 以匹配所有嵌套文件。

## Babel 的 CLI 命令

`babel` 命令的 `--copy-files` 参数意味着让 Babel 直接复制所有不知道如何处理的目录中的文件，以及 `only` / `ignore` 检查失败的文件，之前的版本则会跳过所有被忽略的文件。

### `@babel/node`

Babel 6 中的 `babel-node` 命令是 `babel-cli` 包的一部分。 在 Babel 7 中，这个命令已经被拆分成它自己的 `@babel/node` 包，所以如果你正在使用那个命令，你需要添加这个新的依赖项。

### `@babel/runtime`, `@babel/plugin-transform-runtime`

我们已经将 Babel 的 helper 与它在运行时的 “polyfilling” 行为分开了。[PR](https://github.com/babel/babel/pull/8266) 中有更多细节。

[`@babel/runtime`](runtime.md) 现在只包含 helpers，如果你需要 `core-js` 你可以使用 [`@babel/runtime-corejs2`](runtime-corejs2.md) 和 transform 中提供的参数。对于两者，你仍然需要 [`@babel/plugin-transform-runtime`](plugin-transform-runtime.md)

#### Helpers

```sh title="Shell"
# install the runtime as a dependency
npm install @babel/runtime
# install the plugin as a devDependency
npm install @babel/plugin-transform-runtime --save-dev
```

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

#### 来源于 `core-js` 的 Helpers + polyfilling

因此，如果您需要通过 `transform-runtime` 支持 `core-js`，现在可以传递 `corejs` 选项并使用 `@babel/runtime-corejs2` 依赖项而不是 `@babel/runtime`。

<<<<<<< HEAD
```sh
# 作为生产依赖安装运行时
=======
```sh title="Shell"
# install the runtime as a dependency
>>>>>>> e0b83b4e6f2450b75726da0a515b8d937ee04c77
npm install @babel/runtime-corejs2
# 作为开发依赖安装插件
npm install @babel/plugin-transform-runtime --save-dev
```

```diff
{
  "plugins": [
-   ["@babel/plugin-transform-runtime"],
+   ["@babel/plugin-transform-runtime", {
+     "corejs": 2,
+   }],
  ]
}
```

---

## 遵循的规范

### `@babel/plugin-proposal-object-rest-spread`

> 在对象中的 RestElement 之后不能出现逗号 [#290](https://github.com/babel/babylon/pull/290) ![medium](https://img.shields.io/badge/risk% 20of%20breakage%3F-medium-yel​​low.svg)。

```diff
var {
-  ...y, // trailing comma is a SyntaxError
+  ...y
} = { a: 1 };
```

---

> 由于 Object Spread 定义了新的属性，而 `Object.assign` 只是设置了它们，Babel 已经改变了默认行为以更符合规范。

- [objectSpread helper function](https://github.com/babel/babel/blob/007bfb656502a44f6ab50cd64750cc4b38f9efff/packages/babel-helpers/src/helpers.js#L375)
- [extends helper function](https://github.com/babel/babel/blob/007bfb656502a44f6ab50cd64750cc4b38f9efff/packages/babel-helpers/src/helpers.js#L357-L373)

```js title="JavaScript"
// input
z = { x, ...y };
```

```js title="JavaScript"
// v7 default behavior: ["proposal-object-rest-spread"]
function _objectSpread(target) { ... }

z = _objectSpread({
  x
}, y);
```

```js title="JavaScript"
// Old v6 behavior: ["proposal-object-rest-spread", { "loose": true }]
function _extends(target) { ... }

z = _extends({
  x
}, y);
```

```js title="JavaScript"
// Substitute for Object.assign: ["proposal-object-rest-spread", { "loose": true, "useBuiltIns": true }]
z = Object.assign(
  {
    x,
  },
  y
);
```

### `@babel/plugin-proposal-class-properties`

默认行为变为默认情况下以前的 “spec”

```js title="JavaScript"
// input
class Bork {
  static a = "foo";
  y;
}
```

```js title="JavaScript"
// v7 default behavior: ["@babel/plugin-proposal-class-properties"]
var Bork = function Bork() {
  Object.defineProperty(this, "y", {
    enumerable: true,
    writable: true,
    value: void 0,
  });
};

Object.defineProperty(Bork, "a", {
  enumerable: true,
  writable: true,
  value: "foo",
});
```

```js title="JavaScript"
// old v6 behavior: ["@babel/plugin-proposal-class-properties", { "loose": true }]
var Bork = function Bork() {
  this.y = void 0;
};

Bork.a = "foo";
```

### 将 `@babel/plugin-transform-export-extensions` 拆分为两个重命名的提案

这是一个漫长的过程，但最终改变了。

`@babel/plugin-proposal-export-default-from`

```js title="JavaScript"
export v from "mod";
```

`@babel/plugin-proposal-export-namespace-from`

```js title="JavaScript"
export * as ns from "mod";
```

### `@babel/plugin-transform-template-literals`

> 模板字符串修订版更新 [#5523](https://github.com/babel/babel/pull/5523) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

见提案 [模版字符串修改](https://tc39.github.io/proposal-template-literal-revision/).

它导致 Babel 6 抛出“坏字符转义序列 (5:6)”。

```js title="JavaScript"
tag`\unicode and \u{55}`;
```

这已在 Babel 7 中修复并生成如下内容：

```js title="JavaScript"
// default
function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(
    Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })
  );
}
var _templateObject = /*#__PURE__*/ _taggedTemplateLiteral(
  [void 0],
  ["\\unicode and \\u{55}"]
);
tag(_templateObject);
```

```js title="JavaScript"
// loose mode
function _taggedTemplateLiteralLoose(strings, raw) {
  strings.raw = raw;
  return strings;
}
var _templateObject = /*#__PURE__*/ _taggedTemplateLiteralLoose(
  [void 0],
  ["\\unicode and \\u{55}"]
);
tag(_templateObject);
```

---

> 常规模板字符串默认为以前的 “spec” 模式

```js title="JavaScript"
// input
`foo${bar}`;
```

```js title="JavaScript"
// default v7 behavior: ["@babel/plugin-transform-template-literals"]
"foo".concat(bar);
```

```js title="JavaScript"
// old v6 behavior: ["@babel/plugin-transform-template-literals", { "loose": true }]
"foo" + bar;
```

### `@babel/plugin-proposal-decorators`

考虑到新的装饰器提案实现，我们决定将其设为新的默认行为。 这意味着要继续使用当前的装饰器语法/行为，您必须将 `legacy` 选项设置为 `true`。

```diff
 {
   "plugins": [
-    "@babel/plugin-proposal-decorators"
+    ["@babel/plugin-proposal-decorators", { "legacy": true }]
   ]
 }
```

> 注意：如果你正在使用包含这个插件的 `@babel/preset-stage-0` 或 `@babel/preset-stage-1`，你必须向它们传递 `decoratorsLegacy` 选项。

### `@babel/plugin-proposal-pipeline-operator`

更新的提案在默认情况下会出错，并且会要求每个人在处于 < Stage 2 时选择加入特定提案。在这篇 [文章](https://babeljs.io/blog/2018/07/19/whats-happening-with-the-pipeline-proposal)中。

```diff
{
  "plugins": [
-   "@babel/plugin-proposal-pipeline-operator"
+   ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }]
  ]
}
```

### 删除 `babel-plugin-transform-class-constructor-call`

> babel-plugin-transform-class-constructor-call 被删除 [#5119](https://github.com/babel/babel/pull/5119) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

TC39 决定放弃这个提议。你可以将逻辑写到构造函数或静态方法中。

<<<<<<< HEAD
有关更多信息，请参阅 [/docs/plugins/transform-class-constructor-call/](/docs/plugins/transform-class-constructor-call/)。
=======
See [/docs/plugins/transform-class-constructor-call/](https://old.babeljs.io/docs/plugins/transform-class-constructor-call/) for more information.
>>>>>>> e0b83b4e6f2450b75726da0a515b8d937ee04c77

```diff
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

-  call constructor(x, y) {
+  static secondConstructor(x, y) {
      return new Point(x, y);
    }
  }

  let p1 = new Point(1, 2);
- let p2 = Point(3, 4);
+ let p2 = Point.secondConstructor(3, 4);
```

### `@babel/plugin-async-to-generator`

我们将 `babel-plugin-transform-async-to-module-method` 作为一个参数，合并到常规的异步插件中。

```diff
{
  "plugins": [
-    ["@babel/transform-async-to-module-method"]
+    ["@babel/transform-async-to-generator", {
+      "module": "bluebird",
+      "method": "coroutine"
+    }]
  ]
}
```

## `babel`

> 删除 `babel` 包 [#5293](https://github.com/babel/babel/pull/5293) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

在 v6 中安装 `babel-cli`，会出现一个错误信息。
我认为我们可以用这个名字做一些有趣的事情。

## `@babel/register`

> `babel-core/register.js` 已经被移除 [#5132](https://github.com/babel/babel/pull/5132) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

Babel 7 中使用独立包 `@babel/register` 来代替不推荐使用的 `babel-core/register`；

作为一个新的依赖安装 `@babel/register`：

```shell npm2yarn
npm install --save-dev @babel/register
```

用 Mocha 升级:

```diff
- mocha --require babel-core/register
+ mocha --require @babel/register
```

`@babel/register` 现在也只会直接编译当前工作中的文件（这样做是为了解决符号链接问题）。

`@babel/register` 参数现在被替换而不是合并。

## `@babel/generator`

> 删除 `quotes` 参数 [#5154](https://github.com/babel/babel/pull/5154)] ![none](https://img.shields.io/badge/risk%20of%20breakage%3F-none-brightgreen.svg)

如果你想格式化编译输出，你可以使用 recast/prettier/escodegen/fork babel-generator。

在 v6.18.0 及以下，当我们暴露 `parserOpts` 和 `generatorOpts` 时，这个参数只能通过 `babel-generator` 显式地使用。因为在那个版本中有一个错误，不应该在 Babel 本身中使用这个参数。

> 删除 `flowUsesCommas` 参数 [#5123](https://github.com/babel/babel/pull/5123) ![none](https://img.shields.io/badge/risk%20of%20breakage%3F-none-brightgreen.svg)

当前，Flow 类型中有 2 种支持的语法（`,` 和 `;`）。

这个改变只会让 babel-generator 输出 `,` 而不是 `;`。

## `@babel/core`

> 删除 `babel-core/src/api/browser.js` [#5124](https://github.com/babel/babel/pull/5124) ![none](https://img.shields.io/badge/risk%20of%20breakage%3F-none-brightgreen.svg)

`babel-browser` 已经在 6.0 中移除了。 如果需要在浏览器或非 Node 环境下使用 Babel，请使用 [@babel/standalone](standalone.md)。

Babel 会将 `filename` 作为绝对路径返回 [#8044](https://github.com/babel/babel/pull/8044)

## `@babel/preset-env`

`loose` 模式现在会自动排除 `typeof-symbol` 变换（很多使用松散模式的项目都在这样做）。
