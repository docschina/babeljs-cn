---
id: version-6.26.3-babel-preset-latest
title: babel-preset-latest
sidebar_label: latest
original_id: babel-preset-latest
---

> 该 preset 不推荐使用；请使用 [env preset](babel-preset-env) 替代。

这是一个特殊的 preset，将包含所有年度的 preset，因此无需用户单独指定年度预设。

该 preset 包含如下插件:

- [es2017](babel-preset-es2017)
- [es2016](babel-preset-es2016)
- [es2015](babel-preset-es2015)

## 安装

```sh
npm install --save-dev babel-preset-latest
```

## 使用

### 通过 `.babelrc` (推荐)

**.babelrc**

```json
{
  "presets": ["latest"]
}
```

### 通过 CLI

```sh
babel script.js --presets latest
```

### 通过 Node API

```javascript
require("babel-core").transform("code", {
  presets: ["latest"]
});
```

### 选项

### `es2015`

`boolean`，默认为 `true`。

可以切换来自 [es2015 preset](babel-preset-es2015) 的插件。

```json
{
  "presets": [
    ["latest", {
      "es2015": false
    }]
  ]
}
```

你也可以传递选项到 `es2015` preset 中。

```json
{
  "presets": [
    ["latest", {
      "es2015": {
        "modules": false
      }
    }]
  ]
}
```

**注意:** 这也适用于以下其他 preset-year 的选项。

### `es2016`

`boolean`，默认为 `true`。

可以切换来自 [es2016 preset](babel-preset-es2016) 的插件。

### `es2017`

`boolean`，默认为 `true`。

可以切换来自 [es2017 preset](babel-preset-es2017) 的插件。
