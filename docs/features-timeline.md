---
id: features-timeline
title: 新增特性时间轴
---

大多数情况下，大家都不知道在每个 Babel 版本中，我们主要引入了哪些新的特性。本文为每个小版本都做了简短摘要，你也可以在 [在 GitHub](https://github.com/babel/babel/blob/main/CHANGELOG.md) 上阅读完整的更新日志！
除此之外，你也可以使用此时间轴来追踪一些其他的重要工作，例如 [babel-polyfills](https://github.com/babel/babel-polyfills) 项目。

<ol class="timeline-container">
<li data-date="Feb 2021">

## Babel 7.13.0

[博客公告](https://babeljs.io/blog/2021/02/22/7.13.0)

- 升级 [`targets`](https://babeljs.io/docs/en/options#output-targets) 选项 ([RFC](https://github.com/babel/rfcs/pull/2))
- 粒度更小的编译器 `assumptions` ([文档](https://babeljs.io/assumptions), [RFC](https://github.com/babel/rfcs/pull/5))
- 支持 [Records 和 Tuples](https://github.com/tc39/proposal-record-tuple) 提案
  ```js
  let rec = #{ x: 1 };
  let tup = #[1, 2, 3];
  ```
- 支持 [TypeScript 4.2](https://devblogs.microsoft.com/typescript/announcing-typescript-4-2/)

</li>
<li data-date="Oct 2020">

## Babel 7.12.0

[博客公告](https://babeljs.io/blog/2020/10/15/7.12.0)

- 支持 [class static blocks](https://github.com/tc39/proposal-class-static-block) 提案
  ```js
  class A {
    static { initialize(A); }
  }
  ```
- 支持 [imports and exports string names](https://github.com/tc39/ecma262/pull/2154) 提案
  ```js
  let happy = "wooo!";
  export { happy as "😃" };
  ```
- 解析器支持 [Import Assertions](https://github.com/tc39/proposal-import-assertions) 提案
  ```js
  import json from "./foo.json" assert { type: "json" };
  ```
- 支持 [TypeScript 4.1](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/) 

</li>
<li data-date="Jul 2020">

## Babel 7.11.0

[博客公告](https://babeljs.io/blog/2020/07/30/7.11.0)

- 默认支持 [Logical Assignment](https://github.com/tc39/proposal-logical-assignment/) 和
  [Numeric Separator](https://github.com/tc39/proposal-numeric-separator) 等 4 级提案
- 解析器支持 [Decimal](https://github.com/tc39/proposal-decimal) 提案
  ```js
  console.assert(0.1m + 0.2m === 0.3m);
  ```
- [TypeScript 4.0](https://devblogs.microsoft.com/typescript/announcing-typescript-4-0/) support

</li>
<li class="no-children">

## @babel/eslint-parser

[博客公告](https://babeljs.io/blog/2020/07/13/the-state-of-babel-eslint)

</li>
<li data-date="May 2020">

## Babel 7.10.0

[博客公告](https://babeljs.io/blog/2020/05/25/7.10.0)

- 默认允许解析器支持 [`import.meta`](https://github.com/tc39/proposal-import-meta/) 等 4 级提案
- 支持 [Ergonomic brand checks for Private Fields](https://github.com/tc39/proposal-private-fields-in-in) 提案
  ```js
  class Car {
    #plate;
    race(other) {
       if (#plate in other) console.log("Racing against another car!");
    }
  }
  ```

</li>
<li class="no-children">

## babel-polyfills

[仓库地址](https://github.com/babel/babel-polyfills)

</li>
<li data-date="Mar 2020">

## Babel 7.9.0

[博客公告](https://babeljs.io/blog/2020/03/16/7.9.0)

-  在 `@babel/preset-env` 中新增 [`bugfixes`](https://babeljs.io/docs/en/babel-preset-env#bugfixes) 选项， 以支持更灵活地解决游览器漏洞，而不是重新编译整个特性。
- 支持 [TypeScript 3.8](https://devblogs.microsoft.com/typescript/announcing-typescript-3-8/)
- 支持 Flow `declare` 类字段。
- 自动支持全新的 [JSX 运行环境](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)

</li>
<li data-date="Jan 2020">

## Babel 7.8.0

[博客公告](https://babeljs.io/blog/2020/01/11/7.8.0)

- 默认支持 [Optional Chaining](https://github.com/tc39/proposal-optional-chaining) 和
  [Nullish Coalescing](https://github.com/tc39/proposal-nullish-coalescing) 等 4 级提案
- 支持 `.mjs` 文件类型

</li>
<li data-date="Nov 2019">

## Babel 7.7.0

[博客公告](https://babeljs.io/blog/2019/11/05/7.7.0)

- 解析器支持 [top-level `await`](https://github.com/tc39/proposal-top-level-await) 提案
  ```js
  import db from "./database.js";

  await db.connect();
  ```
- 在 `@babel/parser` 为早期错误添加错误恢复支持。
- 支持 `.json` and `.cjs` 文件类型
- 支持 [TypeScript 3.7](https://devblogs.microsoft.com/typescript/announcing-typescript-3-7/)

</li>
<li data-date="Sep 2019">

## Babel 7.6.0

[博客公告](https://babeljs.io/blog/2019/09/05/7.6.0)

- 支持静态私有访问器，以及
  [static class features](https://github.com/tc39/proposal-static-class-features/) 提案的部分内容
  ```js
  class Dog {
    static get #className() { return "Dog"; }
  }
  ```

</li>
<li data-date="Jul 2019">

## Babel 7.5.0

[博客公告](https://babeljs.io/blog/2019/07/03/7.5.0)

- 支持 [F# pipeline operator](https://github.com/valtech-nyc/proposal-fsharp-pipelines/) 提案
  ```js
  num |> add(2) |> double
  ```
- 支持 TypeScript `namespace` 

</li>
<li data-date="Mar 2019">

## Babel 7.4.0

[博客公告](https://babeljs.io/blog/2019/03/19/7.4.0)

- 支持注入 `core-js@3` polyfills
- 支持 [Partial Application](https://github.com/tc39/proposal-partial-application/) 提案
  ```js
  strings.map(parseInt(?));
  ```
- 支持静态私有方法，以及
  [static class features](https://github.com/tc39/proposal-static-class-features/) 提案的部分内容
  ```js
  class Dog {
    static #register() { /* ... */ }
  }
  ```
- 支持 [TypeScript 3.4](https://devblogs.microsoft.com/typescript/announcing-typescript-3-4/) 

</li>
<li data-date="Jan 2019">

## Babel 7.3.0

[博客公告](https://babeljs.io/blog/2019/01/21/7.3.0)

- 支持实例私有访问，以及
  [private methods](https://github.com/tc39/proposal-private-methods/) 提案的部分内容
  ```js
  class Dog {
    get #randomId() { return Math.random(); }
  }
  ```
- 支持 [smart pipeline operator](https://github.com/js-choi/proposal-smart-pipelines/) 提案
  ```js
  num |> add(2, #) |> double
  ```
- 在正则表达式中支持
  [named capturing groups](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Ranges#using_named_groups)
  
  ```js
  str.match({String.raw`/^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/`})
  ```
- 支持 TypeScript 3.2 和 2.9 

</li>
<li data-date="Dec 2018">

## Babel 7.2.0

[博客公告](https://babeljs.io/blog/2018/12/03/7.2.0)

- 支持实例私有方法，以及 [private methods](https://github.com/tc39/proposal-private-methods/) 提案的部分内容
  ```js
  class Dog {
    #bark() { console.log("Mew!") }
  }
  ```

</li>
<li data-date="Sep 2018">

## Babel 7.1.0

[博客公告](https://babeljs.io/blog/2018/09/17/7.1.0)

- 支持 [decorators](https://babeljs.io/blog/2018/09/17/decorators) 提案, 并于 2018 年 9 月指明
  ```js
  class Person {
    @autoIncrement age;
  }
  ```
- 支持静态私有字段，以及 [static class features](https://github.com/tc39/proposal-static-class-features/) 提案的部分内容
  ```js
  class Person {
    static #classId = 3;
  }
  ```

</li>
<li data-date="Aug 2018" class="no-children">

## Babel 7

[博客公告](https://babeljs.io/blog/2018/08/27/7.0.0)

此处列出了许多变化，因为它们是两年内将要发布的内容。

- 放弃对已不再维护的 Node 版本（0.10, 0.12, 4, 5）的支持
- 切换到作用域包 (从 [`babel-core`](https://www.npmjs.com/package/babel-core) 变为 [`@babel/core`](https://www.npmjs.com/package/@babel/core))
- 移除年度预设 (`@babel/preset-es2015`) 以及阶段预设 (`@babel/preset-stage-0`) ([博客公告](https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets)).
- 在某些情况下添加对 "pure" (`/*#__PURE__*/` )注释的支持。(后来实现为 [@babel/helper-annotate-as-pure](helper-annotate-as-pure.md)）
- 添加项目级的 `babel.config.js` 配置文件 ([文档](config-files.md)) 以及 [`overrides`](options.md#overrides) 配置选项
- 对 [`@babel/preset-env`](preset-env.md#usebuiltins) 补充 `"useBuiltIns: "usage"` 选项
- 通过 `@babel/preset-typescript` 支持 TypeScript
- 支持 JSX 语法 `<></>`
- 支持一系列 TC39 提案:
  - [Unicode Property Regex](plugin-proposal-unicode-property-regex.md)
  - [JSON Superset](plugin-proposal-json-strings.md) 
  - [`new.target`](plugin-transform-new-target.md)
  - [Class Private Instance Fields](plugin-proposal-class-properties.md) (`class A { #b = 2 }`)
  - [Optional Catch Binding](plugin-proposal-optional-catch-binding.md) `try { throw 0 } catch { do() }`
  - [BigInt](plugin-syntax-bigint.md) (syntax only)
  - [`import.meta`](plugin-syntax-import-meta.md) (syntax only) (`import.meta.url`)
  - [Numeric Separators](plugin-proposal-numeric-separator.md) (`1_000`)
  - [`function.sent`](plugin-proposal-function-sent.md)
  - [Optional Chaining](plugin-proposal-optional-chaining.md) (`a?.b`)
  - [Logical Assignment Operators](plugin-proposal-logical-assignment-operators.md) (`a &&= b; a ||= b`)
  - [Nullish Coalescing Operator](plugin-proposal-nullish-coalescing-operator.md) (`a ?? b`)
  - [Pipeline Operator](plugin-proposal-pipeline-operator.md) (`a |> b`)
  - [Throw Expressions](plugin-proposal-throw-expressions.md) (`() => throw new Error("a")`)

</li>
</ol>
