---
id: index
title: 什么是 Babel？
---

## Babel 是一个 JavaScript compiler

Babel 是一个工具链，主要用于在当前和旧的浏览器或环境中，将 ECMAScript 2015+ 代码转换为 JavaScript 向后兼容版本的代码。以下是 Babel 可以做的主要事情：
- 转换语法
- Polyfill 目标环境中缺少的功能（通过如 [core-js](https://github.com/zloirock/core-js) 的第三方 `polyfill`）
- 源代码转换(codemods)
- 以及更多！（查看 [视频](/videos.html)）

```js
// Babel 输入：ES2015 箭头函数
[1, 2, 3].map((n) => n + 1);

// Babel 输出：ES5 等价语法
[1, 2, 3].map(function(n) {
  return n + 1;
});
```

> 有关编译器的精彩教程，请查看 [the-super-tiny-compiler](https://github.com/thejameskyle/the-super-tiny-compiler)，它还解释了 Babel 本身如何在高层级中运行。

## ES2015 及其后版本

Babel 通过语法转换(syntax transformer)支持最新版本的 JavaScript。

这些 [plugins](plugins.md) 允许你**现在**就使用新语法，而无需等待浏览器的支持。查看我们的 [使用指南](usage.md) 以开始使用。

## JSX 和 React

Babel 可以转换 JSX 语法！查看 [React preset](preset-react.md) 以开始使用。和 [babel-sublime](https://github.com/babel/babel-sublime) 一起使用，可以把语法高亮显示提升到一个全新的水平。

你可以通过以下这个命令安装此 preset

```shell
npm install --save-dev @babel/preset-react
```

并将 `@babel/preset-react` 添加到你的 Babel 配置中。

```jsx
export default React.createClass({
  getInitialState() {
    return { num: this.getRandomNumber() };
  },

  getRandomNumber() {
    return Math.ceil(Math.random() * 6);
  },

  render() {
    return <div>
      Your dice roll:
      {this.state.num}
    </div>;
  }
});
```

> 了解更多关于 [JSX](https://facebook.github.io/jsx/) 的信息。

## 类型注释（Flow 和 TypeScript）

Babel 可以删除类型注释！查看 [Flow preset](preset-flow.md) 或 [TypeScript preset](preset-typescript.md) 以开始使用。请注意 **Babel 不会进行类型检查**；你仍然可以安装 Flow 或者 TypeScript 来使用类型检查。

你可以通过以下这个命令安装 flow preset

```shell
npm install --save-dev @babel/preset-flow
```

```js
// @flow
function square(n: number): number {
  return n * n;
}
```

也可以通过以下这个命令安装 typescript preset

```shell
npm install --save-dev @babel/preset-typescript
```

```js
function Greeter(greeting: string) {
    this.greeting = greeting;
}
```

> 了解更多关于 [Flow](https://flow.org/) 和 [TypeScript](https://www.typescriptlang.org/) 的信息。

可插件化
---------

Babel 是用 plugins 构建的。你可以使用现有 plugins 编写自己的转换管道，或编写自己的 plugins。通过使用或创建一个 [preset](plugins.md#presets) 轻松使用一组插件。[了解更多 →](plugins.md)

直接使用 [astexplorer.net](https://astexplorer.net/#/KJ8AjD6maa) 创建插件，或者使用 [generator-babel-plugin](https://github.com/babel/generator-babel-plugin) 生成一个插件模板。

```javascript
// plugin 仅仅是一个函数
export default function ({types: t}) {
  return {
    visitor: {
      Identifier(path) {
        let name = path.node.name; // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name.split('').reverse().join('');
      }
    }
  };
}
```

可调试
----------

支持 **Source map**，因此你可以轻松调试编译过的代码。

规范性
--------

Babel 试图尽可能地遵循 ECMAScript 标准。作为性能的折衷方案，它可能还具有一些特定的选项，使其更符合规范。

可压缩
--------

Babel 尝试使用尽可能少的代码而不依赖于庞大的运行时环境。

有些情况可能很难达到，因此为了保证可读性、文件大小以及（运行）速度，会针对特定转换牺牲一些合规性，即提供 "loose" 选项。
