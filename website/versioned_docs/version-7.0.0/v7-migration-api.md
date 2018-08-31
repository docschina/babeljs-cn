---
title: 升级到 Babel 7 (API)
id: version-7.0.0-v7-migration-api
original_id: v7-migration-api
---

当升级到 Babel 7时，用户应参考该文档

<!--truncate-->


> 另请参阅 [v7-migration 指南](v7-migration.md)了解其他用户级更改。

## 所有 Babel 的包

### NodeJS 的支持
![high](https://img.shields.io/badge/level%20of%20awesomeness%3F-high-red.svg)

由于 Node.js 0.10和0.12两个版本都没有维护，因此删除了对这两个版本的支持。

### 导出更改
![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

Babel 包中放弃使用 `add-module-exports` 插件。防止我们的出口发生重大变化必须提前使用。如果在库中导入 Babel 的包，则在使用 `require` 而不是 `import` 时，可能需要使用 `.default`。

## `@babel/core`

默认情况下将 `ast` 更改为 false（大多数工具没有使用它） [babel/babel#7436](https://github.com/babel/babel/pull/7436/commits/8e3e6e0a8838607c5a01ba4232c4d3ff8dee5db0)。

公开曝光但未正式声明的 `Pipeline` 类型（管道机制）已被删除。最好直接使用 `@babel/core` 中公开的转换方法 [babel/babel#5376](https://github.com/babel/babel/pull/5376)。

`babel.util.*` 帮助方法已经被删除，并且  `util.EXTENSIONS` 被迁移到 `babel.DEFAULT_EXTENSIONS`  [babel/babel#5487](https://github.com/babel/babel/pull/5487)。

如果文件匹配 `ignore` 模式或未能匹配 `only` 模式，调用 `babel.transform` 或任何其他转换函数可能返回 null [babel/babel#5487](https://github.com/babel/babel/pull/5487)。

`state.file.opts` 上公开的 `opts.basename` 选项已被删除 。如果您需要它，最好自己从 `opts.filename` 构建它  [babel/babel#5467](https://github.com/babel/babel/pull/5467)。

删除了 `resolveModuleSource`。我们建议使用 `@babel/plugin-module-resolver` 的 'resolvePath' 选项  [babel/babel#6343](https://github.com/babel/babel/pull/6343)

删除了  `babel.analyse` 因为它只是  `babel.transform` 的别名。

删除了 `path.mark()`，由于我们没有使用它，可以在你自己的插件中实现。

删除了 `babel.metadata`，因为生成的插件元数据始终包含在输出结果中。

删除了 `path.hub.file.addImport`，可以使用 `@babel/helper-module-imports` 模块代替。

```diff
+  import { addDefault } from "@babel/helper-module-imports";
function importModule(pkgStore, name, path) {
-  return path.hub.file.addImport(resolvePath(pkgStore, name, path), 'default', name);
+  return addDefault(path, resolvePath(pkgStore, name, path), { nameHint: name });
}
```

### 配置更改

我们对配置查找方式进行了一些重大更改：

> 默认下当搜索给定文件的 `.babelrc` 文件时，在 `package.json` 停止。

对于任何特定文件，Babel v6会一直查找目录层次结构，直到找到配置文件。这意味着你的项目可能会中断，因为它使用在包根目录外找到的配置文件，就像在主目录中一样。

> 添加 Webpack 执行时，对 `babel.config.js` 文件的支持。

因为这会破坏 monorepo 的工作方式（包括 Babel 本身），我们引入了一个新的基本可以消除配置的分层性质的配置文件。

包含一个 `root` 选项，默认为当前工作目录，以便查找该文件。它也没有相对加载，因此它会正确处理符号链接，而之前你可能已经在 webpack 中对路径进行了硬编码。

查看 `babel.config.js` 文档以获取更多信息：[项目范围的配置](config-files.md#project-wide-configuration)

此文件与新的 [`overrides`](options.md#overrides) 属性和 `env` 结合使用，可以使用单个配置文件，该文件可用于项目中的所有文件，而不是每个文件夹每个配置文件。

我们还默认排除 `node_modules` ，只查看 root，除非您选择设置 `.babelrcRoots` 选项的数组，例如 `"babelrcRoots": [".", "node_modules/pkgA"]`。

## 声明 Babel 版本 [#7450](https://github.com/babel/babel/pull/7450)

插件可以检查它是否加载了某个版本的 Babel。API 将抛出一个 `assertVersion` 方法，您可以在其中传入 semver。

声明用来帮助保持向后兼容 v6。

```js
import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(7);
  // ...
});
```

## Babel 插件/预设

目前 `babel` 对象作为第一个参数，然后是插件/预设选项和 `dirname`。

```js
module.exports = function(api, options, dirname) { }
````

## `babel-parser` (被称为 Babylon)

> 移除了 `*` 插件选项[#301](https://github.com/babel/babylon/pull/301) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

这是在v6.14.1（2016年11月17日）中首次添加的，因此不太可能有人正在使用它。

这个包含所有的选项被删除了; 相反，你应该专门决定你想激活哪些插件。

我们认为这对工具来说是一个好事。他们不必不断更新他们的配置，但这也意味着我们不能轻易做出改变。

之前:

```js
babelParser.parse(code, {
  plugins: [ "*" ]
})
```

可以使用以下方法代替旧行为：

```js
babelParser.parse(code, {
  plugins: [
    "asyncGenerators",
    "classProperties",
    "decorators",
    "doExpressions",
    "dynamicImport",
    "exportExtensions",
    "flow",
    "functionBind",
    "functionSent",
    "jsx",
    "objectRestSpread",
  ]
})
```

详见 Babylon 的[插件选项](https://babeljs.io/docs/core-packages/babylon/#api-plugins)

>`decorators` 插件重命名为 `decorators-legacy` ![medium](https://img.shields.io/badge/risk%20of%20breakage%3F-medium-yellow.svg)

被重命名为 `@babel/plugin-proposal-decorators` 的 `legacy` 选项。一个已经实现贯彻新装饰器提案的 `decorators` 插件。

提案的两个版本具有不同的语法，因此强烈建议使用 `decorators-legacy`，直到 Babel 新语义实施。

> 移除 `classConstructorCall` 插件 [#291](https://github.com/babel/babylon/pull/291) ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

## `@babel/traverse`

> 移除对 flow bindings 的支持 [babel/babel#6528](https://github.com/babel/babel/pull/6528)。

变化背后的原因是 `declare var foo` 不会引入新的本地绑定，但它代表了一个全局绑定。

> `getFunctionParent` 将不会再返回 `Program`，使用 `getProgramParent` 代替[#5923](https://github.com/babel/babel/pull/5923). ![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

 `getFunctionParent` 也返回 Program 没有意义，因此被删除了。

要得到相同的效果，需要进行以下类似的更改。

```diff
- path.scope.getFunctionParent()
+ path.scope.getFunctionParent() || path.scope.getProgramParent()
```

> 路径替换/删除 API 现在返回一个新路径的数组。![low](https://img.shields.io/badge/risk%20of%20breakage%3F-low-yellowgreen.svg)

例如，使用 `Path#insertBefore` 或 `Path#replaceWith` 现在将返回新插入/替换路径的数组。

```js
const node = t.nullLiteral();
const [replaced] = path.replaceWith(node);
replace.node === node; // => true
```

在将多个节点插入某些更高的范围时尤其有用，因为可以立即在节点的新 `Path` 上调用 `Path` API。

```js
const parent = path.findParent(() => /* some selection criteria */);
const helperPaths = path.unshiftContainer("body", helpers);
// helperPaths can now be referenced, manipulated, etc.
```

## AST 更改

### 添加 `InterpreterDirective` 节点 [#7928](https://github.com/babel/babel/pull/7928)

Babylon 已经解析了 “shebangs”（`#!env node`），但是在 `Program` 节点中放入了注释。现在我们只是为它创建一个实际的节点。

添加一个新的 `interpreter` 字段到 `Program` 节点。

```js
extend interface Program {
  interpreter: InterpreterDirective;
}
```

添加 `InterpreterDirective` 节点

```js
interface InterpreterDirective <: Node {
    type: "InterpreterDirective";
    value: string;
}
```

### JSX *和TS *节点构建器（来自 @babel/types 包）重命名

例子已更改：`jsx` 和 `ts` 现在为小写。

```diff
- t.jSXIdentifier()
+ t.jsxIdentifier()
```

通常，我们使用 Flow 的 `TypeAnnotation` 和 TypeScript 的 `TSTypeAnnotation` 来区分 ndoe 类型，因此对于共享类型节点，TypeScript 具有 TS 前缀。

### `.expression` 字段从 `ArrowFunctionExpression` 中删除

删除了 `expression` 字段以消除两个不同的来源并需要插件来手动使它们保持同步。现在可以简单地检查函数体是否是 `BlockStatement` ：

```diff
  return {
    visitor: {
      ArrowFunctionExpression({ node }) {
-       if (node.expression) {
+       if (node.body.type !== "BlockStatement") {
          // () => foo;
        }
      }
    }
  };
```

### Tokens 移除

在以前的版本中， `tokens` 总是附加在顶层的AST上。在 `@babel/parser` 的最新版本中，我们删除了此行为并默认禁用它以提高解析器的性能。Babel本身的所有用法都已删除，`@babel/generator` 不再使用 tokens 进行漂亮的打印。

如果你的 babel 插件目前使用 `tokens` ，请评估是否仍然需要并尝试删除使用。如果你的插件真的依赖于获取令牌，仅当没有别的办法时再重新激活它，因为这会损害用户的性能。

激活需要将 babylon 的 `tokens` 选项设置为 true，可以直接从插件中执行此操作。

```js
export default function() {
  return {
    manipulateOptions(opts, parserOpts) {
      parserOpts.tokens = true;
    },
    ...
  };
}
```

### 重命名

以下为重命名节点:

| 名字 6.x | 名字 7.x | 例子 | PR |
|----------|----------|---------|----|
| ExistentialTypeParam | ExistsTypeAnnotation | ```type A = B<*>;``` | [#322](https://github.com/babel/babylon/pull/322) |
| NumericLiteralTypeAnnotation | NumberLiteralTypeAnnotation | ```type T = 0;``` | [#332](https://github.com/babel/babylon/pull/332) |

除了 AST-Nodes 之外， `@babel/types` 中的所有相应功能都已重命名。

```diff
 import * as t from "@babel/types";

 return {
-  ExistentialTypeParam(path) {
-    const parent = path.findParent((path) => path.isExistentialTypeParam());
-    t.isExistentialTypeParam(parent);
+  ExistsTypeAnnotation(path) {
+    const parent = path.findParent((path) => path.isExistsTypeAnnotation());
+    t.isExistsTypeAnnotation(parent);

-    return t.existentialTypeParam();
+    return t.existsTypeAnnotation();
   },
-  NumericLiteralTypeAnnotation(path) {
-    const parent = path.findParent((path) => path.isNumericLiteralTypeAnnotation());
-    t.isNumericLiteralTypeAnnotation(parent);
+  NumberLiteralTypeAnnotation(path) {
+    const parent = path.findParent((path) => path.isNumberLiteralTypeAnnotation());
+    t.isNumberLiteralTypeAnnotation(parent);

-    return t.numericLiteralTypeAnnotation();
+    return t.numberLiteralTypeAnnotation();
   }
 };
```

### 替换

以下 AST 节点，字段 `variance` 的值已从简单的字符串值更改为其自己的名为 `Variance` 的 AST 节点[#333](https://github.com/babel/babylon/pull/333)。

The field is only available when enabling the `flow` plugin in babylon.
字段仅在启用 babylon 中的 `flow` 插件时可用。

  * ObjectProperty
  * ObjectMethod
  * AssignmentProperty
  * ClassMethod
  * ClassProperty
  * Property

新的 `Variance` 节点的类型如下所示：

```js
type VarianceNode = {
  type: "Variance",
  kind: "plus"|"minus",
}
```

```diff
 return {
   Property({ node }) {
-    if (node.variance === "plus") {
+    if (node.variance.kind === "plus") {
       ...
-    } else if (node.variance === "minus") {
+    } else if (node.variance.kind === "minus") {
       ...
     }
   }
 };
```

### 位置变化

 `ObjectTypeIndexer` 的位置信息已更改为不包含分号。这样做是为了与流解析器对齐并具有相同的位置信息[#228](https://github.com/babel/babylon/pull/228)

例子:

```js
var a: { [a: number]: string; };
```

```diff
 {
   "type": "ObjectTypeIndexer",
   "start": 9,
-  "end": 29,
+  "end": 28,
   "loc": {
     "start": {
       "line": 1,
       "column": 9,
     },
     "end": {
       "line": 1,
-      "column": 29
+      "column": 28
     }
   }
 }
```

### 移除

#### ForAwaitStatement

AST-Node 的 `ForAwaitStatement` 已被删除，并替换为 `ForOfStatement` 节点中的字段 `await` [#349](https://github.com/babel/babylon/pull/349)。

```diff
 interface ForOfStatement <: ForInStatement {
   type: "ForOfStatement";
+  await: boolean;
 }
```

```diff
 return {
-  ForAwaitStatement(path) {
-    ...
+  ForOfStatement(path) {
+    if (path.node.await) {
+      ...
+    }
   }
 };
```

#### RestProperty & SpreadProperty

`RestProperty` 和 `SpreadProperty` 两个 AST-Nodes 已删除，转而重用 `RestElement` 和 `SpreadElement`[#384](https://github.com/babel/babylon/pull/384)

```diff
 return {
   SpreadElement(path) {
-    ...
-  },
-  SpreadProperty(path) {
-    ...
+    if (path.parentPath.isObjectExpression()) {
+      ...
+    } else if (path.parentPath.isArrayExpression()) {
+      ...
+    }
   },
   RestElement(path) {
-    ...
-  },
-  RestProperty(path) {
-    ...
+    if (path.parentPath.isObjectPattern()) {
+      ...
+    } else if (path.parentPath.isArrayPattern()) {
+      ...
+    }
   }
 };
```

有关详细信息，请参阅我们的 [Babbel 升级 PR](https://github.com/babel/babel/pull/5317) 和 [Babylon AST 规范](https://github.com/babel/babylon/blob/7.0/ast/spec.md)。
