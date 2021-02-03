---
id: version-7.0.0-babel-plugin-transform-block-scoped-functions
title: @babel/plugin-transform-block-scoped-functions
sidebar_label: transform-block-scoped-functions
original_id: babel-plugin-transform-block-scoped-functions
---

## Examples

**In**

```javascript
{
  function name (n) {
    return n;
  }
}

name("Steve");
```

**Out**

```javascript
{
  let name = function (n) {
    return n;
  };
}
name("Steve");
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-block-scoped-functions
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-block-scoped-functions"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-block-scoped-functions script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-block-scoped-functions"]
});
```
