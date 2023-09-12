---
id: presets
title: 预设
---

Babel 预设可以作为 Babel 插件和配置 [选项](options.md) 的共享集。

## 官方预设

我们为常见环境组合了几个预设：

- [@babel/preset-env](preset-env.md) 用于编译 ES2015+ 语法
- [@babel/preset-typescript](preset-typescript.md) 用于 [TypeScript](https://www.typescriptlang.org)
- [@babel/preset-react](preset-react.md) 用于 [React](https://reactjs.org/)
- [@babel/preset-flow](preset-flow.md) 用于 [Flow](https://flow.org/)

## 其它集成

如果你没有直接使用 Babel，那么你正在使用的框架可能有自己的配置供您使用或扩展。[npm 上](https://www.npmjs.com/search?q=babel-preset) 提供了许多其他社区维护的预设！

[Next.js](https://nextjs.org/docs/advanced-features/customizing-babel-config) | [Nuxt.js](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build#babel) | [Parcel](https://en.parceljs.org/javascript.html#babel) | [Jest](https://jestjs.io/docs/getting-started#using-babel) | [Gatsby](https://www.gatsbyjs.com/docs/how-to/custom-configuration/babel)

<div id="preset-paths"></div>

## 使用预设

在 Babel 配置中，如果预设在 [npm](https://www.npmjs.com/search?q=babel-preset) 上，你可以传入预设的名称，Babel 将检查它是否已经安装在 `node_modules` 中。 这将添加到 [预设](options.md#presets) 配置选项中，该选项接受一个数组。

```json title="babel.config.json"
{
  "presets": ["babel-preset-myPreset", "@babel/preset-env"]
}
```

除此以外，还可以指定预设的相对或绝对路径。

```json title="babel.config.json"
{
  "presets": ["./myProject/myPreset"]
}
```

有关配置插件或预设路径的更多细节，请参见 [名称规范化](options.md#name-normalization)。

## Stage-X (实验性预设)

<<<<<<< HEAD
<blockquote class="babel-callout babel-callout-danger">
  <h4>废弃</h4>
  <p>
    从 Babel 7 开始，我们决定废弃 Stage-X 预设，并停止发布它们。因为这些提案本身就容易改变，所以让用户将单个提案指定为插件似乎更好，而不是一个你无论如何都需要检查的“包罗万象”的预设。请查阅我们的 <a href="https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets">博客</a> 了解更多背景信息。
  </p>
</blockquote>
=======
:::danger Deprecated
As of Babel 7, we've decided to deprecate the Stage-X presets and stop publishing them. Because these proposals are inherently subject to change, it seems better to ask users to specify individual proposals as plugins vs. a catch all preset that you would need to check up on anyway. Check out our <a href="https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets">blog</a> for more context.
:::
>>>>>>> 9f3c7722104ca48570bbfade3d1ca7026f32d8c8

stage-x 预设中的任何转换都是对一部分未经批准作为 JavaScript 发行版的更改（例如 ES6 / ES2015）。

[TC39](https://github.com/tc39) 将提案分为以下几个阶段：

- [Stage 0](preset-stage-0.md) - 稻草人：只是一个想法，可能是 Babel 插件。
- [Stage 1](preset-stage-1.md) - 提案：这值得努力。
- [Stage 2](preset-stage-2.md) - 草案：初始规范。
- [Stage 3](preset-stage-3.md) - 候选：完整的规范和初始的浏览器实现。
- Stage 4 - 完成：将被添加到下一个年度发行版中。

有关更多信息，请务必查阅 [当前的 TC39 提案](https://github.com/tc39/proposals) 及其 [流程文档](https://tc39.github.io/process-document)。

Yehuda Katz (@wycatz) 在 [thefeedbackloop.xyz](https://thefeedbackloop.xyz) 的几个帖子中也详细解释了 TC39 阶段的流程：[Stage 0 and 1](https://thefeedbackloop.xyz/tc39-a-process-sketch-stages-0-and-1/), [Stage 2](https://thefeedbackloop.xyz/tc39-process-sketch-stage-2/), [Stage 3](https://thefeedbackloop.xyz/tc39-process-sketch-stage-3/)

## 创建预设

要制作你自己的预设（本地使用或 npm），您需要导出一个配置对象。

> 它可以返回一个插件数组..

```js title="JavaScript"
module.exports = function() {
  return {
    plugins: ["pluginA", "pluginB", "pluginC"],
  };
};
```

> 预设可以包含其它预设和带有选项的插件。

```js title="JavaScript"
module.exports = () => ({
  presets: [require("@babel/preset-env")],
  plugins: [
    [require("@babel/plugin-transform-class-properties"), { loose: true }],
    require("@babel/plugin-transform-object-rest-spread"),
  ],
});
```

要了解更多信息，请查阅 [babel 手册](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/user-handbook.md#making-your-own-preset) 中关于预设的部分。

## 预设排序

预设排序是倒序（从最后一个到第一个）。

```json title="babel.config.json"
{
  "presets": ["a", "b", "c"]
}
```

将按以下顺序运行：`c`，`b`，然后 `a`。

这主要是为了确保向后兼容，因为大多数用户在 "stage-0" 之前列出了 "es2015"。

## 预设选项

插件和预设都可以通过将名称和选项对象包装在你的配置的一个数组内来指定选项。

如果指定可选项，以下都是等效的：

```json title="babel.config.json"
{
  "presets": [
    "presetA", // 单字符串
    ["presetA"], // 包装在数组中
    ["presetA", {}] // 第 2 个参数是一个空的配置对象
  ]
}
```

若要指定选项，请传递一个以键作为选项名称的对象。

```json title="babel.config.json"
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "loose": true,
        "modules": false
      }
    ]
  ]
}
```
