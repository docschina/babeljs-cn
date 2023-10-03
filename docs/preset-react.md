---
id: babel-preset-react
title: "@babel/preset-react"
---

这个预设包含以下插件：

- [@babel/plugin-syntax-jsx](plugin-syntax-jsx.md)
- [@babel/plugin-transform-react-jsx](plugin-transform-react-jsx.md)
- [@babel/plugin-transform-react-display-name](plugin-transform-react-display-name.md)

并且有相应的开发配置项：

添加经典的运行时：

- [@babel/plugin-transform-react-jsx-self](plugin-transform-react-jsx-self.md)
- [@babel/plugin-transform-react-jsx-source](plugin-transform-react-jsx-source.md)

当启用 `development` 配置时，自动运行时（自 v7.9.0 起）会自动添加这些插件的功能。如果你已经启用了自动运行时，再添加 [@babel/plugin-transform-react-jsx-self](plugin-transform-react-jsx-self.md) 或 [@babel/plugin-transform-react-jsx-source](plugin-transform-react-jsx-source.md) 会发生错误。

> 注意: v7 中不再支持 `Flow` 语法。因此，你需要添加 [Flow preset](preset-flow.md) 预设。

## 安装

> 您可以查看 React [开始页面](https://facebook.github.io/react/docs/hello-world.html)

```shell npm2yarn
npm install --save-dev @babel/preset-react
```

## 用法

### 通过配置文件使用（推荐）

不带参数：

```json title="babel.config.json"
{
  "presets": ["@babel/preset-react"]
}
```

带参数：

:::babel8

```json title="babel.config.json"
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic", // defaults to automatic
        "importSource": "custom-jsx-library", // defaults to react(only in automatic runtime)
        "throwIfNamespace": false // defaults to true
        // "pragma": "dom", // default pragma is React.createElement (only in classic runtime)
        // "pragmaFrag": "DomFrag", // default is React.Fragment (only in classic runtime)
      }
    ]
  ]
}
```

:::

:::babel7

```json title="babel.config.json"
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "pragma": "dom", // 默认是 React.createElement（仅在经典的运行时中）
        "pragmaFrag": "DomFrag", // 默认是 React.Fragment（仅在经典的运行时中）
        "throwIfNamespace": false, // 默认是 true
        "runtime": "classic" // 默认是 classic
        // "importSource": "custom-jsx-library" // 默认是 react（仅在经典的运行时中）
      }
    ]
  ]
}
```

<<<<<<< HEAD
### 通过命令行工具使用（CLI）
=======
:::

### Via CLI
>>>>>>> 2029e835a20be6a7931d99ee0b920ef7b1f4e2ab

```sh title="Shell"
babel --presets @babel/preset-react script.js
```

### 通过 Node API 使用

```js title="JavaScript"
require("@babel/core").transformSync("code", {
  presets: ["@babel/preset-react"],
});
```

## 配置

### 两种不同的运行时

#### `runtime`

<<<<<<< HEAD
`classic | automatic`，默认值为 `classic`

已经添加到了：`v7.9.0`

用于决定使用哪个运行时。
=======
:::babel8

`classic | automatic`, defaults to `automatic`

:::

:::babel7

`classic | automatic`, defaults to `classic`

:::

Added in: `v7.9.0`

:::babel7

> Note: The default runtime will be switched to `automatic` in Babel 8.

:::

Decides which runtime to use.
>>>>>>> 2029e835a20be6a7931d99ee0b920ef7b1f4e2ab

`automatic` 表示自动导入 JSX 转换而来的函数。 `classic` 表示不会自动导入任何东西。

#### `development`

`boolean` 类型，默认值为 `false`。

如果添加了 `__source` 和 `__self`，将可以开启特定于开发环境的一些操作。

当与 [env option](options.md#env) 配置或者与 [js config files](config-files.md#javascript) 一起使用时会很有用。

#### `throwIfNamespace`

`boolean`，默认 `true`。

选择是否在 XML 命名空间标签名称被使用时抛出错误。例如：

    <f:image />

虽然 JSX 规范允许这样做，但是默认情况下是被禁止的，因为 React 所实现的 JSX 目前并不支持这种方式。

#### `pure`

`boolean`，默认为 `true`。

开启 `@babel/plugin-transform-react-pure-annotations`。它将把顶层的 React 方法调用标记为 pure，用于树状摇动。

### React 自动运行时

#### importSource

`string` 类型，默认值为 `react`。

已经添加到了：`v7.9.0`

在导入函数时替换导入源。

### React Classic Runtime

#### `pragma`

`string` 类型，默认值为 `React.createElement`。

Replace the function used when compiling JSX expressions. It should be a qualified name (e.g. `React.createElement`) or an identifier (e.g. `createElement`).

#### `pragmaFrag`

`string` 类型，默认值为 `React.Fragment`。

Replace the component used when compiling JSX fragments. It should be a valid JSX tag name.

:::babel7

#### `useBuiltIns`

`boolean` 类型，默认值为 `false`。

<<<<<<< HEAD
将使用原生配置，打包后的文件不使用 polyfill 来进行适配。
=======
:::warning
This option will be removed in Babel 8. Set `useBuiltIns` to `true` if you are targeting to modern browsers.
:::

Will use the native built-in instead of trying to polyfill behavior for any plugins that require one.
>>>>>>> 2029e835a20be6a7931d99ee0b920ef7b1f4e2ab

#### `useSpread`

`boolean` 类型，默认值为 `false`。

已经添加到了：`v7.7.0`

<<<<<<< HEAD
当传递 props 时，直接使用带有传递元素的内联对象，而不是 Babel 的扩展工具或 `Object.assign`。
=======
:::warning
This option will be removed in Babel 8. Set `useSpread` to `true` if you are targeting to modern browsers.
:::

When spreading props, use inline object with spread elements directly instead of Babel's extend helper or `Object.assign`.
>>>>>>> 2029e835a20be6a7931d99ee0b920ef7b1f4e2ab

:::

### babel.config.js

```js title="babel.config.js"
module.exports = {
  presets: [
    [
      "@babel/preset-react",
      {
        development: process.env.BABEL_ENV === "development",
      },
    ],
  ],
};
```

### babel.config.json

> 注意: `env` 参数可能很快就会被弃用

```json title="babel.config.json"
{
  "presets": ["@babel/preset-react"],
  "env": {
    "development": {
      "presets": [["@babel/preset-react", { "development": true }]]
    }
  }
}
```

> 您可以 [此处](https://babeljs.io/docs/en/presets#preset-options) 阅读有关配置预设参数的更多信息。
