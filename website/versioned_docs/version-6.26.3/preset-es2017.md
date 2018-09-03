---
id: version-6.26.3-babel-preset-es2017
title: babel-preset-es2017
sidebar_label: es2017
original_id: babel-preset-es2017
---

> 该 preset 不推荐使用。如果你想保持最新，请使用 [env preset](babel-preset-env)

该 preset 包含如下插件：

- [syntax-trailing-function-commas](babel-plugin-syntax-trailing-function-commas)
- [transform-async-to-generator](babel-plugin-transform-async-to-generator)

## 安装

```sh
npm install --save-dev babel-preset-es2017
```

## 使用

### 通过 `.babelrc` (推荐)

**.babelrc**

```json
{
  "presets": ["es2017"]
}
```

### 通过 CLI

```sh
babel script.js --presets es2017
```

### 通过 Node API

```javascript
require("babel-core").transform("code", {
  presets: ["es2017"]
});
```

## 基本设置（使用 CLI）

> 有关详细信息，请查阅 [babel-cli](babel-cli) 文档。

安装 CLI 和该 preset

```sh
npm install --save-dev babel-cli babel-preset-es2017
```

为该 preset 创建一个 .babelrc 配置文件

```sh
echo '{ "presets": ["es2017"] }' > .babelrc
```

创建要运行的文件

```sh
echo 'async function a() {}' > index.js
```

运行

```sh
./node_modules/.bin/babel-node index.js
```
