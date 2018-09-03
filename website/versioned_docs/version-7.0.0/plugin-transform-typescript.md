---
id: version-7.0.0-babel-plugin-transform-typescript
title: @babel/plugin-transform-typescript
sidebar_label: transform-typescript
original_id: babel-plugin-transform-typescript
---

Does not type-check its input. For that, you will need to install and set up TypeScript.

## Caveats

* Does not support [`namespace`][namespace]s. **Workaround**: Move to using [file exports][fm], or migrate to using the `module { }` syntax instead.
* Does not support [`const enum`][const_enum]s because those require type information to compile.
**Workaround**: Remove the `const`, which makes it available at runtime.
* Does not support [`export =`][exin] and [`import =`][exin], because those cannot be compiled to ES.next. **Workaround**: Convert to using `export default` and `export const`, and `import x, {y} from "z"`.

## Example

**In**

```javascript
const x: number = 0;
```

**Out**

```javascript
const x = 0;
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-typescript
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-transform-typescript"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-typescript script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-typescript"]
});
```
## Options

### `isTSX`

`boolean`, defaults to `false`

### `jsxPragma`

`string`, defaults to `React`

Replace the function used when compiling JSX expressions.

This is so that we know that the import is not a type import, and should not be removed

[const_enum]: https://www.typescriptlang.org/docs/handbook/enums.html#const-enums
[namespace]: https://www.typescriptlang.org/docs/handbook/namespaces.html
[exin]: https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require
[fm]: https://github.com/Microsoft/dtslint/blob/master/docs/no-single-declare-module.md

