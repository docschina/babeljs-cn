---
id: version-6.26.3-babel-plugin-check-es2015-constants
title: babel-plugin-check-es2015-constants
sidebar_label: check-es2015-constants
original_id: babel-plugin-check-es2015-constants
---

## Example

**In**

```js
const a = 1;
a = 2;
```

**Out**

```bash
repl: "a" is read-only
  1 | const a = 1;
> 2 | a = 2;
    | ^
```

> #### Syntax only
> 
> This check will only validate consts. If you need it to compile down to \`var\` then you must also install and enable [transform-es2015-block-scoping](babeljs.io/docs/en/babel-plugin-transform-es2015-block-scoping).

## Installation

```sh
npm install --save-dev babel-plugin-check-es2015-constants
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["check-es2015-constants"]
}
```

### Via CLI

```sh
babel --plugins check-es2015-constants script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["check-es2015-constants"]
});
```

## Note

This check will only validate consts. If you need it to compile down to `var` then you must also install and enable [`transform-es2015-block-scoping`](https://babeljs.io/docs/en/babel-plugin-transform-es2015-block-scoping/).

