---
id: babel-plugin-transform-async-to-generator
title: "@babel/plugin-transform-async-to-generator"
sidebar_label: async-to-generator
---

:::info
This plugin is included in `@babel/preset-env`, in [ES2017](https://github.com/tc39/proposals/blob/master/finished-proposals.md)
:::

In Babel 7, `transform-async-to-module-method` was merged into this plugin

## Example

**In**

```js title="JavaScript"
async function foo() {
  await bar();
}
```

**Out**

```js title="JavaScript"
var _asyncToGenerator = function (fn) {
  ...
};
var foo = _asyncToGenerator(function* () {
  yield bar();
});
```

**Out with options**

> Turn async functions into a Bluebird coroutine ([caveats](#bluebird-non-promise-runtime-error))

```js title="JavaScript"
var Bluebird = require("bluebird");

var foo = Bluebird.coroutine(function*() {
  yield bar();
});
```

## Installation

```shell npm2yarn
npm install --save-dev @babel/plugin-transform-async-to-generator
```

## Usage

### With a configuration file (Recommended)

Without options:

```json title="babel.config.json"
{
  "plugins": ["@babel/plugin-transform-async-to-generator"]
}
```

With options:

```json title="babel.config.json"
{
  "plugins": [
    [
      "@babel/plugin-transform-async-to-generator",
      {
        "module": "bluebird",
        "method": "coroutine"
      }
    ]
  ]
}
```

### Via CLI

```sh title="Shell"
babel --plugins @babel/plugin-transform-async-to-generator script.js
```

### Via Node API

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-async-to-generator"],
});
```

## Caveats

### Bluebird non-promise runtime error

When using `await` with non-promise values, Bluebird will throw "Error: A value was yielded that could not be treated as a promise". Since Babel cannot automatically handle this runtime error, you should manually transform it to a promise.

```diff
async function foo() {
-  await 42;
+  await Promise.resolve(42);
}
```

## References

- [Proposal: Async Functions for ECMAScript](https://github.com/tc39/ecmascript-asyncawait)
