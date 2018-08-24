---
id: version-6.26.3-babel-cli
title: babel-cli
sidebar_label: babel-cli
original_id: babel-cli
---

Babel 附带一个内置的 CLI，可用于从命令行编译文件。此外，各种入口的脚本命令都位于 `babel-cli/bin` 的顶级包中。

有一些 shell 可执行的实用程序脚本，`babel-external-helpers.js` 和 `babel-node.js`，以及主要的 Babel cli 脚本命令，`babel.js`。

## 安装

虽然你 _可以_ 在你的机器上全局安装 Babel CLI, 但根据单个项目进行**本地**安装会更好一些。

这样做有两个主要的原因：

1. 同一机器上的不同的项目可以依赖不同版本的 Babel, 这允许你一次更新一个项目。
2. 这意味着在你的工作环境中没有隐含的依赖项。它将使你的项目更方便移植、更易于安装。

我们可以通过以下命令本地安装 Babel CLI：

```sh
npm install --save-dev babel-cli
```

> **注意：** 如果你项目中不包含 `package.json`，在安装之前请新建一个。这可以保证 `npx` 命令能够正常运行。

在完成安装之后，你的 `package.json` 文件应该包喊如下内容：

```diff
{
  "devDependencies": {
+   "babel-cli": "^6.0.0"
  }
}
```

## 基本用法 

```sh
babel script.js
```

## babel

> **注意：** 以下操作采用了出色的 [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) 命令来运行本地安装的可执行文件。你可以将其设置于 [npm run script](https://docs.npmjs.com/cli/run-script) 也可以使用相对路径执行。`./node_modules/.bin/babel`

### 编译文件

编译 `script.js` 并 **输出到 stdout**.

```sh
npx babel script.js
# output...
```

如果你想**输出编译结果到单个文件**，你可以使用 `--out-file` 或  `-o`。

```sh
npx babel script.js --out-file script-compiled.js
```

想要在**每一次修改文件后**编译文件，请使用 `--watch` 或 `-w` 选项：

```sh
npx babel script.js --watch --out-file script-compiled.js
```

### 使用 Source Maps 编译

如果你想添加一个 **source map 文件** 你可以用 `--source-maps` 或者 `-s`。[了解更多关于 source maps 的信息](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)

```sh
npx babel script.js --out-file script-compiled.js --source-maps
```

如果你想使用 **内联的 source maps**，你可以使用 `--source-maps inline`。

```sh
npx babel script.js --out-file script-compiled.js --source-maps inline
```

### 编译目录

编译整个 `src` 目录并将其输出到 `lib` 目录。你可以使用 `--out-dir` 或 `-d`。这不会覆盖 `lib` 中的任何其他文件或目录。

```sh
npx babel src --out-dir lib
```

编译整个 `src ` 目录并将其输出到单个文件中。

```sh
npx babel src --out-file script-compiled.js
```

### 忽略文件

忽略 spec 和 test 文件

```sh
npx babel src --out-dir lib --ignore spec.js,test.js
```

### 复制文件

复制不需要编译的文件

```sh
npx babel src --out-dir lib --copy-files
```

### 传输文件

通过标准输入传入一个文件并输出到 `script-compiled.js`

```sh
npx babel --out-file script-compiled.js < script.js
```

### 使用插件

使用 `--plugins` 选项来指定编译中要使用的插件

```sh
npx babel script.js --out-file script-compiled.js --plugins=transform-runtime,transform-es2015-modules-amd
```

### 使用 Presets

使用 `--presets` 选项指定编译中要使用的插件

```sh
npx babel script.js --out-file script-compiled.js --presets=es2015,react
```

### 忽略 .babelrc 文件

忽略项目中 .babelrc 文件的配置并使用 cli 选项，例如，为一个自定义的构建

```sh
npx babel --no-babelrc script.js --out-file script-compiled.js --presets=es2015,react
```

### 高级用法

在 babel CLI 中还有更多选项可用，请参阅 [options](babel-core#options)，`babel --help` 以及其他章节了解更多信息。

## babel-node

> #### 不建议在生产环境下使用
>
> 你不应该在生产环境中使用 `babel-node` 。编译中的缓存数据存储在内存中，会造成不必要的内存占用过高。而整个应用程序需要即时编译，你会一直面临应用启动的性能问题。
>
> 请查阅 [Node.js 服务器中使用 Babel 的示例](https://github.com/babel/example-node-server) 了解如何在生产部署中使用 Babel 。

> #### ES6 风格的模块加载无法正常工作
>
> 由于技术上的限制，`babel-node REPL` 中不完全支持 ES6 风格的模块加载。

babel 提供了第二个 CLI，其功能与 Node.js 的 CLI 完全相同，只是它会在运行之前编译 ES6 代码。

启动 REPL (Read-Eval-Print-Loop)。

```sh
npx babel-node
```

评估代码。

```sh
npx babel-node -e "class Test { }"
```

编译并运行 `test.js`。

```sh
npx babel-node test
```

> **提示**：使用 `rlwrap` 获取具有输入历史记录的 REPL
>
> ```sh
> npx rlwrap babel-node
> ```
>
> 在某些平台（如 OSX）上， `rlwrap` 可能需要额外的参数才能正常工作，例如：
>
> ```sh
> NODE_NO_READLINE=1 npx rlwrap --always-readline babel-node
> ```

### 用法

```sh
babel-node [options] [ -e script | script.js ] [arguments]
```

当用户脚本的参数名称与 node 中的原生参数选项冲突时，可以在脚本名称之前加两个连接号来避免歧义

```sh
npx babel-node --debug --presets es2015 -- script.js --debug
```

### 选项

| 选项                   | 默认              | 描述                     |
| ------------------------ | -------------------- | ------------------------------- |
| `-e, --eval [script]`    |                      | 评估脚本                 |
| `-p, --print`            |                      | 评估脚本并且打印结果 |
| `-i, --ignore [regex]`   | `node_modules`       | 在使用 require 钩子时，忽略与此正则表达式匹配的所有文件 |
| `-x, --extensions`       | `".js",".jsx",".es6",".es"` | 可识别的拓展名列表 |
| `--presets`                | `[]`                 | 加载和使用以逗号分隔的 [presets](plugins.md#presets) （一组插件）。 |
| `--plugins`                | `[]`                 | 加载和使用以逗号分隔的[插件](plugins.md)列表。
