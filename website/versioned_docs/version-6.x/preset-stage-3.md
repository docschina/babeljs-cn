---
id: version-6.x-babel-preset-stage-3
title: babel-preset-stage-3
sidebar_label: stage-3
original_id: babel-preset-stage-3
---

Stage 3 的要点是：

> **Stage 3**: 候选提案
>
> **该阶段含义是？** 该提案已基本完成，接下来需要收集实现和使用者的反馈才能进一步发展。
>
> **该阶段的要求是？** 规范文本必须完整。指定的审阅者（由 TC39 指定，而非负责人）和 ECMAScript 规范的编者必须在规范上签名。必须至少有两个符合规范的实现（无需默认启用）。
>
> **下一步规划？** 此后，只有在实现和使用过程中出现了重大问题才能修改。

该 preset 包含以下插件：

- [transform-object-rest-spread](babel-plugin-transform-object-rest-spread)
- [transform-async-generator-functions](babel-plugin-transform-async-generator-functions)

> 尾后逗号, async, 幂运算将在下一个主版本中移除，因为他们已经属于第 4 阶段。

- [syntax-trailing-function-commas](babel-plugin-syntax-trailing-function-commas)
- [transform-async-to-generator](babel-plugin-transform-async-to-generator)
- [transform-exponentiation-operator](babel-plugin-transform-exponentiation-operator)

## 安装

```sh
npm install --save-dev babel-preset-stage-3
```

## 使用

### 通过 `.babelrc` 文件（推荐）

**.babelrc**

```json
{
  "presets": ["stage-3"]
}
```

### 通过 CLI

```sh
babel script.js --presets stage-3
```

### 通过 Node API

```javascript
require("babel-core").transform("code", {
  presets: ["stage-3"]
});
```

## 参考资料

- Axel Rauschmayer 在 "探索 ES2016 和 ES2017" 中的 "[TC39 的 ECMAScript 特性的流程](http://exploringjs.com/es2016-es2017/ch_tc39-process.html)" 章节。
