---
id: version-6.x-babel-code-frame
title: babel-code-frame
sidebar_label: babel-code-frame
original_id: babel-code-frame
---

## 安装

```sh
npm install --save-dev babel-code-frame
```

## 使用

```js
import codeFrame from 'babel-code-frame';

const rawLines = `class Foo {
  constructor()
}`;
const lineNumber = 2;
const colNumber = 16;

const result = codeFrame(rawLines, lineNumber, colNumber, { /* options */ });

console.log(result);
```

```sh
  1 | class Foo {
> 2 |   constructor()
    |                ^
  3 | }
```

如果列号未知，你可以通过使用 `null` 代替。

## 选项

### `highlightCode`

`boolean`，默认为 `false`。

将终端中的 JavaScript 代码切换为语法高亮。

### `linesAbove`

`number`，默认为 `2` 。

调整要显示在错误上方的行数。

### `linesBelow`

`number`，默认为 `3` 。

调整要显示在错误下方的行数。

### `forceColor`

`boolean`，默认为 `false` 。

启用此选项可强制为 JavaScript 提供语法高亮(对于非终端)；覆盖 `highlightCode` 。
