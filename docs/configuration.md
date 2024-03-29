---
id: configuration
title: 配置 Babel
---

Babel 是可配置的！许多其他工具都有类似的配置：ESLint (`.eslintrc`), Prettier (`.prettierrc`)。

所有 Babel API [可选项](options.md) 都可以配置。然而，如果选项中含有 JavaScript，你可能需要使用一个 JavaScript [配置文件](config-files.md)。

## 你的使用场景是什么？

- 你正在使用一个单体式仓库？
- 你想要编译 `node_modules`？

> [`babel.config.json`](#babelconfigjson) 推荐你使用！

- 你的配置仅适用于项目的单个部分吗？

> [`.babelrc.json`](#babelrcjson) 推荐你使用！

- Guy Fieri 是你的英雄？（译注：Guy Fieri 是明星厨师，这里意思是喜欢根据自己喜好配置）

> We recommend using the [`babel.config.json`](config-files.md#project-wide-configuration) format.

### `babel.config.json`

在项目的根目录（`package.json` 所在的位置）中，创建一个名为 `babel.config.json` 的文件，其中包含以下内容。

```json title="babel.config.json"
{
  "presets": [...],
  "plugins": [...]
}
```

Check out the [`babel.config.json` documentation](config-files.md#project-wide-configuration) to see more configuration options.

### `.babelrc.json`

Create a file called `.babelrc.json` with the following content in your project.

```json title=".babelrc.json"
{
  "presets": [...],
  "plugins": [...]
}
```

Check out the [.babelrc documentation](config-files.md#file-relative-configuration) to see more configuration options.

### `package.json`

Alternatively, you can choose to specify your [`.babelrc.json`](#babelrcjson) config from within `package.json` using the `babel` key like so:

```json title="package.json"
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    "presets": [ ... ],
    "plugins": [ ... ],
  }
}
```

### JavaScript configuration files

You can also write `babel.config.js` ([like we're doing](https://github.com/babel/babel/blob/main/babel.config.js)), and `.babelrc.js` files using JavaScript:

```js title="babel.config.js"
module.exports = function (api) {
  api.cache(true);

  const presets = [ ... ];
  const plugins = [ ... ];

  return {
    presets,
    plugins
  };
}
```

You are allowed to access any Node.js APIs, for example a dynamic configuration based on the process environment:

```js title="babel.config.js"
module.exports = function (api) {
  api.cache(true);

  const presets = [ ... ];
  const plugins = [ ... ];

  if (process.env["ENV"] === "prod") {
    plugins.push(...);
  }

  return {
    presets,
    plugins
  };
}
```

你可以在 [专用文档](config-files.md) 中，阅读有关 JavaScript 配置文件的更多信息。

## 使用 CLI (`@babel/cli`)

```sh title="Shell"
babel --plugins @babel/plugin-transform-arrow-functions script.js
```

查阅 [babel-cli 文档](cli.md)，以查看更多配置选项。

## 使用 API (`@babel/core`)

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-arrow-functions"],
});
```

查阅 [babel-core 文档](core.md)，以查看更多配置选项。

## 打印生效配置

你可以告知 Babel，为给定的输入路径打印生效的配置

import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="shell" label="Shell" default>
<CodeBlock language="bash">{`
# *nix or WSL
BABEL_SHOW_CONFIG_FOR=./src/myComponent.jsx npm start
`}
</CodeBlock>
</TabItem>
<TabItem value="powershell" label="powershell">
<CodeBlock language="powershell">{`
$env:BABEL_SHOW_CONFIG_FOR = ".\src\myComponent.jsx"; npm start
`}</CodeBlock>
</TabItem>
</Tabs>

`BABEL_SHOW_CONFIG_FOR` 接收绝对和相对*文件*路径。如果是相对路径，将从 [`cwd`](options.md#cwd) 解析。

当 Babel 处理完由 `BABEL_SHOW_CONFIG_FOR` 指定的输入文件之后，Babel 就会将生效配置打印到控制台。这里是示例输出：

```
Babel configs on "/path/to/cwd/src/index.js" (按优先级升序):
config /path/to/cwd/babel.config.json
{
  "sourceType": "script",
  "plugins": [
    "@foo/babel-plugin-1"
  ],
  "extends": "./my-extended.js"
}

config /path/to/cwd/babel.config.json .env["test"]
{
  "plugins": [
    [
      "@foo/babel-plugin-3",
      {
        "noDocumentAll": true
      },
    ]
  ]
}

config /path/to/cwd/babel.config.json .overrides[0]
{
  "test": "src/index.js",
  "sourceMaps": true
}

config /path/to/cwd/.babelrc
{}

@babel/cli 可编程选项
{
  "sourceFileName": "./src/index.js",
  "presets": [
    "@babel/preset-env"
  ],
  "configFile": "./my-config.js",
  "caller": {
    "name": "@babel/cli"
  },
  "filename": "./src/index.js"
}
```

Babel 将按优先级升序打印生效的配置源。上面示例的优先级为：

```
babel.config.json < .babelrc < @babel/cli 可编程选项
```

换句话说，`babel.config.json` 会被 `.babelrc` 覆盖，而 `.babelrc` 被可编程选项覆盖。

对于每个配置源，Babel 会按优先级升序打印适用的配置项（例如 [`overrides`](options.md#overrides) 和 [`env`](options.md#env)）。通常，每个配置源都有至少一个配置项 - 所有配置的根路径。如果你配置了 `overrides` 或 `env`，Babel 不会在根路径中打印它们，而是输出一个名为 `.overrides[index]` 的单独配置项，其中 `index` 是项目的位置。这有助于确定该项对输入路径是否生效，以及将覆盖哪些配置。

如果输入路径是通过 `ignore` 或 `only` 来配置忽略，Babel 将打印：该文件被忽略。

### Babel 如何合并配置项

Babel 的配置合并相对简单。当选项存在且其值不为 `undefined` 时，将覆盖现有选项。
不过，也有一些特殊情况：

- 如 `assumptions`, `parserOpts` 和 `generatorOpts`, 对象被合并，而不是被替换。
- 如 `plugins` and `presets`, 则根据 plugin/preset object/function 本身的标识结合入口的名称来替换它们。

#### 选项（plugin/preset 除外）合并

例如，考虑如下配置:

```js title="JavaScript"
{
  sourceType: "script",
  assumptions: {
    setClassFields: true,
    iterableIsArray: false
  },
  env: {
    test: {
      sourceType: "module",
      assumptions: {
        iterableIsArray: true,
      },
    }
  }
};
```

当 `NODE_ENV` 为 `test`, `sourceType` 选项将被替换，`assumptions` 选项将被合并。生效的配置是：

```js title="JavaScript"
{
  sourceType: "module", // sourceType: "script" 被覆盖了
  assumptions: {
    setClassFields: true,
    iterableIsArray: true, // assumptions 由 Object.assign 合并了
  },
}
```

#### Plugin/Preset 合并

例如，考虑如下配置:

```js title="JavaScript"
plugins: [
  './other',
  ['./plug', { thing: true, field1: true }]
],
overrides: [{
  plugins: [
    ['./plug', { thing: false, field2: true }],
  ]
}]
```

`overrides` 配置项将被合并到顶级选项之上。
重要的是，`plugins` 数组作为一个整体并不仅是替换一个顶层的插件。
合并逻辑将发现 `"./plug"` 在这两种情况下是相同的插件，
`{ thing: false, field2: true }` 将替换原始选项，导致配置为

```js title="JavaScript"
plugins: [
  './other',
  ['./plug', { thing: false, field2: true }],
],
```

由于合并是基于标识 + 名称的，
因此在同一个 `plugins`/`presets` 数组中使用两次相同名称的插件被认为是错误的。例如

```js title="JavaScript"
plugins: ["./plug", "./plug"];
```

被认为是一个错误，因为它与 `plugins: ['./plug']` 完全相同。此外

```js title="JavaScript"
plugins: [["./plug", { one: true }], ["./plug", { two: true }]];
```

也被认为是一个错误，因为第二个总是会取代第一个。

如果你 _确实想要_ 实例化一个插件的两个独立实例，
你必须为每个实例分配一个名称以消除它们的歧义。例如：

```js title="JavaScript"
plugins: [
  ["./plug", { one: true }, "first-instance-name"],
  ["./plug", { two: true }, "second-instance-name"],
];
```

因为每个实例都有一个独特的名字，因此具有独特的身份。
