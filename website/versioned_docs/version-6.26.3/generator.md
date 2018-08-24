---
id: version-6.26.3-babel-generator
title: babel-generator
sidebar_label: babel-generator
original_id: babel-generator
---

## 安装

```sh
npm install --save-dev babel-generator
```

## 使用

```js
import {parse} from 'babylon';
import generate from 'babel-generator';

const code = 'class Example {}';
const ast = parse(code);

const output = generate(ast, { /* 选项 */ }, code);
```

## 选项

格式化输出的选项：

选项名                   | 类型     | 默认值         | 描述
-----------------------|----------|-----------------|--------------------------------------------------------------------------
auxiliaryCommentBefore | string   |                 | 可选字符串，在输出文件的开始添加块注释
auxiliaryCommentAfter  | string   |                 | 可选字符串，在输出文件的末尾添加块注释
shouldPrintComment     | function | `opts.comments` | 如果注释需要包含在输出中，该函数则需接受注释（作为字符串）并返回 `true` 。 默认情况下，如果 `opts.commoents` 为 `true` 或者 `opts.minifed` 为 `false` 并且注释中包含 `@preserve` 或 `@license`，则包含注释。
retainLines            | boolean  | `false`         | 尝试在输出的代码中使用与源代码相同的行号(有助于保留栈信息跟踪)
retainFunctionParens   | boolean  | `false`         | 保留函数表达式的上下级 (可用于更改引擎解析行为)
comments               | boolean  | `true`          | 输出中是否包含注释
compact                | boolean or `'auto'` | `opts.minified` | 设置为 `true` 以避免添加用于格式化的空格
minified               | boolean  | `false`         | 输出是否被压缩
concise                | boolean  | `false`         | 设置为 `true` 以减少空格 (但效果不如 `opts.compact` )
quotes                 | `'single'` or `'double'` | 基于 `ast.tokens` 的自动检测 | 输出中对引号的类型进行保留
filename               | string   |                 | 在警告信息中使用
flowCommaSeparator     | boolean  | `false`         | 设置为 `true` 以使用逗号而不是分号作为 Flow 属性的分隔符
jsonCompatibleStrings  | boolean  | `false`         | 设置为 `true`，使用 "json" 运行 `jsesc`：正确的将 "\u00A9" 打印为 "©" ;

source maps 的选项:

选项名                   | 类型     | 默认值         | 描述
-----------------------|----------|-----------------|--------------------------------------------------------------------------
sourceMaps             | boolean  | `false`         | 启用生成 source maps
sourceMapTarget        | string   |                 | source map 会与生成代码的文件名进行关联
sourceRoot             | string   |                 | source map 中所有对应 URLs 的 root
sourceFileName         | string   |                 | 源代码（例如，  `code` 参数中的代码）的文件名。只会在 `code` 为字符串时使用。

## 多个来源构建 AST

在大多数情况下，Babel 会将输入文件与输出文件进行 1:1 转换。然而，你可能正在处理从多个来源构建的 AST - JS 文件，模板等。如果出现这种情况，并且你还希望 source map 为你提供正确的来源，则需要将一个对象作为 `code` 参数传递给 `generate`。其中键应该为源文件名称，值应该为源内容。

这是一个差不多的例子：

```js
import {parse} from 'babylon';
import generate from 'babel-generator';

const a = 'var a = 1;';
const b = 'var b = 2;';
const astA = parse(a, { sourceFilename: 'a.js' });
const astB = parse(b, { sourceFilename: 'b.js' });
const ast = {
  type: 'Program',
  body: [].concat(astA.program.body, astB.program.body)
};

const { code, map } = generate(ast, { sourceMaps: true }, {
  'a.js': a,
  'b.js': b
});

// 在适当情况下，source map 会指向 a.js 和 b.js 。
```
