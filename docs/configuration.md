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

## Using the CLI (`@babel/cli`)

```sh
babel --plugins @babel/plugin-transform-arrow-functions script.js
```

Check out the [babel-cli documentation](cli.md) to see more configuration options.

## Using the API (`@babel/core`)

```js
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-arrow-functions"]
});
```

Check out the [babel-core documentation](core.md) to see more configuration options.

## Print effective configs

You can tell Babel to print effective configs on a given input path
```sh
# *nix or WSL
BABEL_SHOW_CONFIG_FOR=./src/myComponent.jsx npm start
```

```powershell
$env:BABEL_SHOW_CONFIG_FOR = ".\src\myComponent.jsx"; npm start
```

`BABEL_SHOW_CONFIG_FOR` accepts both absolute and relative _file_ paths. If it is a relative path, it will be resolved from [`cwd`](options.md#cwd).

Once Babel processes the input file specified by `BABEL_SHOW_CONFIG_FOR`, Babel will print effective configs to the console. Here is an example output:

```
Babel configs on "/path/to/cwd/src/index.js" (ascending priority):
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

programmatic options from @babel/cli
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

Babel will print effective config sources ordered by ascending priority. Using the example above, the priority is:

```
babel.config.json < .babelrc < programmatic options from @babel/cli
```
In other words, `babel.config.json` is overwritten by `.babelrc`, and `.babelrc` is overwritten by programmatic options.

For each config source, Babel prints applicable config items (e.g. [`overrides`](options.md#overrides) and [`.env`](options.md#env)) in the order of ascending priority. Generally each config sources has at least one config item -- the root content of configs. If you have configured `overrides` or `env`, Babel will not print them in the root, but will instead output a separate config item titled as `.overrides[index]`, where `index` is the position of the item. This helps determine whether the item is effective on the input and which configs it will override.

If your input is ignored by `ignore` or `only`, Babel will print that this file is ignored.

### How Babel merges config items

For each config items mentioned above, Babel applies `Object.assign` on options except for `plugins` and `presets`, which is concatenated by `Array#concat`. For example
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
// returns
({
  plugins: [
    ["plugin-1a", { loose: true }],
    "plugin-1b",
    ["plugin-1a", { loose: false }],
    "plugin-2b"
  ], // new plugins are pushed
  presets: [
    "preset-1a",
    "preset-1a",
    "preset-2b"
  ], // new presets are pushed
  sourceType: "module" // sourceType: "script" is overwritten
})
```
