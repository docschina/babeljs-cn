---
id: index
title: 什么是 Babel ?
---

## Babel 是一个 JavaScript 编译器

Babel 是一个工具链，主要用于在旧的浏览器或环境中将 ECMAScript 2015+ 代码转换为向后兼容版本的 JavaScript 代码：
- 转换语法
- Polyfill 实现目标环境中缺少的功能 (通过 [@babel/polyfill](polyfill.md))
- 源代码转换 (codemods)
- 更多！（查看[视频](/videos.html)）

```js
// Babel Input: ES2015 arrow function
[1, 2, 3].map((n) => n + 1);

// Babel Output: ES5 equivalent
[1, 2, 3].map(function(n) {
  return n + 1;
});
```

> 有关编译器的精彩教程，请查看[超级微型编译器](https://github.com/thejameskyle/the-super-tiny-compiler)，它还解释了 Babel 本身如何在高级语言上工作。

## ES2015 及其他

Babel 通过语法变换器支持最新版本的 JavaScript。

这些 [plugins](plugins.md) 允许你现在就使用新语法，而无需等待浏览器的支持。查看我们的[使用指南](usage.md)以开始使用。

## JSX 和 React

Babel 可以转换 JSX 语法！查看 [React preset](preset-react.md) 以开始使用。和[babel-sublime](https://github.com/babel/babel-sublime) 一起使用可以把语法高亮显示提升到一个全新的水平。

你可以通过以下这个命令安装该 preset

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

Babel 可以删除类型注释！查看 [Flow preset](preset-flow.md) 或 [TypeScript preset](preset-typescript.md) 以开始使用。Babel 本身没有进行类型检查，只是结合这些使用。

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

> 了解更多关于 [Flow](http://flowtype.org/) 和 [TypeScript](https://www.typescriptlang.org/) 的信息。

可插拔
---------

Babel 是用插件构建的。你可以使用现有插件编写自己的转换管道或编写自己的插件。通过使用或创建 [preset](plugins.md#presets) 轻松使用一组插件。[了解更多 →](plugins.md)

使用 [astexplorer.net](https://astexplorer.net/#/KJ8AjD6maa) 动态创建插件或使用 [generator-babel-plugin](https://github.com/babel/generator-babel-plugin) 生成插件模板。

```javascript
// A plugin is just a function
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

支持 **Source map** ，因此你可以轻松调试编译过的代码。

规范性
--------

Babel 试图尽可能地遵循 ECMAScript 标准。为了平衡性能，它也可能有特定的一些选项，以便可以更符合规范。

压缩性
--------

Babel 尝试使用尽可能少的代码而不依赖于庞大的运行时环境。

有些情况可能很难达到，因此为了保证可读性、文件大小以及（运行）速度，会针对特定转换牺牲一些合规性，即提供 "loose" 选项。
