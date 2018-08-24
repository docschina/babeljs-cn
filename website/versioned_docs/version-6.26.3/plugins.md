---
id: version-6.26.3-plugins
title: Plugins
original_id: plugins
---

Babel 是一个编译器。从宏观角度看，它将运行代码分为3个阶段: 解析，转换，及生成（与其他编译器相同）。

> 关于编译器的优秀/简单的教程，请查看 [the-super-tiny-compiler](https://github.com/thejameskyle/the-super-tiny-compiler)，同时它也从宏观角度上解释了 Babel 本身是如何工作的。

初始阶段，Babel 并没有做任何事情。它基本上就相当于 `const babel = code => code;`，先解析代码，然后再次生成相同的代码。

你可以为 Babel 添加一些 Plugins 让其去做任何事情( Plugins 会影响 Babel 的第 2 阶段，转换)。

不知如何入手? 请查阅我们的 [presets](#presets) 。

## Presets

不想定制你自己的插件? 没关系! Presets 是可共享的 [`.babelrc`](babelrc.md) 配置或者只是一个 babel 插件的数组。

### 公共 Presets

我们已经组装了一些公用的插件:

> 每年每个 preset 只编译当年批准的内容。
> 而 `babel-preset-env` 相当于 es2015 ，es2016 ，es2017 及最新版本。

- [env](preset-env.md)
- [react](preset-react.md)
- [flow](preset-flow.md)

> [在 npm 上](https://www.npmjs.com/search?q=babel-preset)可以找到许多由其他社区进行维护的 preset 进行使用!

### Stage-X (实验阶段 Presets)

Stage-x preset 中的任何转换都是对未被批准为 JavaScript 版本一部分的语言的变化(如 es6 / es2015 )。

> "语言的变化需要一个过程来发展，该过程提供了将一个想法进化为一种完善规范的指导原则。"

<blockquote class="babel-callout babel-callout-danger">
  <h4>不稳定</h4>
  <p>
    这些提案可能会有所改动，因此请<strong><em>谨慎使用</em></strong>，尤其是第 3 阶段以前的提案。我们计划会在每次 TC39 会议结束后更新对应的 stage-x preset。
  </p>
</blockquote>

[TC39](https://github.com/tc39) 将提案分为以下几个阶段:

- [Stage 0](/docs/plugins/preset-stage-0/) - 稻草人: 只是一个想法，可能是 babel 插件。
- [Stage 1](/docs/plugins/preset-stage-1/) - 提案: 初步尝试。
- [Stage 2](/docs/plugins/preset-stage-2/) - 初稿: 完成初步规范。
- [Stage 3](/docs/plugins/preset-stage-3/) - 候选: 完成规范和浏览器初步实现。
- Stage 4 - 完成: 将被添加到下一年度发布。

欲了解更多信息，请务必查看[当前 TC39 提案](https://github.com/tc39/proposals)及其[文档流程](https://tc39.github.io/process-document).

Yehuda Katz (@wycatz) 在 [thefeedbackloop.xyz](https://thefeedbackloop.xyz) 中的几个帖子中也详细解释了 TC39 各阶段的流程: [Stage 0 和 1](https://thefeedbackloop.xyz/tc39-a-process-sketch-stages-0-and-1/)，[Stage 2](https://thefeedbackloop.xyz/tc39-process-sketch-stage-2/)，[Stage 3](https://thefeedbackloop.xyz/tc39-process-sketch-stage-3/) 以及最终的 Stage 4 。

## 转译 Plugin

这些 Plugin 将用于转译您的代码。

<blockquote class="babel-callout babel-callout-info">
  <p>
    转译 plugin 将启用相应的语法 plugin ，因此你不必同时使用两者。
  </p>
</blockquote>

### ES3

- [es3-member-expression-literals](babel-plugin-transform-es3-member-expression-literals)
- [es3-property-literals](babel-plugin-transform-es3-property-literals)

### ES5

- [es5-property-mutators](babel-plugin-transform-es5-property-mutators)

### ES2015

- [check-es2015-constants](babel-plugin-check-es2015-constants)
- [es2015-arrow-functions](babel-plugin-transform-es2015-arrow-functions)
- [es2015-block-scoped-functions](babel-plugin-transform-es2015-block-scoped-functions)
- [es2015-block-scoping](babel-plugin-transform-es2015-block-scoping)
- [es2015-classes](babel-plugin-transform-es2015-classes)
- [es2015-computed-properties](babel-plugin-transform-es2015-computed-properties)
- [es2015-destructuring](babel-plugin-transform-es2015-destructuring)
- [es2015-duplicate-keys](babel-plugin-transform-es2015-duplicate-keys)
- [es2015-for-of](babel-plugin-transform-es2015-for-of)
- [es2015-function-name](babel-plugin-transform-es2015-function-name)
- [es2015-literals](babel-plugin-transform-es2015-literals)
- [es2015-object-super](babel-plugin-transform-es2015-object-super)
- [es2015-parameters](babel-plugin-transform-es2015-parameters)
- [es2015-shorthand-properties](babel-plugin-transform-es2015-shorthand-properties)
- [es2015-spread](babel-plugin-transform-es2015-spread)
- [es2015-sticky-regex](babel-plugin-transform-es2015-sticky-regex)
- [es2015-template-literals](babel-plugin-transform-es2015-template-literals)
- [es2015-typeof-symbol](babel-plugin-transform-es2015-typeof-symbol)
- [es2015-unicode-regex](babel-plugin-transform-es2015-unicode-regex)

### ES2016

- [exponentiation-operator](plugin-transform-exponentiation-operator.md)

### ES2017

- [async-to-generator](plugin-transform-async-to-generator.md)

### 模块

- [es2015-modules-amd](babel-plugin-transform-es2015-modules-amd)
- [es2015-modules-commonjs](babel-plugin-transform-es2015-modules-commonjs)
- [es2015-modules-systemjs](babel-plugin-transform-es2015-modules-systemjs)
- [es2015-modules-umd](babel-plugin-transform-es2015-modules-umd)

### 实验阶段

- [async-generator-functions](babel-plugin-transform-async-generator-functions)
- [async-to-module-method](babel-plugin-transform-async-to-module-method)
- [class-constructor-call](babel-plugin-transform-class-constructor-call) (deprecated)
- [class-properties](babel-plugin-transform-class-properties)
- [decorators](babel-plugin-transform-decorators)
- [do-expressions](babel-plugin-transform-do-expressions)
- [export-extensions](babel-plugin-transform-export-extensions)
- [function-bind](babel-plugin-transform-function-bind)
- [object-rest-spread](babel-plugin-transform-object-rest-spread)

### Minification

请查看基于 Babel 的 [minifier](https://github.com/babel/minify) !

这些 plugin 都存在于 minify 项目中。

- [inline-environment-variables](plugin-transform-inline-environment-variables.md)
- [inline-consecutive-adds](plugin-transform-inline-consecutive-adds.md)
- [member-expression-literals](plugin-transform-member-expression-literals.md)
- [merge-sibling-variables](plugin-transform-merge-sibling-variables.md)
- [minify-booleans](plugin-transform-minify-booleans.md)
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

### 其它

- [eval](babel-plugin-transform-eval)
- [flow-comments](plugin-transform-flow-comments.md)
- [flow-strip-types](plugin-transform-flow-strip-types.md)
- [jscript](plugin-transform-jscript.md)
- [object-assign](plugin-transform-object-assign.md)
- [object-set-prototype-of-to-assign](plugin-transform-object-set-prototype-of-to-assign.md)
- [proto-to-assign](plugin-transform-proto-to-assign.md)
- [regenerator](plugin-transform-regenerator.md)
- [runtime](plugin-transform-runtime.md)
- [strict-mode](plugin-transform-strict-mode.md)

## 混合 Plugin

- [external-helpers](plugin-external-helpers.md)

## 语法 Plugins

这些 plugin 允许 Babel **解析**特定类型的语法(不转译)。

> 注意: 转译 plugin 会自动继承/使用语法插件，因此如果已经使用了相应的转译 plugin ，则不需要指定语法 plugin 。

你也可以从 babylon 中提供任意 [`plugin` 选项](https://github.com/babel/babylon/#plugins):

```json
// .babelrc
{
  "parserOpts": {
    "plugins": ["jsx", "flow"]
  }
}
```

### 实验性的

- [async-generators](plugin-syntax-async-generators.md)
- [class-properties](plugin-syntax-class-properties.md)
- [decorators](plugin-syntax-decorators.md)
- [do-expressions](plugin-syntax-do-expressions.md)
- [dynamic-import](plugin-syntax-dynamic-import.md)
- [export-extensions](babel-plugin-syntax-export-extensions)
- [flow](plugin-syntax-flow.md)
- [function-bind](plugin-syntax-function-bind.md)
- [function-sent](plugin-syntax-function-sent.md)
- [jsx](plugin-syntax-jsx.md)
- [object-rest-spread](plugin-syntax-object-rest-spread.md)

### 默认启用

这些 plugin 已经不起作用了，因为较新版本的 babylon 默认已经启用了它们。

- [async-functions](babel-plugin-syntax-async-functions) (since babylon [6.9.1](https://github.com/babel/babylon/releases/tag/v6.9.1))
- [exponentiation-operator](babel-plugin-syntax-exponentiation-operator) (since babylon [6.9.1](https://github.com/babel/babylon/releases/tag/v6.9.1))
- [trailing-function-commas](babel-plugin-syntax-trailing-function-commas) (since babylon [6.9.1](https://github.com/babel/babylon/releases/tag/v6.9.1))

### 不推荐

- [class-constructor-call](babel-plugin-syntax-class-constructor-call)

## Plugin/Preset 路径

如果 plugin 是通过 npm 安装，你可以传入 plugin 名字给 babel，babel 将检查它是否安装在 `node_modules` 中

`"plugins": ["babel-plugin-myPlugin"]`

你也可以指定你的 plugin/preset 的相对或绝对路径。

`"plugins": ["./node_modules/asdf/plugin"]`

### Plugin/Preset 简写

如果你使用 `babel-plugin-` 作为 plugin 的前缀，你可以使用简写的形式省略掉该前缀。

`"plugins": ["myPlugin"]`

preset 与之相同

`"presets": ["babel-preset-myPreset"]`

vs

`"presets": ["myPreset"]`

这也适用于包裹作用域:

`"presets": ["@org/babel-preset-name"]`

简写:

`"presets": ["@org/name"]`

## Plugin/Preset 排序

> 插件中每个访问者都有排序问题。

这意味着如果两次转译都访问相同的"程序"节点，则转译将按照 plugin 或 preset 的规则进行排序然后执行。

- Plugin 会运行在 Preset 之前。
- Plugin 会从第一个开始顺序执行。ordering is first to last.
- Preset 的顺序则刚好相反(从最后一个逆序执行)。

例如：

```json
{
  "plugins": [
    "transform-decorators-legacy",
    "transform-class-properties"
  ]
}
```

将先执行 `transform-decorators-legacy` 再执行 `transform-class-properties`.

一定要记得 preset 的顺序是*反向*的。举个例子：

```json
{
  "presets": [
    "es2015",
    "react",
    "stage-2"
  ]
}
```

按以下顺序运行: `stage-2`， `react`， 最后 `es2015` 。

这主要是为了保证向后兼容，因为大多数用户会在 "stage-0" 之前列出 "es2015" 。欲了解相关更多信息，请查看 [关于隐式遍历 API 变化的说明](https://github.com/babel/notes/blob/master/2016/2016-08/august-01.md#potential-api-changes-for-traversal) 。

## Plugin/Preset 选项

Plugin 和 Preset 均可以通过将名称和选项对象放置在同一个数组中来指定其选项。

例如：

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

Preset 的配置选项工作原理与 plugin 完全相同：

```json
{
  "presets": [
    ["es2015", {
      "loose": true,
      "modules": false
    }]
  ]
}
```

## Plugin 的开发

请参考 [babel-handbook](https://github.com/thejameskyle/babel-handbook) ，学习如何制作自己的 plugin 。

一个简易逆转名字的插件 (首页中的示例)：

```js
export default function () {
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name;
        // 反转字符串：JavaScript -> tpircSavaJ
        path.node.name = name.split("").reverse().join("");
      }
    }
  };
}
```

## 创建 Preset

你只需导出一个 config ，就可以拥有自己的 preset 。

```js
// Preset 中可以包含其他 preset 和 带有选项的 plugin 。
module.exports = {
  presets: [
    require("babel-preset-es2015"),
  ],
  plugins: [
    [require("babel-plugin-transform-es2015-template-literals"), { spec: true }],
    require("babel-plugin-transform-es3-member-expression-literals"),
  ],
};
```

欲了解更多信息，请查阅 [babel handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/user-handbook.md#making-your-own-preset) 与 preset 相关部分或者只查看 [es2015](https://github.com/babel/babel/tree/master/packages/babel-preset-es2015) preset 项目相关的示例。
