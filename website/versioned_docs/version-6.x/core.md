---
id: version-6.x-babel-core
title: babel-core
sidebar_label: babel-core
original_id: babel-core
---


```javascript
var babel = require("babel-core");
import { transform } from 'babel-core';
import * as babel from 'babel-core';
```

所有的转译都将使用本地配置文件( .babelrc 或者 package.json )。 可以通过查看 [options](#选项) 禁用它。

## babel.transform(code: string, [options?](#选项): Object)

将传入的 `code` 进行转换。返回值为一个对象，参数分别为生成的代码，source map 以及 AST 。

```js
babel.transform(code, options) // => { code, map, ast }
```

**示例**

```js
var result = babel.transform("code();", options);
result.code;
result.map;
result.ast;
```

## babel.transformFile(filename: string, [options?](#选项): Object, callback: Function)

异步转译文件中的全部内容。

```js
babel.transformFile(filename, options, callback)
```

**示例**

```js
babel.transformFile("filename.js", options, function (err, result) {
  result; // => { code, map, ast }
});
```

## babel.transformFileSync(filename: string, [options?](#选项): Object)

`babel.transformFile` 的同步版本。返回值为 `filename` 文件中转译后的代码。

```js
babel.transformFileSync(filename, options) // => { code, map, ast }
```

**示例**

```js
babel.transformFileSync("filename.js", options).code;
```

## babel.transformFromAst(ast: Object, code?: string, [options?](#选项): Object)

给定一个 [AST](https://astexplorer.net/) ，将它进行转换。

```js
const code = "if (true) return;";
const ast = babylon.parse(code, { allowReturnOutsideFunction: true });
const { code, map, ast } = babel.transformFromAst(ast, code, options);
```

## 选项

> #### Babel CLI
> 
> 你可以在 Babel CLI 中使用这些选项，形式如下：
> 
> `babel --name=value`

可以使用的选项列表如下：

| 可选参数                   | 默认值              | 描述                     |
| ------------------------ | -------------------- | ------------------------------- |
| `ast`                    | `true`               | 在返回值对象中包含 AST |
| `auxiliaryCommentAfter`  | `null`               | 在所有非用户编写代码后附加注释。 |
| `auxiliaryCommentBefore` | `null`               | 在所有非用户编写代码前附加注释。 |
| `babelrc`                | `true`               | 指定是否使用 .babelrc 和 babelignore 文件。使用 CLI 工具时不能使用该选项，[请使用 `--no-babelrc` 代替](https://babeljs.cn/docs/usage/cli/#babel-ignoring-babelrc)。 |
| `code`                   | `true`               | 启用代码生成选项。 |
| `comments`               | `true`               | 在生成的代码中添加注释。 |
| `compact`                | `"auto"`             | 不要包含多余的空格符和换行符。设置为 `"auto"` 时，当输入大小 > 500KB 时，compact 会被设置为 `true`。 |
| `env`                    | `{}`                 | 这是表示不同环境的键的对象。例如，当环境变量 `BABEL_ENV` 设置为 `"production"` 时，可以像这样设置 `{ env: { production: { /* specific options */ } } }`。如果 `BABEL_ENV` 未设置，那么 `NODE_ENV` 将被启用，如果 `NODE_ENV` 也未被设置，则默认为 `"development"` 环境。 |
| `extends`                | `null`               | 扩展 `.babelrc` 文件的路径 |
| `filename`               | `"unknown"`          | 在错误信息是使用的文件名等。 |
| `filenameRelative`       | `(filename)`         | 相对于 `sourceRoot` 的文件名。 |
| `generatorOpts`          | `{}`                 | 包含要传递给 babel 代码生成器(babel-generator)的选项对象。|
| `getModuleId`            | `null`               | 指定一个自定义回调来生成模块 ID 。调用方式为 `getModuleId(moduleName)`。如果返回值为 falsy ，则说明生成的模块 ID 被使用。 |
| `highlightCode`          | `true`               | ANSI 错误语法高亮显示。 |
| `ignore`                 | `null`               | 与 `only` 选项相对。如果只指定 `only`，则 `ignore` 则被忽略。|
| `inputSourceMap`         | `null`               | 输出的 source map 将基于该 source map 对象。 |
| `minified`               | `false`              | 保证输出最小化(不输出代码块最后一个分号，输出文字为字符串而不是转义字符串，安全情况下 `new` 后的 `()` 会被去除) |
| `moduleId`               | `null`               | 指定模块 ID 的自定义名称。 |
| `moduleIds`              | `false`              | 如果值为 `true`，为模块添加一个明确的 ID 。默认情况下，所有模块都是匿名的。(不适用于 `common` 模块) |
| `moduleRoot`             | `(sourceRoot)`       | AMD 模块格式化程序的可选前缀，可以被预先添加到模块定义的文件名当中。 |
| `only`                   | `null`               | 可填入一个 [glob](https://github.com/isaacs/minimatch)，正则表达式或者包含前者的混合数组，**只**编译匹配到的路径。也可以是包含明确匹配路径的数组。在尝试编译非匹配的文件时，它将原样返回。|
| `parserOpts`             | `{}`                 | 需要传递给 babel 解析器，babylon 的选项对象 |
| `plugins`                | `[]`                 | 需要加载和使用的[插件](https://babeljs.io/docs/plugins/)列表。 |
| `presets`                | `[]`                 | 需要加载和使用的 [presets](https://babeljs.io/docs/plugins/#presets) (一组插件) 列表。 |
| `retainLines`            | `false`              | 保留行号。这将导致代码变得很古怪，但对于不能使用 source map 的场景来说很方便。(**注意:** 这不会对列进行保留) |
| `resolveModuleSource`    | `null`               | 解析模块入口，例如 `import "SOURCE";` 引入自定义值。具体调用为 `resolveModuleSource(source, filename)` 。|
| `shouldPrintComment`     | `null`               | 一个可选的回调，控制是否需要输出注释。具体调用为 `shouldPrintComment(commentContents)` 。 **注意:** 该选项使用时会覆盖 `comment` 选项。|
| `sourceFileName`         | `(filenameRelative)` | 在返回的 source map 上设置 `sources[0]`。 |
| `sourceMaps`             | `false`              | 如果为 `true` ，添加一个 `map` 属性在输出的返回值中。如果设置为 `"inline"` ，带有 sourceMappingURL 指令的注释被添加到返回代码的底部。如果设置为 `"both"` ，则会返回 `map` 属性并追加 source map 注释。**它不会自己生成 sourcemap 文件！** 要想让 CLI 生成 sourcemap ，你必须给它传递 `--source-maps` 选项。|
| `sourceMapTarget`        | `(filenameRelative)` | 在返回 souremap 时设置 `file`。|
| `sourceRoot`             | `(moduleRoot)`       | 所有 source 都是相对于 root 的。|
| `sourceType`             | `"module"`           | 设置 babel 解析代码的模式。可以设置为 "script" 或 "module" 。|
| `wrapPluginVisitorMethod`| `null`               | 可用于包装访问者模式的可选回调。**注意:** 这对于自我检查这样的事是有必要的，并且不需要实现任何方法。具体调用为 `wrapPluginVisitorMethod(pluginAlias, visitorType, callback)` 。
