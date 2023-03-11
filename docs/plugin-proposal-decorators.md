---
id: babel-plugin-proposal-decorators
title: "@babel/plugin-proposal-decorators"
sidebar_label: decorators
---

## 示例

(该示例来源于提案中)

### 简单的类装饰器（class decorator）

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

### 类函数装饰器（class function decorator）

```js title="JavaScript"
class C {
  @enumerable(false)
  method() {}
}

function enumerable(value) {
  return function(target, key, descriptor) {
    descriptor.enumerable = value;
    return descriptor;
  };
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
  "plugins": ["@babel/plugin-proposal-decorators"]
}
```

### 通过 CLI 使用

```sh title="Shell"
babel --plugins @babel/plugin-proposal-decorators script.js
```

### 通过 Node API 使用

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-proposal-decorators"],
});
```

## 选项

<details>
  <summary>History</summary>

| Version | Changes |
| --- | --- |
| `v7.21.0` | Added support for `version: "2023-01"` |
| `v7.19.0` | Added support for `version: "2022-03"` |
| `v7.17.0` | Added the `version` option with support for `"2021-12"`, `"2018-09"` and `"legacy"` |
</details>

### `version`

`"2023-01"`, `"2022-03"`, `"2021-12"`, `"2018-09"` or `"legacy"`.

Selects the decorators proposal to use:
- `"2023-01"` is the proposal version after the updates that reached consensus in the January 2023 TC39 meeting, integrating [`pzuraq/ecma262#4`](https://github.com/pzuraq/ecma262/pull/4).
- `"2022-03"` is the proposal version that reached consensus for Stage 3 in the March 2022 TC39 meeting. You can read more about it at [`tc39/proposal-decorators@8ca65c046d`](https://github.com/tc39/proposal-decorators/tree/8ca65c046dd5e9aa3846a1fe5df343a6f7efd9f8).
- `"2021-12"` is the proposal version as it was presented to TC39 in Dec 2021. You can read more about it at [`tc39/proposal-decorators@d6c056fa06`](https://github.com/tc39/proposal-decorators/tree/d6c056fa061646178c34f361bad33d583316dc85).
- `"2018-09"` is the proposal version that was initially promoted to Stage 2 presented to TC39 in Sept 2018.  You can read more about it at [`tc39/proposal-decorators@7fa580b40f`](https://github.com/tc39/proposal-decorators/tree/7fa580b40f2c19c561511ea2c978e307ae689a1b).
- `legacy` is the original Stage 1 proposal, defined at [`wycats/javascript-decorators@e1bf8d41bf`](https://github.com/wycats/javascript-decorators/blob/e1bf8d41bfa2591d949dd3bbf013514c8904b913/README.md).

> ⚠️ If you specify the `decoratorsBeforeExport` option, `version` defaults to `"2018-09"`.

### `decoratorsBeforeExport`

This option:
- is disallowed when using `version: "legacy"`, `version: "2022-03"`, or `version: "2023-01"`;
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
=======
This option was originally added to help tc39 collect feedback from the community by allowing experimentation with the proposed syntaxes. The proposal has now settled on allowing decorators either before or after `export`.
>>>>>>> e0b83b4e6f2450b75726da0a515b8d937ee04c77

### `legacy`

> **⚠️ 弃用**：使用 `version: "legacy"` 代替。此选项是一个遗留的别名。

`boolean`，默认为 `false`

使用历史遗留（stage 1）的装饰器中的语法和行为。

#### 注意：`@babel/plugin-proposal-class-properties` 的兼容性问题

如果你手动引用了插件 `@babel/plugin-proposal-class-properties` 并使用了它，请确保在引用 `@babel/plugin-proposal-class-properties` 之前引用 `@babel/plugin-proposal-decorators`。

错误示例：

```json title="babel.config.json"
{
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    ["@babel/plugin-proposal-decorators", { "version": "legacy" }]
  ]
}
```

正确示例：

```json title="babel.config.json"
{
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "version": "legacy" }],
    "@babel/plugin-proposal-class-properties"
  ]
}
```

> 你可以通过[该链接](https://babeljs.io/docs/en/plugins#plugin-options)了解更多插件配置选项。

## 参考

* [提案：JavaScript 装饰器](https://github.com/wycats/javascript-decorators/blob/master/README.md)
