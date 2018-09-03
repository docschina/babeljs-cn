---
id: version-7.0.0-plugins
title: 插件
original_id: plugins
---

Babel 是一个编译器（源代码=>输出代码）。像许多其他编译器一样，它分三个阶段运行：解析，转换和生成新代码。

现在，开箱即用的 Babel 没有做任何事情。通过解析代码，基本上像 `const babel = code => code;` ，然后再次生成相同的代码。所以做任何事你都需要添加 Babel 插架来实现。

可以在 [preset](presets.md) 中启用一组插件，而不是单独的插件。

## 转换插件

这些插件将把转换应用到你的代码中。

<blockquote class="babel-callout babel-callout-info">
  <p>
    转换插件将启用相应的语法插件，因此不必同时指定它们。
  </p>
</blockquote>

### ES3

- [member-expression-literals](plugin-transform-member-expression-literals.md)
- [property-literals](plugin-transform-property-literals.md)
- [reserved-words](plugin-transform-reserved-words.md)

### ES5

- [property-mutators](plugin-transform-property-mutators.md)

### ES2015

- [arrow-functions](plugin-transform-arrow-functions.md)
- [block-scoped-functions](plugin-transform-block-scoped-functions.md)
- [block-scoping](plugin-transform-block-scoping.md)
- [classes](plugin-transform-classes.md)
- [computed-properties](plugin-transform-computed-properties.md)
- [destructuring](plugin-transform-destructuring.md)
- [duplicate-keys](plugin-transform-duplicate-keys.md)
- [for-of](plugin-transform-for-of.md)
- [function-name](plugin-transform-function-name.md)
- [instanceof](plugin-transform-instanceof.md)
- [literals](plugin-transform-literals.md)
- [new-target](plugin-transform-new-target.md)
- [object-super](plugin-transform-object-super.md)
- [parameters](plugin-transform-parameters.md)
- [shorthand-properties](plugin-transform-shorthand-properties.md)
- [spread](plugin-transform-spread.md)
- [sticky-regex](plugin-transform-sticky-regex.md)
- [template-literals](plugin-transform-template-literals.md)
- [typeof-symbol](plugin-transform-typeof-symbol.md)
- [unicode-regex](plugin-transform-unicode-regex.md)

### ES2016

- [exponentiation-operator](plugin-transform-exponentiation-operator.md)

### ES2017

- [async-to-generator](plugin-transform-async-to-generator.md)

### ES2018

- [async-generator-functions](plugin-proposal-async-generator-functions.md)
- [dotall-regex](plugin-transform-dotall-regex.md)
- [object-rest-spread](plugin-proposal-object-rest-spread.md)
- [optional-catch-binding](plugin-proposal-optional-catch-binding.md)
- [unicode-property-regex](plugin-proposal-unicode-property-regex.md)

### 模块

- [modules-amd](plugin-transform-modules-amd.md)
- [modules-commonjs](plugin-transform-modules-commonjs.md)
- [modules-systemjs](plugin-transform-modules-systemjs.md)
- [modules-umd](plugin-transform-modules-umd.md)

### 试验阶段

- [class-properties](plugin-proposal-class-properties.md)
- [decorators](plugin-proposal-decorators.md)
- [do-expressions](plugin-proposal-do-expressions.md)
- [export-default-from](plugin-proposal-export-default-from.md)
- [export-namespace-from](plugin-proposal-export-namespace-from.md)
- [function-bind](plugin-proposal-function-bind.md)
- [function-sent](plugin-proposal-function-sent.md)
- [logical-assignment-operators](plugin-proposal-logical-assignment-operators.md)
- [nullish-coalescing-operator](plugin-proposal-nullish-coalescing-operator.md)
- [numeric-separator](plugin-proposal-numeric-separator.md)
- [optional-chaining](plugin-proposal-optional-chaining.md)
- [pipeline-operator](plugin-proposal-pipeline-operator.md)
- [throw-expressions](plugin-proposal-throw-expressions.md)

### 简化

查看 [基于 Babel 的简化](https://github.com/babel/minify)！

这些插件都在 minify repo 中。

- [inline-consecutive-adds](plugin-transform-inline-consecutive-adds.md)
- [inline-environment-variables](plugin-transform-inline-environment-variables.md)
- [member-expression-literals](plugin-transform-member-expression-literals.md)
- [merge-sibling-variables](plugin-transform-merge-sibling-variables.md)
- [minify-booleans](plugin-transform-minify-booleans.md)
- [minify-builtins](plugin-minify-builtins.md)
- [minify-constant-folding](plugin-minify-constant-folding.md)
- [minify-dead-code-elimination](plugin-minify-dead-code-elimination.md)
- [minify-flip-comparisons](plugin-minify-flip-comparisons.md)
- [minify-guarded-expressions](plugin-minify-guarded-expressions.md)
- [minify-infinity](plugin-minify-infinity.md)
- [minify-mangle-names](plugin-minify-mangle-names.md)
- [minify-numeric-literals](plugin-minify-numeric-literals.md)
- [minify-replace](plugin-minify-replace.md)
- [minify-simplify](plugin-minify-simplify.md)
- [minify-type-constructors](plugin-minify-type-constructors.md)
- [node-env-inline](plugin-transform-node-env-inline.md)
- [property-literals](plugin-transform-property-literals.md)
- [regexp-constructors](plugin-transform-regexp-constructors.md)
- [remove-console](plugin-transform-remove-console.md)
- [remove-debugger](plugin-transform-remove-debugger.md)
- [remove-undefined](plugin-transform-remove-undefined.md)
- [simplify-comparison-operators](plugin-transform-simplify-comparison-operators.md)
- [undefined-to-void](plugin-transform-undefined-to-void.md)

### React

- [react-constant-elements](plugin-transform-react-constant-elements.md)
- [react-display-name](plugin-transform-react-display-name.md)
- [react-inline-elements](plugin-transform-react-inline-elements.md)
- [react-jsx](plugin-transform-react-jsx.md)
- [react-jsx-compat](plugin-transform-react-jsx-compat.md)
- [react-jsx-self](plugin-transform-react-jsx-self.md)
- [react-jsx-source](plugin-transform-react-jsx-source.md)

### 其他

- [external-helpers](plugin-external-helpers.md)
- [flow-strip-types](plugin-transform-flow-strip-types.md)
- [jscript](plugin-transform-jscript.md)
- [object-assign](plugin-transform-object-assign.md)
- [object-set-prototype-of-to-assign](plugin-transform-object-set-prototype-of-to-assign.md)
- [proto-to-assign](plugin-transform-proto-to-assign.md)
- [regenerator](plugin-transform-regenerator.md)
- [runtime](plugin-transform-runtime.md)
- [strict-mode](plugin-transform-strict-mode.md)

## 语法插件

这些插件允许 Babbel **parse** 特定类型的语法（不是转换）。

> 注意：转换插件会自动启用相应的语法插件。因此，如果已经使用了相应的转换插件，则无需指定语法插件。

或者，也可以从 Babel 解析器中的 [`plugins` 选项](parser.md#plugins)提供。

你的 `.babelrc`:

```json
{
  "parserOpts": {
    "plugins": ["jsx", "flow"]
  }
}
```

## 插件/Preset 路径

如果插件是在 npm 上，可以写入插件的名称，babel 将检查它是否已安装在 `node_modules` 中。

```json
{
  "plugins": ["babel-plugin-myPlugin"]
}
```

也可以指定插件的相对/绝对路径。

```json
{
  "plugins": ["./node_modules/asdf/plugin"]
}
```

### 插件简写

如果包的名称以 `babel-plugin-` 为前缀，可以使用简写：

```js
{
  "plugins": [
    "myPlugin",
    "babel-plugin-myPlugin" // 等同
  ]
}
```

也适用于范围包：

```js
{
  "plugins": [
    "@org/babel-plugin-name",
    "@org/name" // 等同
  ]
}
```

## 插件顺序

> 指定插件每个访问者的事项

这意味着如果两个转换器都访问同一个“ Program ”节点，则转换器将以插件或 preset 顺序运行。

- 插件在 Presets 前运行。
- 插件可以指定从头到尾的顺序。
- Preset 顺序是相反的 (从后到前).

例如:

```json
{
  "plugins": [
    "transform-decorators-legacy",
    "transform-class-properties"
  ]
}
```

将会运行 `transform-decorators-legacy` 然后是 `transform-class-properties`。

关于 presets 一定要记住，顺序是相反的。如下：

```json
{
  "presets": [
    "es2015",
    "react",
    "stage-2"
  ]
}
```

将会以如下顺序运行：`stage-2`, `react` 然后是 `es2015`。

这主要是为了确保向后兼容性，因为大多数用户会在 "stage-0" 前列出 "es2015"。更多相关信息，详见[关于潜在遍历 API 更改的说明](https://github.com/babel/notes/blob/master/2016/2016-08/august-01.md#potential-api-changes-for-traversal)。

## 插件选项

插件和 presets 都可以通过将名称和选项对象放在在配置中的数组中来指定选项。

对于不指定选项，这些都是等效的：

```json
{
  "plugins": [
    "pluginA",
    ["pluginA"],
    ["pluginA", {}],
  ]
}
```

要指定选项，输入一个选项名作为 key 的对象。

```json
{
  "plugins": [
    ["transform-async-to-module-method", {
      "module": "bluebird",
      "method": "coroutine"
    }]
  ]
}
```

presets 的选项设置相同:

```json
{
  "presets": [
    ["env", {
      "loose": true,
      "modules": false
    }]
  ]
}
```

## 插件开发

了解如何创建自己的插件，请参阅优秀的 [babel-handbook](https://github.com/thejameskyle/babel-handbook)。

简单的反转名称插件（来自主页）：

```js
export default function () {
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name;
        // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name.split("").reverse().join("");
      }
    }
  };
}
```
