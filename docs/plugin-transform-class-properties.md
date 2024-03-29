---
id: babel-plugin-transform-class-properties
title: "@babel/plugin-transform-class-properties"
sidebar_label: class-properties
---

:::info
This plugin is included in `@babel/preset-env`, in [ES2022](https://github.com/tc39/proposals/blob/master/finished-proposals.md)
:::

## Example

## 示例

以下展示了一个包含 4 个属性的类，它们将会被转译。

```js title="JavaScript"
class Bork {
  //Property initializer syntax
  instanceProperty = "bork";
  boundFunction = () => {
    return this.instanceProperty;
  };

    // 静态类属性
    static staticProperty = "babelIsCool";
    static staticFunction = function() {
      return Bork.staticProperty;
    };
  }

  let myBork = new Bork;

  // 属性初始化器设定的值不在原型上
  console.log(myBork.__proto__.boundFunction); // > undefined

  // 绑定函数绑定到类实例上
  console.log(myBork.boundFunction.call(undefined)); // > "bork"

  // 类上包含静态函数
  console.log(Bork.staticFunction()); // > "babelIsCool"
```

## 安装

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-class-properties
```

## 用法

### 使用配置文件（推荐）

未使用选项：

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-class-properties"]
}
```

使用选项：

```json title="babel.config.json"
{
  "plugins": [["@babel/plugin-transform-class-properties", { "loose": true }]]
}
```

### 通过 CLI 使用

```sh title="Shell"
babel --plugins @babel/plugin-transform-class-properties script.js
```

### 通过 Node API 使用

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-class-properties"],
});
```

## 选项

### `loose`

`boolean`，默认为 `false`。

当设置为 `true` 时，类属性将被编译为赋值表达式而不是 `Object.defineProperty`。

:::caution
Consider migrating to the top level [`setPublicClassFields`](assumptions.md#setpublicclassfields) assumption
:::

```json title="babel.config.json"
{
  "assumptions": {
    "setPublicClassFields": true
  }
}
```

有关使用其中任何一种结果的解释，请参考 [Definition vs. Assignment](http://2ality.com/2012/08/property-definition-assignment.html) (第 5 部分为总结)

#### 示例

```js title="JavaScript"
class Bork {
  static a = "foo";
  static b;

  x = "bar";
  y;
}
```

When `setPublicClassFields` is `false`, the above code will compile to the following, using `Object.defineProperty`:

```js title="JavaScript"
var Bork = function Bork() {
  babelHelpers.classCallCheck(this, Bork);
  Object.defineProperty(this, "x", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: "bar",
  });
  Object.defineProperty(this, "y", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: void 0,
  });
};

Object.defineProperty(Bork, "a", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: "foo",
});
Object.defineProperty(Bork, "b", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: void 0,
});
```

When `setPublicClassFields` is set to `true`, it will compile using assignment expressions:

```js title="JavaScript"
var Bork = function Bork() {
  babelHelpers.classCallCheck(this, Bork);
  this.x = "bar";
  this.y = void 0;
};

Bork.a = "foo";
Bork.b = void 0;
```

:::tip
You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
:::

## 参考

* [提案：公共与私有实例的 fields](https://github.com/tc39/proposal-class-fields)
* [提案：静态 class 特性](https://github.com/tc39/proposal-static-class-features)
