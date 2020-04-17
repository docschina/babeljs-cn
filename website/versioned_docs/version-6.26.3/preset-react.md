---
id: version-6.26.3-babel-preset-react
title: babel-preset-react
sidebar_label: react
original_id: babel-preset-react
---

该 preset 包含如下插件/ preset：

- [preset-flow](babel-preset-flow)
- [syntax-jsx](babel-plugin-syntax-jsx)
- [transform-react-jsx](babel-plugin-transform-react-jsx)
- [transform-react-display-name](babel-plugin-transform-react-display-name)

> 也可以查阅：

- [transform-react-constant-elements](transform-react-constant-elements)
- [transform-react-jsx-self](transform-react-jsx-self)
- [transform-react-jsx-source](transform-react-jsx-source)

## 安装

> 你也可以参阅 React [上手页面](https://facebook.github.io/react/docs/hello-world.html)

> 查看更多信息，请查阅 [cli](babel-cli) 的构建页面和[使用](/setup)文档。

安装 CLI 和该 preset

```sh
npm install --save-dev babel-cli babel-preset-react
```

用该 preset 生成一个 .babelrc 配置文件

```sh
echo '{ "presets": ["react"] }' > .babelrc
```

运行如下代码生成一个文件：

```sh
echo '<h1>Hello, world!</h1>' > index.js
```

查看输出

```sh
./node_modules/.bin/babel index.js
```

## 使用方法

### 使用配置文件（推荐）

```json
{
  "presets": ["react"]
}
```

### 通过 CLI 方式

```sh
babel script.js --presets react 
```

### 通过 Node API 方式

```javascript
require("babel-core").transform("code", {
  presets: ["react"]
});
```
