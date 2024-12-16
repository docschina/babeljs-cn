---
layout: post
<<<<<<< HEAD
title: "在 Babel 中支持 TC39 标准的装饰器"
author: Nicolò Ribaudo
authorURL: https://twitter.com/NicoloRibaudo
=======
title:  "TC39 Standards Track Decorators in Babel"
authors: nicolò
>>>>>>> ae1eafac5a0e14a143567860edeb73d99b0ed0ad
date:   2018-09-17 12:00:00
categories: announcements
share_text: "在 Babel 中支持 TC39 标准的装饰器"
---

Babel 7.1.0 最终支持了新的装饰器提案：你可以使用 [`@babel/plugin-proposal-decorators`](https://babel.docschina.org/docs/en/babel-plugin-proposal-decorators) 插件来提前尝试此功能 🎉。

<!--truncate-->

## 相关历史

三年多以前，[Yehuda Katz](https://github.com/wycats) [首先提出](https://github.com/wycats/javascript-decorators/blob/696232bbd997618d603d6577848d635872f25c43/README.md)了装饰器的概念。TypeScript 在 [1.5 版本](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#typescript-15)（2015）中发布了对装饰器的支持以及许多 ES6 的相关特性。
一些主流框架，如 Angular 和 MobX 等开始使用它们来增加开发者体验：这使得装饰器非常受欢迎，并给社区带来了一种已经稳定的错觉。

Babel 第一次实现装饰器是在 [v5 版本中](https://github.com/babel/babel/blob/main/.github/CHANGELOG-v5.md#500)，但由于该提案仍在不断变化，则在 Babel v6 中移除了它们。[Logan Smyth](https://github.com/loganfsmyth) 创建了一个非官方的插件([`babel-plugin-transform-decorators-legacy`](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy))，它延用了 Babel 5 中装饰器的行为；在 Babel 7 的 alpha 版本发布期间该库被移至 Babel 官方的仓库中。当时该插件仍使用旧的装饰器语法，因为新提案尚未明确。

自那时起，[Daniel Ehrenberg](https://github.com/littledan)、[Brian Terlson](https://github.com/bterlson) 以及 [Yehuda Katz](https://github.com/wycats) 就一起成为了该提案的共同作者，该提案几乎已被完全重写。当然并非一切事情都已确定，因为至今尚未出现符合规范的实现方式。

Babel 7.0.0 为 `@babel/plugin-proposal-decorators` 插件引入了新的标识：`legacy` 选项，其唯一有效值为 `true`。这种突破性变更是必要的，它为提案从第一阶段到当前阶段平稳过渡作铺垫。

在 Babel 7.1.0 中，我们引入了对这个新提案的支持，并且当 `@babel/plugin-proposal-decorators` 插件被使用时，默认启用。而在 Babel 7.0.0 中如果我们不设置 `legacy: true` 选项，默认情况下就不能使用该语义（相当于 `legacy: false`）。

新提案同时支持使用装饰器实现私有字段（private fields）和私有方法（private methods）。我们尚未在 Babel 中实现此功能（在每个 class 中使用装饰器或私有元素），但我们会很快去出现它。

## 新提案有何变化？

尽管新提案看起来与旧提案非常相似，但还是有几个重要的差异使得它们互不兼容。

### 语法

旧提案允许任何有效的左表达式（字面量，函数，类表达式，new 表达式以及函数调用等）用作装饰器主体。有效代码如下所示：

```js title="JavaScript"
class MyClass {
  @getDecorators().methods[name]
  foo() {}

  @decorator
  [bar]() {}
}
```

该语法存在问题：`[...]` 符号在装饰器内被用作属性访问及定义计算名称。为了防止这种歧义出现，新提案只允许通过点属性访问（`foo.bar`）可以选择在参数末尾使用（`foo.bar()`）。如果需要使用很复杂的表达式，可以将它们包裹在括号内：

```js title="JavaScript"
class MyClass {
  @decorator
  @dec(arg1, arg2)
  @namespace.decorator
  @(complex ? dec1 : dec2)
  method() {}
}
```

### 对象装饰器

旧提案允许除类和类元素装饰器以外的对象成员使用装饰器：

```js title="JavaScript"
const myObj = {
  @dec1 foo: 3,
  @dec2 bar() {},
};
```

由于与当前对象字面量语义的某些不兼容性，它们已从提案中被移除。如果你的代码中使用了它们，请继续关注，因为它们可能会在后续提案中被重新引入。（[tc39/proposal-decorators#119](https://github.com/tc39/proposal-decorators/issues/119)）

### 装饰器函数相关参数

新提案提出的第三个重要变化与传递给装饰器函数参数相关。

在提案的第一个版本中，类元素装饰器接收的参数分别为目标类（或对象），key 以及属性描述符 - 与传递给 `Object.defineProperty` 的形式类似。类装饰器将目标构造函数（constructor）作为唯一参数。

新的装饰器提案更加强大：元素装饰器会接收一个对象，该对象除更改属性描述符外，还允许更改 key 值，可以赋值（`static`，`prototype` 或者 `own`），以及元素的类型（`field` 或 `method`）。它们还可以创建其他属性并在装饰类上定义运行函数（_完成器_）。

类装饰器接收一个包含类描述符的对象，使得类在创建之前修改它们成为可能。

### 升级

鉴于这些不兼容性问题，新提案中不可能使用现有的装饰器：这将使得迁移变得缓慢，因为现有库（MobX，Angular 等）无法在不引入这些突破性变化的情况下进行升级。
为解决此问题，我们发布了实用工具包，它将装饰器包装在你的代码当中。运行后，
你可以安心的更改你的 Babel 配置以便使用新提案 🎉。

使用如下命令来升级你的文件：

```shell=
npx wrap-legacy-decorators src/file-with-decorators.js --decorators-before-export --write
```

如果你的代码仅在 Node 中运行，或者你会使用 webpack 或 rollup 构建你的代码，则需要使用外部依赖项（external dependency），避免在每个文件中注入包装函数：

```shell=
npm install --save decorators-compat
npx wrap-legacy-decorators src/file-with-decorators.js --decorators-before-export --external-helpers --write
```

欲了解更多信息，请参阅[工具包（package）相关文档](https://github.com/nicolo-ribaudo/legacy-decorators-migration-utility).

## 开放问题

并非所有内容都已确定：装饰器是一个非常强大的功能，想要将装饰器定义为最好的表现形式，是相当复杂的。

### 导出类(exported class)装饰器如何放置？

> [tc39/proposal-decorators#69](https://github.com/tc39/proposal-decorators/issues/69)

该问题在装饰器提案中反复被问到：装饰器应该放置在关键字 export 前还是关键字 export 后？

```js title="JavaScript"
export @decorator class MyClass {}

// 或者

@decorator
export class MyClass {}
```

根本问题是 `export` 关键字是否是类声明的一部分，或者它是否是一个"包装器"。第一种情况下，它应该在装饰器*之后*，因为装饰器出现在声明的起始位置；第二种情况下，它应该在装饰器*之前*，因为装饰器是类声明的一部分。

### 如何让装饰器与私有元素安全地交互？

> [tc39/proposal-decorators#129](https://github.com/tc39/proposal-decorators/issues/129), [tc39/proposal-decorators#133](https://github.com/tc39/proposal-decorators/issues/133)

装饰器引发了一个重要的安全隐患：如果装饰私有元素，那么私有名称（可以视为私有元素的 "key"）可能会被泄露。有不同的安全级别需要考虑：

1. 装饰器有意外泄露私有名称的风险。恶意代码不应该以任何方式从其他装饰器中"窃取"私有名称。
2. 只有直接应用于私有元素的装饰器才被视为可信任：类装饰器是不是不应该读写私有元素？
3. _高度隐私_ (class fields 提案的目标之一) 意味着私有元素只能从类内部访问：是否需要让任何装饰器都可以访问私有名称？是否应该只装饰公共元素？

这些问题需要在解决之前进一步讨论，这正是 Babel 所存在的意义。

## Babel 的作用

遵循 [What's Happening With the Pipeline (|>) Proposal?](http://babeljs.io/blog/2018/07/19/whats-happening-with-the-pipeline-proposal) 文章中的走向，随着 Babel 7 的发布，我们开始利用我们在 JS 生态系统中的地位，通过让开发人员能够测试提案的不同变体，根据他们给出的反馈来帮助提案的作者完善提案。

出于这样的角度，随着 `@babel/plugin-proposal-decorators` 的更新，我们引入了新的选项：`decoratorsBeforeExport`，它允许用户尝试使用 `export @decorator class C {}` 和 `@decorator export default class`。

我们还将采用一个选项来定制装饰器私有元素的隐私约束。使用该选项是必要的，直到 TC39 人员对它们做出选择，由此就可以让默认行为指定为最终提案中的内容。

如果你直接使用 ([`@babel/parser`](https://babeljs.io/docs/en/next/babel-parser.html)，之前的 `babylon`)，你可以在 7.0.0 版本中使用 `decoratorsBeforeExport` 选项：

```js title="JavaScript"
const ast = babylon.parse(code, {
  plugins: [["decorators", { decoratorsBeforeExport: true }]],
});
```

### 用法

用于 Babel 本身:

```shell npm2yarn
npm install @babel/plugin-proposal-decorators --save-dev
```

```json title="babel.config.json"
{
  "plugins": [
    "@babel/plugin-proposal-decorators",
    { "decoratorsBeforeExport": true }
  ]
}
```

查阅 [`@babel/plugin-proposal-decorators`](https://babeljs.io/docs/en/babel-plugin-proposal-decorators) 文档以获取更多相关选项。

## 你的作用

作为 JavaScript 开发者，你可以帮助规划改语言的未来。你可以为装饰器考虑各种语义环境同时进行测试，并向提案的作者提出反馈。我们需要知道你在真实项目环境中是如何使用它们的！你还可以通过阅读[提案仓库](https://github.com/tc39/proposal-decorators)中的 issues 讨论及会议记录来找出为什么最终做出这样的设计决策。

如果想立即尝试装饰器，可以使用我们的 [repl](https://babeljs.io/repl/build/main) 配置不同的 preset 选项进行试用！
