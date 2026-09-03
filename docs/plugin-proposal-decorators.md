---
id: babel-plugin-proposal-decorators
title: "@babel/plugin-proposal-decorators"
sidebar_label: decorators
---

## 示例

### Simple class decorator

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

### Class method decorator {#class-function-decorator}

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
    ["@babel/plugin-proposal-decorators", { "version": "2023-11" }]
  ]
}
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: [
    ["@babel/plugin-proposal-decorators", { version: "2023-11" }],
  ]
});
```

## 选项

<details>
  <summary>History</summary>

| Version | Changes |
| --- | --- |
| `v7.24.0` | Added support for `version: "2023-11"` |
| `v7.22.0` | Added support for `version: "2023-05"` |
| `v7.21.0` | Added support for `version: "2023-01"` |
| `v7.19.0` | Added support for `version: "2022-03"` |
| `v7.17.0` | Added the `version` option with support for `"2021-12"`, `"2018-09"` and `"legacy"` |
</details>

### `version`

`"2023-11"` or `"legacy"`.

Selects the decorators proposal to use:
- `"2023-11"` is the proposal version after the updates that reached consensus in the November 2023 TC39 meeting. This version will be enabled by default if it ends up being the final one. It allows decorators either before or after `export`.
- `legacy` is the legacy Stage 1 proposal, defined at [`wycats/javascript-decorators@e1bf8d41bf`](https://github.com/wycats/javascript-decorators/blob/e1bf8d41bfa2591d949dd3bbf013514c8904b913/README.md). The legacy mode will not have feature updates, and there are known [discrepancies between Babel and TypeScript](https://github.com/babel/babel/issues/8864#issuecomment-688535867). It is recommended to migrate to the `"2023-11"` proposal version.

The spec repo provides a brief [summary of the differences between these versions](https://github.com/tc39/proposal-decorators#how-does-this-proposal-compare-to-other-versions-of-decorators).



## `Symbol.metadata` notes

When using decorators which either access or modify the metadata in the decorator context, you need to use `Symbol.metadata`. When `Symbol.metadata` is not available, Babel defaults to `Symbol.for("Symbol.metadata")`: this may be incompatible with other packages that use a different fallback.

To ensure that `Symbol.metadata` is available globally and matches the symbol used by the Babel decorators plugin during transpilation, you will need to either include a polyfill that defines it, or define it yourself:

```js title="symbol-metadata-polyfill.js"
Symbol.metadata = Symbol.for("Symbol.metadata");
```

<<<<<<< HEAD
This option was originally added to help tc39 collect feedback from the community by allowing experimentation with the proposed syntaxes. The proposal has now settled on allowing decorators either before or after `export`.

### `legacy`

:::danger Deprecated
Use `version: "legacy"` instead. This option is a legacy alias.
:::

`boolean`，默认为 `false`

使用历史遗留（stage 1）的装饰器中的语法和行为。

#### NOTE: Compatibility with `@babel/plugin-transform-class-properties`

If you are including your plugins manually and using class elements transforms such as
- `@babel/plugin-transform-class-properties`
- `@babel/plugin-transform-private-methods`
- `@babel/plugin-transform-private-property-in-object`
- `@babel/plugin-transform-class-static-block`

make sure that `@babel/plugin-proposal-decorators` comes _before_ them.

```diff title="babel.config.json"
{
  "plugins": [
-   "@babel/plugin-transform-class-properties",
    ["@babel/plugin-proposal-decorators", { "version": "2023-11" }]
+   "@babel/plugin-transform-class-properties"
  ]
}
```

If you are already using `@babel/preset-env` and Stage 3 decorators, you can safely remove the
class elements transform, Babel will automatically apply decorators transform before any presets:

```diff title="babel.config.json"
{
  "presets": [
    ["@babel/preset-env"],
  ],
  "plugins": [
-   "@babel/plugin-transform-class-properties",
    ["@babel/plugin-proposal-decorators", { "version": "2023-11" }]
  ]
}
```

If you are using `@babel/preset-env` and legacy decorators, you must ensure the class elements transform is enabled regardless of your targets, because Babel only supports compiling legacy decorators when also compiling class properties:

```diff title="babel.config.json"
{
  "presets": [
    ["@babel/preset-env", {
+     "include": [
+       "@babel/plugin-transform-class-properties"
+     ]
    }],
  ],
  "plugins": [
-   "@babel/plugin-transform-class-properties",
    ["@babel/plugin-proposal-decorators", { "version": "legacy" }]
  ]
}
```

The `include` option will enable the transforms included in `@babel/preset-env` so you can safely remove them from your `package.json`.

:::tip
You can read more about configuring plugin options [here](https://babeljs.io/docs/en/plugins#plugin-options)
:::

::::
=======
You can also use a third-party polyfill, such as `core-js/proposals/decorator-metadata-v2.js`. Make sure that the polyfill is executed before any code that uses decorators or accesses `Symbol.metadata`.
>>>>>>> 752ffabf042e92ff9ba43931d53e77264f756bf8

## 参考

- [Proposal: JavaScript Decorators](https://github.com/tc39/proposal-decorators)
