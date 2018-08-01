---
id: version-6.x-babel-preset-stage-1
title: babel-preset-stage-1
sidebar_label: stage-1
original_id: babel-preset-stage-1
---

第 1 阶段的要点：

> **Stage 1**：提案
>
> **该阶段含义是？** 该阶段的功能会被正式提案。
>
> **该阶段的要求是？** 提案需要确定一个被称为负责人 (champion) 来跟进。负责人或联合负责人必须是 TC39 的成员。提案要解决的问题必须描述清楚，提出的解决方案中必须包含示例、API 以及相关的语义和算法。最后，必须明确提案的潜在障碍，例如与其他特性的交互或实现可能面临的挑战。就实现而言，polyfill 和 demo 也是必须的。
>
> **下一步规划？** 当一个 stage 1 的提案被接受后，TC39 会宣布愿意审查、讨论及促成该提案。接下来的过程中，该提案可能发生大的改变。

该 preset 包含以下插件：

- [transform-class-constructor-call](babel-plugin-transform-class-constructor-call)（不推荐）
- [transform-export-extensions](babel-plugin-transform-export-extensions)

以及以下所有 preset 中的插件：

- [preset-stage-2](babel-preset-stage-2)
- [preset-stage-3](babel-preset-stage-3)

> 你可以查阅 src/index.js 以确保成功使用插件。

## 安装

```sh
npm install --save-dev babel-preset-stage-1
```

## 使用

### 通过 `.babelrc` 文件（推荐）

**.babelrc**

```json
{
  "presets": ["stage-1"]
}
```

### 通过 CLI

```sh
babel script.js --presets stage-1
```

### 通过 Node API

```javascript
require("babel-core").transform("code", {
  presets: ["stage-1"]
});
```

## 参考资料

- Axel Rauschmayer 在 "探索 ES2016 和 ES2017" 中的 "[TC39 的 ECMAScript 特性的流程](http://exploringjs.com/es2016-es2017/ch_tc39-process.html)" 章节。
