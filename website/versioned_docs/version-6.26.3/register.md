---
id: version-6.26.3-babel-register
title: babel-register
sidebar_label: babel-register
original_id: babel-register
---

一个使用 Babel 的方法是通过 require 钩子。 require 钩子会将自己绑定到 node 的 `require` 上并自动编译文件。这等同于 CoffeeScript 中的 [coffee-script/register](http://coffeescript.org/v2/annotated-source/register.html)。

## 安装

```sh
npm install babel-register --save-dev
```

## 用法

```js
require("babel-register");
```

通过 node 引入的带 `.es6`, `.es`, `.jsx`
和 `.js` 后缀的所有后续文件都将会被 Babel 转译。

> #### 不包含 polyfill
> 
> 当你使用依赖 polyfill 的特性、比如生成器，你必须单独的引入 [polyfill](babel-polyfill) 。

### 默认忽略 `node_modules`

**注意：** 默认情况下，所有指向 `node_modules` 的 require 都会被忽略。你可以通过传递一个忽略正则表达式来覆盖它：

```js
require("babel-register")({
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  ignore: false
});
```

## 指定选项

```javascript
require("babel-register")({
  // Optional ignore regex - if any filenames **do** match this regex then they
  // aren't compiled.
  ignore: /regex/,

  // Ignore can also be specified as a function.
  ignore: function(filename) {
    if (filename === "/path/to/es6-file.js") {
      return false;
    } else {
      return true;
    }
  },

  // Optional only regex - if any filenames **don't** match this regex then they
  // aren't compiled
  only: /my_es6_folder/,

  // Setting this will remove the currently hooked extensions of .es6, `.es`, `.jsx`
  // and .js so you'll have to add them back if you want them to be used again.
  extensions: [".es6", ".es", ".jsx", ".js"],

  // Setting this to false will disable the cache.
  cache: true
});
```

你也可以传递所有其他的 [选项](babel-core#options)，包括  `plugins` 和 `presets`。但是注意，每个文件最接近的 [`.babelrc`](babelrc) 仍然有效，并且优先于你在此处传入的任何选项。

## 环境变量

默认情况下，`babel-node` 和 `babel-register` 会在你的临时目录下保存一个 json cache。

这将大大提高您的文件启动和编译。 但是会一些情况下您想要更改此行为，并且有环境变量暴露出来允许您执行此操作。

### BABEL_CACHE_PATH

指定一个不同的 cache 位置。

```sh
BABEL_CACHE_PATH=/foo/my-cache.json babel-node script.js
```

### BABEL_DISABLE_CACHE

禁用 cache。

```sh
BABEL_DISABLE_CACHE=1 babel-node script.js
```
