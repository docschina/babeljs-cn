---
id: version-6.26.3-babel-preset-stage-0
title: babel-preset-stage-0
sidebar_label: stage-0
original_id: babel-preset-stage-0
---

第 0 阶段的要点:

> **Stage 0**: 稻草人提案
>
> **该阶段含义是？** 一种为 ECMAScript 的演变自由提交想法的方式。提交的内容必须来自 TC39 的成员或非成员但已经[注册成为 TC39 contributor](http://www.ecma-international.org/memento/contribute_TC39_Royalty_Free_Task_Group.php) 的人。
>
> **该阶段的要求是？** 该文档必须在 TC39 会议（源）上审核，然后添加到[第 0 阶段提案的页面](https://github.com/tc39/proposals/blob/master/stage-0-proposals.md)上。

该 preset 包含如下插件：

- [transform-do-expressions](babel-plugin-transform-do-expressions)
- [transform-function-bind](babel-plugin-transform-function-bind)

以及以下所有 preset 中的插件：

- [preset-stage-1](babel-preset-stage-1)
- [preset-stage-2](babel-preset-stage-2)
- [preset-stage-3](babel-preset-stage-3)

> 你可以查阅 src/index.js 以确保成功使用插件。

## 安装

```sh
npm install --save-dev babel-preset-stage-0
```

## 使用

### 通过 `.babelrc` 文件（推荐）

**.babelrc**

```json
{
  "presets": ["stage-0"]
}
```

### 通过 CLI

```sh
babel script.js --presets stage-0
```

### 通过 Node API

```javascript
require("babel-core").transform("code", {
  presets: ["stage-0"]
});
```

## 参考资料

- Axel Rauschmayer 在 "探索 ES2016 和 ES2017" 中的 "[TC39 的 ECMAScript 特性的流程](http://exploringjs.com/es2016-es2017/ch_tc39-process.html)" 章节。
