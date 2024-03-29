---
id: index
title: 什么是 Babel？
---

## Babel 是一个 JavaScript compiler

Babel 是一个工具链，主要用于在当前和旧的浏览器或环境中，将 ECMAScript 2015+ 代码转换为 JavaScript 向后兼容版本的代码。以下是 Babel 可以做的主要事情：

- Transform syntax
- Polyfill features that are missing in your target environment (through a third-party polyfill such as [core-js](https://github.com/zloirock/core-js))
- Source code transformations (codemods)
- And more! (check out these [videos](/videos) for inspiration)

```js title="JavaScript"
// Babel Input: ES2015 arrow function
[1, 2, 3].map(n => n + 1);

// Babel 输出：ES5 等价语法
[1, 2, 3].map(function(n) {
  return n + 1;
});
```

:::tip
For an awesome tutorial on compilers, check out [the-super-tiny-compiler](https://github.com/thejameskyle/the-super-tiny-compiler), which also explains how Babel itself works on a high level.
:::

## ES2015 及其后版本

Babel 通过语法转换(syntax transformer)支持最新版本的 JavaScript。

这些 [plugins](plugins.md) 允许你**现在**就使用新语法，而无需等待浏览器的支持。查看我们的 [使用指南](usage.md) 以开始使用。

## JSX 和 React

Babel 可以转换 JSX 语法！查看 [React preset](preset-react.md) 以开始使用。和 [babel-sublime](https://github.com/babel/babel-sublime) 一起使用，可以把语法高亮显示提升到一个全新的水平。

你可以通过以下这个命令安装此 preset

```shell npm2yarn
npm install --save-dev @babel/preset-react
```

并将 `@babel/preset-react` 添加到你的 Babel 配置中。

```jsx title="JSX"
export default function DiceRoll(){
  const getRandomNumber = () => {
    return Math.ceil(Math.random() * 6);
  };

  const [num, setNum] = useState(getRandomNumber());

  const handleClick = () => {
    const newNum = getRandomNumber();
    setNum(newNum);
  };

  return (
    <div>
      Your dice roll: {num}.
      <button onClick={handleClick}>Click to get a new number</button>
    </div>
  );
};
```

:::tip
Learn more about [JSX](https://facebook.github.io/jsx/)
:::

## 类型注释（Flow 和 TypeScript）

Babel 可以删除类型注释！查看 [Flow preset](preset-flow.md) 或 [TypeScript preset](preset-typescript.md) 以开始使用。请注意 **Babel 不会进行类型检查**；你仍然可以安装 Flow 或者 TypeScript 来使用类型检查。

你可以通过以下这个命令安装 flow preset

```shell npm2yarn
npm install --save-dev @babel/preset-flow
```

```js title="JavaScript"
// @flow
function square(n: number): number {
  return n * n;
}
```

也可以通过以下这个命令安装 typescript preset

```shell npm2yarn
npm install --save-dev @babel/preset-typescript
```

```js title="JavaScript"
function Greeter(greeting: string) {
  this.greeting = greeting;
}
```

:::tip
Learn more about [Flow](https://flow.org/) and [TypeScript](https://www.typescriptlang.org/)!
:::

## 可插件化

Babel 是用 plugins 构建的。你可以使用现有 plugins 编写自己的转换管道，或编写自己的 plugins。通过使用或创建一个 [preset](plugins.md#presets) 轻松使用一组插件。[了解更多 →](plugins.md)

直接使用 [astexplorer.net](https://astexplorer.net/#/KJ8AjD6maa) 创建插件，或者使用 [generator-babel-plugin](https://github.com/babel/generator-babel-plugin) 生成一个插件模板。

```javascript title="example-babel-plugin.js"
// A plugin is just a function
export default function({ types: t }) {
  return {
    visitor: {
      Identifier(path) {
        let name = path.node.name; // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = [...name]
          .reverse()
          .join("");
      },
    },
  };
}
```

## 可调试

支持 **Source map**，因此你可以轻松调试编译过的代码。

## 规范性

Babel 试图尽可能地遵循 ECMAScript 标准。作为性能的折衷方案，它可能还具有一些特定的选项，使其更符合规范。

## 可压缩

Babel 尝试使用尽可能少的代码而不依赖于庞大的运行时环境。

This may be difficult to do in cases, and there are ["assumptions"](assumptions.md) options that tradeoff spec compliancy for readability, file size, and speed.
