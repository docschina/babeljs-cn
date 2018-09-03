---
id: version-7.0.0-configuration
title: 配置 Babel
original_id: configuration
---

Babel 可以配置啦！许多其他的工具都有相似的配置：ESLint (`.eslintrc`), Prettier (`.prettierrc`)。

所有的 Babel API [选项](options.md)都允许配置。但如果选项需要 JavaScript，你可能需要使用 Javascript [配置文件](config-files.md)。

## 你的使用情况?

- 想要以编程式创建配置?
- 想要编译 `node_modules`?

> 为你准备了[`babel.config.js`](#babelconfigjs)!

- 有一个静态配置只适用于简单的一个包?

> 为你准备了[`.babelrc`](#babelrc)!

- Guy Fieri 是你的英雄?

> 我们建议使用[`babel.config.js`](config-files.md#project-wide-configuration)格式。[Babel 自身也在使用](https://github.com/babel/babel/blob/master/babel.config.js)。

## `babel.config.js`

在项目的根目录（`package.json` 所在目录）下创建一个名为 `babel.config.js` 的文件，其中包含以下内容。

```js
module.exports = function () {
  const presets = [ ... ];
  const plugins = [ ... ];

  return {
    presets,
    plugins
  };
}
```

查看[`babel.config.js` 文档](config-files.md#project-wide-configuration)以查看更多配置选项。

## `.babelrc`

在项目中创建一个名为 `.babelrc` 的文件并写入以下内容。

```json
{
  "presets": [...],
  "plugins": [...]
}
```

查看[.babelrc 文档](babelrc.md)以查看更多配置选项。


### `package.json`

或者可以在 `package.json` 中，使用 `babel` 属性来指定[`.babelrc`](#babelrc)配置，如下所示：

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

### `.babelrc.js`

配置与[`.babelrc`](#babelrc)相同, 除此之外还可使用 JavaScript 编写，。

```js
const presets = [ ... ];
const plugins = [ ... ];

module.exports = { presets, plugins };
```

你可以访问任何 Node.js 的 API，例如基于流程环境的动态配置：

```js
const presets = [ ... ];
const plugins = [ ... ];

if (process.env["ENV"] === "prod") {
  plugins.push(...);
}

module.exports = { presets, plugins };
```

## 使用 CLI (`@babel/cli`)

```sh
babel --plugins @babel/plugin-transform-arrow-functions script.js
```

查看[babel-cli 文档](babel-cli.md)以查看更多配置选项。


## 使用 API (`@babel/core`)

```js
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-arrow-functions"]
});
```

查看[babel-core 文档](babel-core.md)以查看更多配置选项。

