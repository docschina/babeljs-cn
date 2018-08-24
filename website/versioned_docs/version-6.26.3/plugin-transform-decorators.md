---
id: version-6.26.3-babel-plugin-transform-decorators
title: babel-plugin-transform-decorators
sidebar_label: transform-decorators
original_id: babel-plugin-transform-decorators
---

> Stage 2 decorators are in progress [babel/babel#2645](https://github.com/babel/babel/issues/2645). Patches welcome!
> 
> In Babel 7, [transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) will be the default plugin in Stage-0.

## Example

(examples are from proposal)

### Simple class decorator

```js
@annotation
class MyClass { }

function annotation(target) {
   target.annotated = true;
}
```

### Class decorator

```js
@isTestable(true)
class MyClass { }

function isTestable(value) {
   return function decorator(target) {
      target.isTestable = value;
   }
}
```

### Class function decorator

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

## Installation

```sh
npm install --save-dev babel-plugin-transform-decorators
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-decorators"]
}
```

### Via CLI

```sh
babel --plugins transform-decorators script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-decorators"]
});
```

## References

* [Proposal: Javascript Decorators](https://github.com/wycats/javascript-decorators/blob/master/README.md)

