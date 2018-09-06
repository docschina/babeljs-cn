---
id: version-7.0.0-presets
title: Presets
original_id: presets
---
不想自己设置插件？没问题！Presets 可以像一组 Babel 插件那样操作甚至可共享[`options`](options.md)配置。


## 官方 Presets

我们为常见环境组装了一些 presets ：

- [@babel/preset-env](preset-env.md)
- [@babel/preset-flow](preset-flow.md)
- [@babel/preset-react](preset-react.md)
- [@babel/preset-typescript](preset-typescript.md)

> 在[ npm ](https://www.npmjs.com/search?q=babel-preset)上有许多其他社区维护的 presets 可用!

## Stage-X (试验性 Presets)

stage-x presets 中的任何转换都是对未被批准发布为 Javascript 的部分（如 ES6 / ES2015）的更改。

<blockquote class="babel-callout babel-callout-danger">
  <h4>可调整的改变</h4>
  <p>
    这些提案可能会有所变化，因此<strong><em>请谨慎使用</em></strong>，特别是对于第3阶段之前的提案。我们计划在每次 TC39 会议后尽快更新变化到 stage-x presets。
  </p>
</blockquote>

[TC39](https://github.com/tc39) 将提案分为以下阶段：

- [Stage 0](preset-stage-0.md) - 稻草人: 只是个想法可能会有相关的 Babel 插件。
- [Stage 1](preset-stage-1.md) - 提议: 值得深入。
- [Stage 2](preset-stage-2.md) - 草稿: 初始规范。
- [Stage 3](preset-stage-3.md) - 候选: 完整的规范和初始浏览器实现。
- Stage 4 - 结束: 将被添加到下一个年度版本中。

有关更多信息，请务必查看[最新 TC39 提案](https://github.com/tc39/proposals)及其[进程文档](https://tc39.github.io/process-document)。

Yehuda Katz（@wycatz）在 [thefeedbackloop.xyz](https://thefeedbackloop.xyz) 的几篇文章中详细解释了 TC39 阶段过程：[Stage 0 and 1](https://thefeedbackloop.xyz/tc39-a-process-sketch-stages-0-and-1/), [Stage 2](https://thefeedbackloop.xyz/tc39-process-sketch-stage-2/), [Stage 3](https://thefeedbackloop.xyz/tc39-process-sketch-stage-3/)。

## 创建 Preset

只需要导出一个配置，就可以创建自己的 preset。

> 它只是返回一个插件数组而已...

```js
module.exports = function() {
  return {
    plugins: [
      "pluginA",
      "pluginB",
      "pluginC",
    ]
  };
}
```

> Presets 可以包含其他的 presets 以及带有选项的插件。

```js
module.exports = () => ({
  presets: [
    require("@babel/preset-env"),
  ],
  plugins: [
    [require("@babel/plugin-proposal-class-properties"), { loose: true }],
    require("@babel/plugin-proposal-object-rest-spread"),
  ],
});
```

有关更多信息，请查看 [babel handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/user-handbook.md#making-your-own-preset) 部分。

## Preset 路径

如果 preset 在 npm 上，你可以传入预设名称，babel 将检查它是否已安装在 `node_modules` 中

```json
{
  "presets": ["babel-preset-myPreset"]
}
```

还可以指定 presets 的相对/绝对路径。

```json
{
  "presets": ["./myProject/myPreset"]
}
```

### Preset 简写

如果包的名称以 `babel-preset-` 为前缀，可以使用简写：

```js
{
  "presets": [
    "myPreset",
    "babel-preset-myPreset" // 等同
  ]
}
```

这也适用于 scoped 包：

```js
{
  "presets": [
  	"@org/babel-preset-name",
  	"@org/name" // 等同
  ]
}
```

## Preset 顺序

Preset 的顺序是相反的(从最后一个到第一个).

```json
{
  "presets": [
    "a",
    "b",
    "c"
  ]
}
```

将会按照以下顺序运行：`c`, `b`, 然后 `a`。

这主要是为了确保向后兼容性，因为大多数用户在“stage-0”之前列出了“es2015”。

## Preset 选项

插件和 presets 都可以通过将名称和选项对象放在配置中的数组中来指定选项。

对于不指定选项，这些都是等同的：

```json
{
  "presets": [
    "presetA",
    ["presetA"],
    ["presetA", {}],
  ]
}
```

要指定选项，请使用选项名称作为 key 传递对象。

```json
{
  "presets": [
    ["@babel/preset-env", {
      "loose": true,
      "modules": false
    }]
  ]
}
```
