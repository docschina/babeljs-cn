---
id: configuration
title: 配置 Babel
---

Babel 是可配置的！许多其他工具都有类似的配置：ESLint (`.eslintrc`), Prettier (`.prettierrc`)。

所有 Babel API [可选项](options.md) 都可以配置。然而，如果选项中含有 JavaScript，你可能需要使用一个 JavaScript [配置文件](config-files.md)。

## 你的使用场景是什么？

- 你正在使用一个 monorepo？
- 你想要编译 `node_modules`？

> [`babel.config.json`](#babelconfigjson) 推荐你使用！

- 配置仅适用于项目的单个部分吗？

> [`.babelrc.json`](#babelrcjson) 推荐你使用！

- Guy Fieri 是你的英雄？（译注：Guy Fieri 是明星厨师，这里意思是喜欢根据自己喜好配置）

> 我们建议使用 [`babel.config.json`](config-files.md#project-wide-configuration) 格式。[Babel 本身正在使用它](https://github.com/babel/babel/blob/master/babel.config.js)。

### `babel.config.json`

在项目的根目录（`package.json` 所在的位置）中，创建一个名为 `babel.config.json` 的文件，其中包含以下内容。

```json
{
  "presets": [...],
  "plugins": [...]
}
```

```js
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

查阅 [`babel.config.json` 文档](config-files.md#project-wide-configuration) 以查看更多配置选项。

### `.babelrc.json`

在项目中创建一个名为 `.babelrc.json` 的文件，其中包含以下内容。

```json
{
  "presets": [...],
  "plugins": [...]
}
```

查阅 [.babelrc 文档](config-files.md#file-relative-configuration)，以查看更多配置选项。

### `package.json`

或者，你可以选择在 package.json 中 `babel` key 中指定 [`.babelrc.json`](#babelrcjson) 配置，如下所示：

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    "presets": [ ... ],
    "plugins": [ ... ],
  }
}
```

### JavaScript 配置文件

还可以使用 JavaScript 编写 `babel.config.json` 和 `.babelrc.json` 文件：

```js
const presets = [ ... ];
const plugins = [ ... ];

module.exports = { presets, plugins };
```

你可以访问任何 Node.js API，例如基于 process environment 的动态配置：

```js
const presets = [ ... ];
const plugins = [ ... ];

if (process.env["ENV"] === "prod") {
  plugins.push(...);
}

module.exports = { presets, plugins };
```

你可以在 [专用文档](config-files.md) 中，阅读有关 JavaScript 配置文件的更多信息。

## 使用 CLI (`@babel/cli`)

```sh
babel --plugins @babel/plugin-transform-arrow-functions script.js
```

查阅 [babel-cli 文档](cli.md)，以查看更多配置选项。

## 使用 API (`@babel/core`)

```js
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-arrow-functions"]
});
```

查阅 [babel-core 文档](core.md)，以查看更多配置选项。

## 打印生效配置

你可以告知 Babel，为给定的输入路径打印生效的配置
```sh
# *nix 或 WSL
BABEL_SHOW_CONFIG_FOR=./src/myComponent.jsx npm start
```

```powershell
$env:BABEL_SHOW_CONFIG_FOR = ".\src\myComponent.jsx"; npm start
```

`BABEL_SHOW_CONFIG_FOR` 接收绝对和相对_文件_路径。如果是相对路径，将从 [`cwd`](options.md#cwd) 解析。

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

对于每个配置源，Babel 会按优先级升序打印适用的配置项（例如 [`overrides`](options.md#overrides) 和 [`.env`](options.md#env)）。通常，每个配置源都有至少一个配置项 - 所有配置的根路径。如果你配置了 `overrides` 或 `env`，Babel 不会在根路径中打印它们，而是输出一个名为 `.overrides[index]` 的单独配置项，其中 `index` 是项目的位置。这有助于确定该项对输入路径是否生效，以及将覆盖哪些配置。

如果输入路径是通过 `ignore` 或 `only` 来配置忽略，Babel 将打印：该文件被忽略。

### Babel 如何合并配置项

对于上面提到的每个配置项，Babel 将通过 `Object.assign` 应用于选项（`plugins` 和 `presets` 除外，这些选项由 `Array#concat` 拼接）。例如
```js
const config = {
  plugins: [["plugin-1a", { loose: true }], "plugin-1b"],
  presets: ["preset-1a"],
  sourceType: "script"
}

const newConfigItem = {
  plugins: [["plugin-1a", { loose: false }], "plugin-2b"],
  presets: ["preset-1a", "preset-2a"],
  sourceType: "module"
}

BabelConfigMerge(config, newConfigItem);
// 返回
({
  plugins: [
    ["plugin-1a", { loose: true }],
    "plugin-1b",
    ["plugin-1a", { loose: false }],
    "plugin-2b"
  ], // 推入新的 plugins
  presets: [
    "preset-1a",
    "preset-1a",
    "preset-2b"
  ], // 推入新的 presets
  sourceType: "module" // sourceType: "script" 被覆盖
})
```
