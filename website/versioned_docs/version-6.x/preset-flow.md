---
id: version-6.x-babel-preset-flow
title: babel-preset-flow
sidebar_label: flow
original_id: babel-preset-flow
---

该 preset 包含以下这些插件：

- [transform-flow-strip-types](babel-plugin-transform-flow-strip-types)

## 示例

**输入**

```javascript
function foo(one: any, two: number, three?): string {}
```

**输出**

```javascript
function foo(one, two, three) {}
```

## 安装

```sh
npm install --save-dev babel-preset-flow
```

## 使用

### 通过 `.babelrc` (推荐)

**.babelrc**

```json
{
  "presets": ["flow"]
}
```

### 通过 CLI

```sh
babel --presets flow script.js
```

### 通过 Node API

```javascript
require("babel-core").transform("code", {
  presets: ["flow"]
});
```
