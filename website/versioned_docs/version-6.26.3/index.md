---
id: version-6.26.3-index
title: 什么是 Babel ？
original_id: index
---

## Babel 是一款 JavaScript 编译器

Babel 是一个工具链，主要用于在旧的浏览器或环境中将 ECMAScript 2015+ 代码转换为向后兼容版本的 JavaScript 代码。

## Library 的基本设置  

> 安装 Babel 命令行工具（`babel-cli`）以及一种 Babel preset

```shell
npm install --save-dev babel-cli babel-preset-env
```

> 创建一个 [`.babelrc`](babelrc.md) 文件（或者使用你的 [package.json](babelrc.md#use-via-packagejson) 文件)

```json
{ "presets": ["env"] }
```

> 运行 src 中的文件并输出到文件夹中

```sh
./node_modules/.bin/babel src --out-dir lib
```

> 有关如何使用构建系统，IDE等设置 Babel 的更多信息，请查阅我们[交互设置指南](/setup.html)。

ES2015 及以后版本
-----------------

Babel 通过语法转换器来支持最新版本的 JavaScript 。这些[插件](plugins.md)允许你**立刻**使用新语法，而无需等待浏览器支持。查阅我们的 [env preset](preset-env.md) 立即开始使用。

preset 安装命令如下所示:

```shell
npm install --save-dev babel-preset-env
```

并在你的 `.babelrc` 文件中添加 `"env"` 选项： `{ "presets": ["env"] }`

[了解有关 ES2015 的更多信息 →](learn.md)

Polyfill
--------

由于 Babel 只进行语法转换（如箭头函数），你可以使用 babel-polyfill 来支持新的全局变量，如 Promise 或新的原生方法，如 String.padStart（left-pad）。它使用了 [core-js](https://github.com/zloirock/core-js) 和 [regenerator](https://facebook.github.io/regenerator/) 。查阅我们的 [babel-polyfill](/docs/usage/polyfill) 文档以获取更多信息。

你可以通过以下命令安装 polyfill

```shell
npm install --save-dev babel-polyfill
```

通过在应用程序的入口起点顶部或在 bundler 配置中添加它来使用它。

[了解更多功能 →](https://github.com/zloirock/core-js#index)

JSX 和 Flow
------------

Babel 可以转换 JSX 语法并去掉类型注释。查阅我们的 [React preset](preset-react.md) 即可开始使用。与 [babel-sublime](https://github.com/babel/babel-sublime) 同时使用将语法高亮提高到一个全新的层次。

你可以通过以下这个命令安装该 preset

```shell
npm install --save-dev babel-preset-react
```

并在 `.babelrc` 文件中添加 `"react"` 选项：`{ "presets": ["env", "react"] }`

```jsx
export default React.createClass({
  getInitialState() {
    return { num: this.getRandomNumber() };
  },

  getRandomNumber(): number {
    return Math.ceil(Math.random() * 6);
  },

  render(): any {
    return <div>
      Your dice roll:
      {this.state.num}
    </div>;
  }
});
```

> 了解更多关于 [JSX](https://facebook.github.io/jsx/) 和 [Flow](http://flowtype.org/) 的信息。

可定制
---------

Babel 是用插件构建的。使用现有插件编写自己的转换管道或编写自己的插件。通过使用或创建 [preset](plugins.md#presets) 轻松使用一组插件。[学习更多 →](plugins.md)

使用 [astexplorer.net](https://astexplorer.net/#/KJ8AjD6maa) 动态创建插件或使用 [generator-babel-plugin](https://github.com/babel/generator-babel-plugin) 生成插件模板。

```javascript
// 插件只是一个函数
export default function ({types: t}) {
  return {
    visitor: {
      Identifier(path) {
        let name = path.node.name; // 反转 name 变量: JavaScript -> tpircSavaJ
        path.node.name = name.split('').reverse().join('');
      }
    }
  };
}
```

可调试
----------

支持 **Source map** ，因此你可以轻松调试编译过的代码。

规范性
--------

Babel 试图尽可能地遵循 ECMAScript 标准。为了平衡性能，它也可能有特定的一些选项，以便可以更符合规范。

压缩性
--------

Babel 尝试使用尽可能少的代码而不依赖于庞大的运行时环境。

有些情况可能很难达到，因此为了保证可读性、文件大小以及（运行）速度，会针对特定转换牺牲一些合规性，即提供 “loose” 选项。
