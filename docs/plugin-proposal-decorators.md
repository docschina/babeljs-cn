---
id: babel-plugin-proposal-decorators
title: @babel/plugin-proposal-decorators
sidebar_label: proposal-decorators
---

## 示例

(该示例来源于提案中)

### 简单的类装饰器（Class decorator）

```js
@annotation
class MyClass { }

function annotation(target) {
   target.annotated = true;
}
```

### 类装饰器（Class decorator）

```js
@isTestable(true)
class MyClass { }

function isTestable(value) {
   return function decorator(target) {
      target.isTestable = value;
   }
}
```

### 类函数装饰器（Class function decorator）

```js
class C {
  @enumerable(false)
  method() { }
}

function enumerable(value) {
  return function (target, key, descriptor) {
     descriptor.enumerable = value;
     return descriptor;
  }
}
```

## 安装

```sh
npm install --save-dev @babel/plugin-proposal-decorators
```

## 用法

在 .babelrc 文件中添加插件依赖：

```json
{
  "plugins": ["@babel/plugin-proposal-decorators"]
}
```

### 通过 CLI 使用

```sh
babel --plugins @babel/plugin-proposal-decorators script.js
```

### 通过 Node API 使用

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-proposal-decorators"]
});
```

## 选项

### `decoratorsBeforeExport`

`boolean`

```js
// decoratorsBeforeExport: false
export @decorator class Bar {}

// decoratorsBeforeExport: true
@decorator
export class Foo {}
```

添加该选项是为了针对于两种可能的语法进行实验，帮助 TC39 收集社区的反馈。

欲了解更多信息，请查阅：[tc39/proposal-decorators#69](https://github.com/tc39/proposal-decorators/issues/69).

### `legacy`

`boolean`，默认为 `false`。

使用历史遗留的装饰器 (stage 1) 中的语法和行为。

#### 注意：`@babel/plugin-proposal-class-properties` 的兼容性问题

如果你手动引用了插件 `@babel/plugin-proposal-class-properties` 并使用了它，请确保在引用 `@babel/plugin-proposal-class-properties` 之前引用 `@babel/plugin-proposal-decorators`。

当使用 `legacy: true` 模式时，必须在 `loose` 模式下使用 `@babel/plugin-proposal-class-properties` 来支持 `@babel/plugin-proposal-decorators`。

错误示例：

```json
{
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-decorators"
  ]
}
```

正确示例：

```json
{
  "plugins": [
    "@babel/plugin-proposal-decorators",
    "@babel/plugin-proposal-class-properties"
  ]
}
```

```json
{
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose" : true }]
  ]
}
```

## 参考

* [提案：JavaScript 装饰器](https://github.com/wycats/javascript-decorators/blob/master/README.md)

