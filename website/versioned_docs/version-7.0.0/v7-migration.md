---
title: 升级至 Babel 7
id: version-7.0.0-v7-migration
original_id: v7-migration
---

当需要升级到 Babel 7 时，请参照此文档。

<!--truncate-->

因为并非每个重大变化都会影响所有项目，所以我们在升级时根据更改破坏测试的可能性对要内容进行了排序。

## 所有 Babel

> 已经删除了对 Node.js 0.10，0.12，2 和 5 的支持 [#5025](https://github.com/babel/babel/pull/5025)，[#5041](https://github.com/babel/babel/pull/5041)，[#7755](https://github.com/babel/babel/pull/7755)，[#5186](https://github.com/babel/babel/pull/5186)

我们强烈建议您使用较新版本的 Node.js (LTS v8)，因为之前的版本未得到维护。
有关更多信息，请参见 [nodejs/LTS](https://github.com/nodejs/LTS)。

这只是意味着 Babel 本身不会在旧版本的 Node 上运行。它仍然可以输出在旧节点上运行的代码。

## Config Lookup Changes

For more info, read our [6.x vs 7.x comparison](config-files.md#6x-vs-7x-babelrc-loading).

Babel has had issues previously with handling `node_modules`, symlinks, and monorepos. We've made some changes to account for this: Babel will stop lookup at the `package.json` boundary instead of looking up the chain. For monorepos we have added a new `babel.config.js` file that centralizes our config across all the packages (alternatively you could make a config per package). In 7.1, we've introduced a [`rootMode`](options.md#rootmode) option for further lookup if necessary.

## [弃用年份 Preset](/blog/2017/12/27/nearing-the-7.0-release.html#deprecated-yearly-presets-eg-babel-preset-es20xx)

"env" preset 现已推出一年多了，完全取代了之前我们已经/过去建议的一些预设。

- `babel-preset-es2015`
- `babel-preset-es2016`
- `babel-preset-es2017`
- `babel-preset-latest`
- 以上的组合 ^

这些 preset 应替换为 "env" preset。

## [弃用 Stage Preset](https://babeljs.cn/blog/2018/07/27/removing-babels-stage-presets)

我们正在删除 Stage presets，以支持明确的提案使用。可以检查 [stage-0 README](https://github.com/babel/babel/tree/755ec192e22c6b6e00782e4810366d0166fdbebd/packages/babel-preset-stage-0#babelpreset-stage-0) 自述文件以获取更多迁移步骤。

要自动执行此操作，您可以运行 [`npx babel-upgrade`](https://github.com/babel/babel-upgrade)（ PR 添加在[此处](https://github.com/babel/babel-upgrade/pull/69)）。

（发布时添加博客文章的链接）。

## [删除 `@babel/polyfill` 中的 polyfill 提案](https://github.com/babel/babel/issues/8416)

基于类似的想法，我们从 `@babel/polyfill` 中删除了 polyfill 提案。

现在 `@babel/polyfill` 大多只是 `core-js` v2的别名。[资源](https://github.com/babel/babel/blob/master/packages/babel-polyfill/src/index.js)

之前使用它时要两个 imports

```js
import "core-js/shim"; // included < Stage 4 proposals
import "regenerator-runtime/runtime";
```

如果要使用提案，则需要单独导入这些提案。您应该直接从 [`core-js`](https://github.com/zloirock/core-js/tree/v2#usage) 包或 npm 上的另一个包导入它们。

e.g.

```js
import "core-js/fn/array/flat-map";
```

以下是 `core-js` v2 中的 Stage < 3 提案的 polyfill 列表。

<details>

```js
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

## [版本/依赖](/blog/2017/12/27/nearing-the-7.0-release.html#peer-dependencies-integrations)

大多数 plugins/top 包现在在 `@babel/core` 上都有 `peerDependency`。

## 包重命名

- `babylon` 现在是 `@babel/parser`

你仍然可以在配置中使用包名称的简写版本（删除 `preset-` 或 `plugin-`），但为了清晰起见，建议使用整个包名称（也许我们应该删除它，因为它并没减少多少输入）。

```diff
{
-  "presets": ["@babel/preset-react"],
+  "presets": ["@babel/react"], // this is equivalent
-  "plugins": ["@babel/transform-runtime"],
+  "plugins": ["@babel/plugin-transform-runtime"], // same
}
```

### Package 作用域

最重要的变化是最终将所有包切换到 [scoped packages](/blog/2017/12/27/nearing-the-7.0-release.html#renames-scoped-packages-babel-x)。 ([monorepo](https://github.com/babel/babel/tree/master/packages) 中的文件夹名称不会更改，但 package.name 是)

这意味着不会出现意外/故意名称抢注，与社区插件的明显分离以及更简单的命名约定等问题。

你的依赖项需要像这样修改：

`babel-cli` -> `@babel/cli`。 对我们来说，我们基本上是用 `@babel/` 替换 `babel-`。

#### 在配置中使用

你仍然可以使用指定预设或插件的简写方式。但是由于切换到作用域 package，你仍然必须要指定 `@babel/` 就像你有自己的预设添加到配置。

```js
module.exports = {
  presets: ["@babel/env"], // "@babel/preset-env"
  plugins: ["@babel/transform-arrow-functions"], // same as "@babel/plugin-transform-arrow-functions"
};
```

### [切换到 `-proposal-` 用于 TC39 提案](/blog/2017/12/27/nearing-the-7.0-release.html#renames-proposal)

这意味着任何不在年度版本 (ES2015, ES2016, 等等) 中的插件都应该重命名为 `-proposal`。这样我们可以更好地表明提案不是正式的 JavaScript。

例如：

- `@babel/plugin-transform-function-bind` is now `@babel/plugin-proposal-function-bind` (Stage 0)
- `@babel/plugin-transform-class-properties` is now `@babel/plugin-proposal-class-properties` (Stage 3)

这也意味着当提案移至第4阶段时，我们会对 Package 进行重命名。

### [从包名中删除年份](/blog/2017/12/27/nearing-the-7.0-release.html#renames-drop-the-year-from-the-plugin-name)

有些插件名称中有 `-es3-` 或 `-es2015-`，但这些都是不必要的。

`@babel/plugin-transform-es2015-classes` 变成 `@babel/plugin-transform-classes`.

## CommonJS 中的 `"use strict"` 和 `this`

Babel 6 在转换 ES6 模块时，对任何文件都进行了相同的处理，从不考虑文件是否实际上有 ES6 导入/导出。这样做的效果是将对 `this` 的文件范围引用重写为 `undefined`，并会在 Babel 处理的所有 CommonJS 模块的顶部插入 `"use strict"`。

```js
// input.js
this;
```

```js
// output.js v6
"use strict"; // assumed strict modules
undefined; // changed this to undefined
```

```js
// output.js v7
this;
```

这种行为在 Babel 7 中受到限制，只有在文件中有 ES6 导入或导出时才会使用 `transform-es2015-modules-commonjs` 转译该文件。（编者注：如果我们查看 https://github.com/babel/babel/issues/6242，它可能会再次发生变化，因此我们希望在发布之前重新审视这一点）。

```js
// input2.js
import "a";
```

```js
// output.js v6 and v7
"use strict";
require("a");
```

如果你依靠 Babel 自动将 `"use strict"` 注入所有 CommonJS 模块，那么你需要在 Babel 配置中明确使用 `transform-strict-mode` 插件。

## React 和 Flow presets 的分离

`babel-preset-react` 总是包含 Flow 插件。这导致很多用户因为输入错误而无意中使用了 `flow` 语法，或者在没有使用 `flow` 进行类型检查的情况下添加了它而导致错误。

当我们决定支持 TypeScript 时，这个问题就变得复杂了。如果你想使用 react 和 typescript preset，我们必须想出一种通过文件类型或指令自动打开/关闭语法的方法。最后发现，似乎将 preset 完全分离最简单。

预设使 Babel 能够解析 Flow / TypeScript（以及其他方言/语言）提供的类型，然后在编译为 JavaScript 时将其移除。

```diff
{
-  "presets": ["@babel/preset-react"]
+  "presets": ["@babel/preset-react", "@babel/preset-flow"] // parse & remove flow types
+  "presets": ["@babel/preset-react", "@babel/preset-typescript"] // parse & remove typescript types
}
```

## 选项解析

Babel 的配置选项比 Babel 6 更严格。
以逗号分隔的预设列表，例如 `"presets": 'es2015, es2016'` 在技术上工作过，它现在会失败，需要变成一个数组 [#5463](https://github.com/babel/babel/pull/5463)。

请注意，这不适用于 CLI， 其中 `--presets es2015,es2016` 仍然有效。

```diff
{
-  "presets": "@babel/preset-env, @babel/preset-react"
+  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

## Plugin/Preset 导出

为了保持一致性，所有 plugins/presets 都应该导出函数而不是对象。[来自 [babel/babel#6494](https://github.com/babel/babel/pull/6494)]。这将有助于我们进行缓存操作。

## 解析基于字符串的配置值

在 Babel 6 中，直接传递 value 给 Babel（非 config 文件的方式）对于编译解析文件来说，会产生很多问题。

在 Babel 7 中，value 相对路径配置文件，或相对于工作目录均会被正常解析。

对于 `presets` 和 `plugins` 值，此更改意味着 CLI 在诸如此类的情况下表现良好

```bash
babel --presets @babel/preset-es2015 ../file.js
```

假设你的 `node_modules` 文件夹在 `.` 中，在 Babel 6 中，这将失败，因为无法找到预设。

这种变化也会影响 `only` 和 `ignore`，这将在下一次进行扩展。

## 基于路径的 `only` 和 `ignore` 模式

在 Babel 6 中，`only` 和 `ignore` 被视为一般匹配字符串，而不是文件路径 glob。这意味着例如 `*.foo.js` 将匹配 `./**/*.foo.js`，这让大多数用户感到困惑和惊讶。

在 Babel 7 中，这些现在被视为基于路径的 glob 模式，可以是相对路径或绝对路径。这意味着如果你使用这些模式，你可能需要至少为它们添加一个 `**/` 前缀，以确保你的模式与目录深深匹配。

`only` 和 `ignore` 模式仍然_适用_于目录，所以你也可以使用 `only: './tests'` 来只编译 `tests` 目录中的文件，而不需要使用 `**/*.js` 匹配所有嵌套文件。

## Babel's CLI commands

`babel` 命令的 `--copy-files` 参数，告诉 Babel 复制 Babel 不知道如何处理的目录中的所有文件，现在也将复制 `only`/`ignore` 失败的文件校验，在它之前默默地跳过所有被忽略的文件。

### `@babel/node`

Babel 6 中的 `babel-node` 命令是 `babel-cli` 包的一部分。在 Babel 7 中，这个命令被分成了自己的 `@babel/node` 包，所以如果你使用那个命令，你会想要添加这个新的依赖。

### `@babel/runtime`, `@babel/plugin-transform-runtime`

我们已经将 Babel 的助手从运行时的 "polyfilling" 行为中分离出来。更多的细节查看此 [PR](https://github.com/babel/babel/pull/8266).

[`@babel/runtime`](runtime.md) 现在只包含 helpers, 如果需要 `core-js`，你可以使用 [`@babel/runtime-corejs2`](runtime-corejs2.md) 和转换中提供的选项。对于你们两个你仍然需要 [`@babel/plugin-transform-runtime`](plugin-transform-runtime.md)

#### Only Helpers

```sh
# install the runtime as a dependency
npm install @babel/runtime
# install the plugin as a devDependency
npm install @babel/plugin-transform-runtime --save-dev
```

```json
{
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

#### `core-js` 的 Helpers + polyfilling

因此，如果你需要 `transform-js` 支持 `transform-runtime`，你现在将传递 `corejs` 选项并使用 `@babel/runtime-corejs2` 依赖而不是 `@babel/runtime`。

```sh
# install the runtime as a dependency
npm install @babel/runtime-corejs2
# install the plugin as a devDependency
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

## 规范合规性

### `@babel/plugin-proposal-object-rest-spread`

> 在对象中的 RestElement 之后不能出现尾随逗号 [#290](https://github.com/babel/babylon/pull/290) ![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

```diff
var {
-  ...y, // trailing comma is a SyntaxError
+  ...y
} = { a: 1 };
```

---

> 由于Object Spread定义了新属性，而 `Object.assign` 只是设置它们，因此 Babel 已将默认行为更改为更符合规范。

- [objectSpread 辅助函数](https://github.com/babel/babel/blob/007bfb656502a44f6ab50cd64750cc4b38f9efff/packages/babel-helpers/src/helpers.js#L375)
- [extends 辅助函数](https://github.com/babel/babel/blob/007bfb656502a44f6ab50cd64750cc4b38f9efff/packages/babel-helpers/src/helpers.js#L357-L373)

```js
// input
z = { x, ...y };
```

```js
// v7 default behavior: ["proposal-object-rest-spread"]
function _objectSpread(target) { ... }

z = _objectSpread({
  x
}, y);
```

```js
// Old v6 behavior: ["proposal-object-rest-spread", { "loose": true }]
function _extends(target) { ... }

z = _extends({
  x
}, y);
```

```js
// Substitute for Object.assign: ["proposal-object-rest-spread", { "loose": true, "useBuiltIns": true }]
z = Object.assign(
  {
    x,
  },
  y
);
```

### `@babel/plugin-proposal-class-properties`

默认情况下，默认行为更改为以前的 "spec"

```js
// input
class Bork {
  static a = "foo";
  y;
}
```

```js
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

```js
// old v6 behavior: ["@babel/plugin-proposal-class-properties", { "loose": true }]
var Bork = function Bork() {
  this.y = void 0;
};

Bork.a = "foo";
```

### 将 `@babel/plugin-transform-export-extensions` 拆分为两个重命名的提案

这是很长一段时间，但最终改变了。

`@babel/plugin-proposal-export-default-from`

```js
export v from "mod";
```

`@babel/plugin-proposal-export-namespace-from`

```js
export * as ns from "mod";
```

### `@babel/plugin-transform-template-literals`

>  模板字符串修订已更新 [#5523](https://github.com/babel/babel/pull/5523) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

请参阅提案 [Template Literals Revision](https://tc39.github.io/proposal-template-literal-revision/).

它导致 Babel 6 抛出 `Bad character escape sequence (5:6)`。

```js
tag`\unicode and \u{55}`;
```

这已在 Babel 7 中修复，并生成如下内容：

```js
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

```js
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

> 默认为常规模板文字的 "spec" 模式

```js
// input
`foo${bar}`;
```

```js
// default v7 behavior: ["@babel/plugin-transform-template-literals"]
"foo".concat(bar);
```

```js
// old v6 behavior: ["@babel/plugin-transform-template-literals", { "loose": true }]
"foo" + bar;
```

### `@babel/plugin-proposal-decorators`

在新的装饰器提案实现时，我们决定将其作为新的默认行为。这意味着要继续使用当前装饰器的语法/行为，必须将 `legacy` 选项设置为 `true`。

```diff
 {
   "plugins": [
-    "@babel/plugin-proposal-decorators"
+    ["@babel/plugin-proposal-decorators", { "legacy": true }]
   ]
 }
```

> 注意：如果你使用的是包含此插件的 `@babel/preset-stage-0` 或 `@babel/preset-stage-1`， 则必须将 `decoratorsLegacy` 选项传递给它们。

### `@babel/plugin-proposal-pipeline-operator`

默认情况下，较新的提案会出错，而且在阶段 2 之前将要求每个人选择加入特定提案。更详细解释在这里 [post](https://babeljs.io/blog/2018/07/19/whats-happening-with-the-pipeline-proposal).

```diff
{
  "plugins": [
-   "@babel/plugin-proposal-pipeline-operator"
+   ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }]
  ]
}
```

### 删除 `babel-plugin-transform-class-constructor-call`

> babel-plugin-transform-class-constructor-call 已经被删除 [#5119](https://github.com/babel/babel/pull/5119) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

TC39 决定放弃这个提案。你可以将逻辑移动到构造函数或静态方法中。

查看 [/docs/plugins/transform-class-constructor-call/](/docs/plugins/transform-class-constructor-call/) 了解更多。

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

我们将 `babel-plugin-transform-async-to-module-method` 合并到常规异步插件中，只需将其作为选项即可。

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

> 删除 `babel` package [#5293](https://github.com/babel/babel/pull/5293) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

在 v6 中安装 `babel-cli` 这个包现在会给你一个错误信息。
我想我们可以用这个名字做一些有趣的事情。

## `@babel/register`

> `babel-core/register.js` 已被删除 [#5132](https://github.com/babel/babel/pull/5132) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

Babel 7 中删除了 `babel-core/register`，不再推荐使用；而是使用独立包 `@babel/register`。

安装 `@babel/register` 作为新的依赖：

```sh
npm install --save-dev @babel/register
```

使用 Mocha 升级：

```diff
- mocha --require babel-core/register
+ mocha --require @babel/register
```

`@babel/register` 现在也只能直接编译当前工作中的文件（用于修复符号链接问题）。

`@babel/register` 选项现在被替换而不是合并

## `@babel/generator`

> 删除 `quotes` 选项 [#5154](https://github.com/babel/babel/pull/5154)] ![none](https://img.shields.io/badge/risk%20of%20breakage%3F-none-brightgreen.svg)

如果你想格式化编译输出你可以使用 recast/prettier/escodegen/fork babel-generator。

这个选项只能通过 `babel-generator` 明确地提供，直到 v6.18.0，当我们暴露 `parserOpts`和 `generatorOpts` 时。因为该版本中存在错误，所以没有人应该在 Babel 本身中使用此选项。

> 删除 `flowUsesCommas` 选项 [#5123](https://github.com/babel/babel/pull/5123) ![none](https://img.shields.io/badge/risk%20of%20breakage%3F-none-brightgreen.svg)

目前，流对象类型中有 2 种支持的语法（`,` 和 `;`）。

这种变化只会使 babel-generator 输出 `,` 而不是 `;`。

## `@babel/core`

> 移除 `babel-core/src/api/browser.js` [#5124](https://github.com/babel/babel/pull/5124) ![none](https://img.shields.io/badge/risk%20of%20breakage%3F-none-brightgreen.svg)

`babel-browser` 已在 6.0 中删除。如果你需要在浏览器或非节点环境中使用 Babel，请使用 [@babel/standalone](standalone.md)。

Babel将返回 `filename` 作为绝对路径 [#8044](https://github.com/babel/babel/pull/8044)

## `@babel/preset-env`

`loose` 模式现在会自动排除 `typeof-symbol` 转换（许多使用松散模式的项目都是这样做的）。
