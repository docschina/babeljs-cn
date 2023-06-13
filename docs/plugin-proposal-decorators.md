---
id: babel-plugin-proposal-decorators
title: "@babel/plugin-proposal-decorators"
sidebar_label: decorators
---

## 示例

<<<<<<< HEAD
(该示例来源于提案中)

### 简单的类装饰器（class decorator）
=======
### Simple class decorator
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e

```js title="JavaScript"
@annotation
class MyClass {}

function annotation(target) {
  target.annotated = true;
}
```

### 类装饰器（class decorator）

```js title="JavaScript"
@isTestable(true)
class MyClass {}

function isTestable(value) {
  return function decorator(target) {
    target.isTestable = value;
  };
}
```

<<<<<<< HEAD
### 类函数装饰器（class function decorator）
=======
### Class method decorator {#class-function-decorator}
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e

```js title="JavaScript"
class C {
  message = "hello!";

  @bound
  m() {
    console.log(this.message);
  }
}

function bound(value, { name, addInitializer }) {
  addInitializer(function () {
    this[name] = this[name].bind(this);
  });
}
```

## 安装

```shell npm2yarn
npm install --save-dev @babel/plugin-proposal-decorators
```

## 用法

### 使用配置文件（推荐）

```json title="babel.config.json"
{
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "version": "2023-05" }]
  ]
}
```

<<<<<<< HEAD
### 通过 CLI 使用

```sh
babel --plugins @babel/plugin-proposal-decorators script.js
```

### 通过 Node API 使用
=======
### Via Node API
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: [
    ["@babel/plugin-proposal-decorators", { version: "2023-05" }],
  ]
});
```

## 选项

<details>
  <summary>History</summary>

| Version | Changes |
| --- | --- |
| `v7.22.0` | Added support for `version: "2023-05"` |
| `v7.21.0` | Added support for `version: "2023-01"` |
| `v7.19.0` | Added support for `version: "2022-03"` |
| `v7.17.0` | Added the `version` option with support for `"2021-12"`, `"2018-09"` and `"legacy"` |
</details>

### `version`

`"2023-05"`, `"2023-01"`, `"2022-03"`, `"2021-12"`, `"2018-09"` or `"legacy"`.

Selects the decorators proposal to use:
- `"2023-05"` is the proposal version after the updates that reached consensus in the March and May 2023 TC39 meetings, integrating [these changes](https://github.com/pzuraq/ecma262/compare/e86128e13b63a3c2efc3728f76c8332756752b02...c4465e44d514c6c1dba810487ec2721ccd6b08f9).
- `"2023-01"` is the proposal version after the updates that reached consensus in the January 2023 TC39 meeting, integrating [`pzuraq/ecma262#4`](https://github.com/pzuraq/ecma262/pull/4).
- `"2022-03"` is the proposal version that reached consensus for Stage 3 in the March 2022 TC39 meeting. You can read more about it at [`tc39/proposal-decorators@8ca65c046d`](https://github.com/tc39/proposal-decorators/tree/8ca65c046dd5e9aa3846a1fe5df343a6f7efd9f8).
- `"2021-12"` is the proposal version as it was presented to TC39 in Dec 2021. You can read more about it at [`tc39/proposal-decorators@d6c056fa06`](https://github.com/tc39/proposal-decorators/tree/d6c056fa061646178c34f361bad33d583316dc85).
- `"2018-09"` is the proposal version that was initially promoted to Stage 2 presented to TC39 in Sept 2018.  You can read more about it at [`tc39/proposal-decorators@7fa580b40f`](https://github.com/tc39/proposal-decorators/tree/7fa580b40f2c19c561511ea2c978e307ae689a1b).
- `legacy` is the legacy Stage 1 proposal, defined at [`wycats/javascript-decorators@e1bf8d41bf`](https://github.com/wycats/javascript-decorators/blob/e1bf8d41bfa2591d949dd3bbf013514c8904b913/README.md).

The spec repo provides a brief [summary of the differences between these versions](https://github.com/tc39/proposal-decorators#how-does-this-proposal-compare-to-other-versions-of-decorators).

If you specify the `decoratorsBeforeExport` option, `version` defaults to `"2018-09"`, otherwise it is a required option.

### `decoratorsBeforeExport`

This option:
- is disallowed when using `version: "legacy"`, `version: "2022-03"`, `version: "2023-01"`, or `version: "2023-05"`;
- is required when using `version: "2018-09"`;
- is optional and defaults to `false` when using `version: "2021-12"`.

`boolean`

```js title="JavaScript"
// decoratorsBeforeExport: false
export @decorator class Bar {}

// decoratorsBeforeExport: true
@decorator
export class Foo {}
```

<<<<<<< HEAD
添加该选项是为了针对于两种可能的语法进行实验，帮助 TC39 收集社区的反馈。当前提案建议在 `export` 之后设置装饰器。

### `legacy`

> **⚠️ 弃用**：使用 `version: "legacy"` 代替。此选项是一个遗留的别名。
=======
This option was originally added to help tc39 collect feedback from the community by allowing experimentation with the proposed syntaxes. The proposal has now settled on allowing decorators either before or after `export`.

### `legacy`

:::danger Deprecated
Use `version: "legacy"` instead. This option is a legacy alias.
:::
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e

`boolean`，默认为 `false`

使用历史遗留（stage 1）的装饰器中的语法和行为。

<<<<<<< HEAD
#### 注意：`@babel/plugin-proposal-class-properties` 的兼容性问题

如果你手动引用了插件 `@babel/plugin-proposal-class-properties` 并使用了它，请确保在引用 `@babel/plugin-proposal-class-properties` 之前引用 `@babel/plugin-proposal-decorators`。

错误示例：

```json
=======
#### NOTE: Compatibility with `@babel/plugin-transform-class-properties`

If you are including your plugins manually and using `@babel/plugin-transform-class-properties` or `@babel/plugin-private-methods` and legacy decorators, make sure that `@babel/plugin-proposal-decorators` comes _before_ `@babel/plugin-transform-class-properties`.

```diff title="babel.config.json"
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e
{
  "plugins": [
-   "@babel/plugin-transform-class-properties",
    ["@babel/plugin-proposal-decorators", { "version": "2023-05" }]
+   "@babel/plugin-transform-class-properties"
  ]
}
```

<<<<<<< HEAD
正确示例：
=======
If you are already using `@babel/preset-env`, you can safely remove `@babel/plugin-transform-class-properties` and `@babel/plugin-private-methods`:
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e

```diff title="babel.config.json"
{
  "presets": ["@babel/preset-env"],
  "plugins": [
-   "@babel/plugin-transform-class-properties",
    ["@babel/plugin-proposal-decorators", { "version": "2023-05" }]
  ]
}
```

> 你可以通过[该链接](https://babeljs.io/docs/en/plugins#plugin-options)了解更多插件配置选项。

## 参考

<<<<<<< HEAD
* [提案：JavaScript 装饰器](https://github.com/wycats/javascript-decorators/blob/master/README.md)
=======
- [Proposal: JavaScript Decorators](https://github.com/tc39/proposal-decorators)
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e
