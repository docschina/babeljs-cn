---
id: version-6.x-babel-preset-stage-2
title: babel-preset-stage-2
sidebar_label: stage-2
original_id: babel-preset-stage-2
---

第 2 阶段的要点是：

> **Stage 2：** 草案
>
> **该阶段含义是？** 将会进入规范的提案的第一个版本。从这一点来说，该特性可能最终将被包含在标准中。
>
> **该阶段的要求是？** 该提案必须包含对该功能的语法和语义的正式说明（使用 ECMAScript 规范的形式语言）。该说明应尽可能完整，但也可以包含待办事项和占位符。该特性必须有两个实验性实现，其中一个可以用诸如 Babel 等转译器实现。
>
> **下一步规划？** 从现在起，只可进行增量更改。

该 preset 包含以下插件：

- [syntax-dynamic-import](babel-plugin-syntax-dynamic-import)
- [transform-class-properties](babel-plugin-transform-class-properties)
- [transform-decorators](babel-plugin-transform-decorators) *disabled pending proposal update* (can use the [legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) transform in the meantime)

以及以下所有 preset 中的插件：

- [preset-stage-3](babel-preset-stage-3)

> 你可以查阅 src/index.js 以确保成功使用插件。

## 使用

### 通过 `.babelrc` 文件（推荐）

**.babelrc**

```json
{
  "presets": ["stage-2"]
}
```

### 通过 CLI

```sh
babel script.js --presets stage-2
```

### 通过 Node API

```javascript
require("babel-core").transform("code", {
  presets: ["stage-2"]
});
```

## 参考资料

- Axel Rauschmayer 在 "探索 ES2016 和 ES2017" 中的 "[TC39 的 ECMAScript 特性的流程](http://exploringjs.com/es2016-es2017/ch_tc39-process.html)" 章节。
