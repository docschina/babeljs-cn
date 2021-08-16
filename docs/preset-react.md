---
id: babel-preset-react
title: @babel/preset-react
translators:
  - fikyair
---

这个预设包含以下插件：

- [@babel/plugin-syntax-jsx](plugin-syntax-jsx.md)
- [@babel/plugin-transform-react-jsx](plugin-transform-react-jsx.md)
- [@babel/plugin-transform-react-display-name](plugin-transform-react-display-name.md)

并且有相应的开发配置项：

经典的运行时添加：

- [@babel/plugin-transform-react-jsx-self](plugin-transform-react-jsx-self.md)
- [@babel/plugin-transform-react-jsx-source](plugin-transform-react-jsx-source.md)

当启用开发配置时，自动运行时（自 v7.9.0 起）会自动添加这些插件的功能。
如果您启用了自动运行时，添加 [@babel/plugin-transform-react-jsx-self](plugin-transform-react-jsx-self.md) 或 [@babel/plugin-transform-react-jsx-source](plugin-transform-react-jsx-source.md) 会发生错误。

> 注意: v7 中不再支持 `Flow` 语法。所以，您需要添加 [Flow preset](preset-flow.md) 预设。

## 安装

> 您可以查看 React [Getting Started page](https://facebook.github.io/react/docs/hello-world.html)

```sh
npm install --save-dev @babel/preset-react
```

## 用法

### 通过配置文件（推荐）

带参数：

```json
{
  "presets": ["@babel/preset-react"]
}
```

不带参数：

```json
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "pragma": "dom", // default pragma is React.createElement (only in classic runtime)
        "pragmaFrag": "DomFrag", // default is React.Fragment (only in classic runtime)
        "throwIfNamespace": false, // defaults to true
        "runtime": "classic" // defaults to classic
        // "importSource": "custom-jsx-library" // defaults to react (only in automatic runtime)
      }
    ]
  ]
}
```

### 通过命令行工具（CLI）

```sh
babel --presets @babel/preset-react script.js
```

### 通过 Node API

```javascript
require("@babel/core").transformSync("code", {
  presets: ["@babel/preset-react"],
});
```

## 配置

### 两种不同的运行时

#### `runtime`

`classic | automatic`，默认值为 `classic`

已经添加到了：`v7.9.0`

用于决定使用哪个运行时。

当设置为 `automatic` 表示自动导入 JSX 转换而来的函数。当设置为 `classic` 表示不会自动导入任何东西。

#### `development`

`boolean` 类型，默认值为 `false`。

如果添加了 `__source` 和 `__self`，将可以开启特定于开发环境的一些操作。

当 [env option](options.md#env) 配置和 [js config files](config-files.md#javascript) 一起使用时会很有用。

#### `throwIfNamespace`

`boolean`，默认 `true`。

如果使用 XML 命名空间标记名称，则切换是否抛出错误。
例如：

    <f:image />

虽然 JSX 规范允许这样做，但是默认情况下是被禁止的，因为 React 所实现的 JSX 目前并不支持这种方式。

### React Automatic Runtime

#### importSource

`string` 类型，默认值为 `react`。

已经添加到了：`v7.9.0`

当导入函数时将替换导入源。

### React Classic Runtime

#### `pragma`

`string` 类型，默认值为 `React.createElement`。

当编译 JSX 表达式的时，将替换使用过的函数。

#### `pragmaFrag`

`string` 类型，默认值为 `React.Fragment`。

当编译 JSX fragments 时，将替换使用过的组件。

#### `useBuiltIns`

`boolean` 类型，默认值为 `false`。

将使用原生配置，打包后的文件不使用 polyfill 来进行适配。

#### `useSpread`

`boolean` 类型，默认值为 `false`。

已经添加到了：`v7.7.0`

当传递 props 时，直接使用带有传递元素的内联对象，而不是 Babel 的扩展工具或 `Object.assign`。

### .babelrc.js

```js
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

### .babelrc

> 注意: `env` 参数可能很快就会被弃用

```json
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
