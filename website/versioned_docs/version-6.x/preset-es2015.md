---
id: version-6.x-babel-preset-es2015
title: babel-preset-es2015
sidebar_label: es2015
original_id: babel-preset-es2015
---

> 该 preset 不推荐使用。如果你想保持最新，请使用 [env preset](babel-preset-env)

该 preset 包含如下插件：

- [check-es2015-constants](babel-plugin-check-es2015-constants)
- [transform-es2015-arrow-functions](babel-plugin-transform-es2015-arrow-functions)
- [transform-es2015-block-scoped-functions](babel-plugin-transform-es2015-block-scoped-functions)
- [transform-es2015-block-scoping](babel-plugin-transform-es2015-block-scoping)
- [transform-es2015-classes](babel-plugin-transform-es2015-classes)
- [transform-es2015-computed-properties](babel-plugin-transform-es2015-computed-properties)
- [transform-es2015-destructuring](babel-plugin-transform-es2015-destructuring)
- [transform-es2015-duplicate-keys](babel-plugin-transform-es2015-duplicate-keys) 
- [transform-es2015-for-of](babel-plugin-transform-es2015-for-of)
- [transform-es2015-function-name](babel-plugin-transform-es2015-function-name)
- [transform-es2015-literals](babel-plugin-transform-es2015-literals)
- [transform-es2015-modules-commonjs](babel-plugin-transform-es2015-modules-commonjs)
- [transform-es2015-object-super](babel-plugin-transform-es2015-object-super)
- [transform-es2015-parameters](babel-plugin-transform-es2015-parameters)
- [transform-es2015-shorthand-properties](babel-plugin-transform-es2015-shorthand-properties)
- [transform-es2015-spread](babel-plugin-transform-es2015-spread)
- [transform-es2015-sticky-regex](babel-plugin-transform-es2015-sticky-regex)
- [transform-es2015-template-literals](babel-plugin-transform-es2015-template-literals)
- [transform-es2015-typeof-symbol](babel-plugin-transform-es2015-typeof-symbol)
- [transform-es2015-unicode-regex](babel-plugin-transform-es2015-unicode-regex)
- [transform-regenerator](babel-plugin-transform-regenerator)

## 安装

```sh
npm install --save-dev babel-preset-es2015
```

## 使用

### 通过 `.babelrc` (推荐)

**.babelrc**

```json
{
  "presets": ["es2015"]
}
```

### 通过 CLI

```sh
babel script.js --presets es2015
```

### 通过 Node API

```javascript
require("babel-core").transform("code", {
  presets: ["es2015"]
});
```

## 选项

### `loose`

`boolean`, 默认 `false`.

为该预设中允许它们的任何插件启用 "loose" 转换。

### `modules`

`"amd" | "umd" | "systemjs" | "commonjs" | false`, 默认 `"commonjs"`.

启用将 es6 模块语法转换为另一个模块类型。

将其设置为 `false` 将不会转换任何模块。

### `spec`

`boolean`, 默认 `false`。

为该预设中允许它们的任何插件启用 "spec" 转换。

## 基本设置（使用 CLI）

> 有关详细信息，请查阅 [babel-cli](babel-cli) 文档。

安装 CLI 和该 preset

```sh
npm install --save-dev babel-cli babel-preset-es2015
```

为该 preset 创建一个 .babelrc 配置文件

```sh
echo '{ "presets": ["es2015"] }' > .babelrc
```

创建要运行的文件

```sh
echo 'const a = 1;' > index.js
```

运行

```sh
./node_modules/.bin/babel-node index.js
```
