---
id: plugins
title: 插件
---

通过在 [配置文件](config-files.md) 中应用插件（或 [预设](presets.md)），可以启用 Babel 的代码转换。

<div id="pluginpreset-paths"></div>

## 使用一个插件

如果插件在 [npm](https://www.npmjs.com/search?q=babel-plugin) 中，你可以传入插件的名字，Babel 会检查它是否安装在 `node_modules` 中。这将被添加到 [plugins](options.md#plugins) 配置项，该选项接受一个数组。

```json
{
  "plugins": ["babel-plugin-myPlugin", "@babel/plugin-transform-runtime"]
}
```

你还可以指定插件的 相对/绝对 路径。

```json
{
  "plugins": ["./node_modules/asdf/plugin"]
}
```

有关配置插件或预设的路径的更多详细信息，请查阅 [命名规范化](options.md#name-normalization)。

## 转换插件

这些代码将对你的代码应用转换。

<blockquote class="babel-callout babel-callout-info">
  <p>
    转换插件将启用相应的语法插件，所以你不必两者都指定。
  </p>
</blockquote>

## 语法插件

大多数语法可以通过 Babel 进行转换。在比较罕见的情况下（如果转换还没有实现，或者没有默认的实现方式），你可以使用 `@babel/plugin-syntax-bigint` 之类的插件来只允许 Babel **解析** 特定类型的语法。或者你希望保留源代码，因为你只希望 Babel 执行代码分析或源码转换。

> 注意：如果你已经使用了相应的转换插件，则不需要指定语法插件，因为它会自动启用。

或者，你也可以从 Babel 解析器中提供任何 [`plugins` 选项](parser.md#plugins)：

你的 `.babelrc`:

```json
{
  "parserOpts": {
    "plugins": ["jsx", "flow"]
  }
}
```

## 插件排序

> 排序对于插件中的每个访问者来说都很重要。

这意味着如果两个转换都访问 "Program" 节点，则转换将按插件或预设的顺序执行。

- 插件在预设之前运行。
- 插件排序是从第一个到最后一个。
- 预设顺序是颠倒的（最后一个到第一个）。

示例:

```json
{
  "plugins": ["transform-decorators-legacy", "transform-class-properties"]
}
```

将运行 `transform-decorators-legacy` 再运行 `transform-class-properties`。

重要的是要记住，使用预设时，顺序是 _颠倒的_。例如下面：

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

将按以下顺序运行：先 `@babel/preset-react` 再 `@babel/preset-env`。

## 插件选项

插件和预设都可以通过将名称和选项对象包装在数组中来指定配置内的选项。

如果不指定选项，则这些都是等效的：

```json
{
  "plugins": ["pluginA", ["pluginA"], ["pluginA", {}]]
}
```

若要指定选项，请传递一个以对象，其中键作为选项名称。

```json
{
  "plugins": [
    [
      "transform-async-to-module-method",
      {
        "module": "bluebird",
        "method": "coroutine"
      }
    ]
  ]
}
```

预设设置选项的工作原理完全相同：

```json
{
  "presets": [
    [
      "env",
      {
        "loose": true,
        "modules": false
      }
    ]
  ]
}
```

## 插件开发

请参考优秀的 [babel 手册](https://github.com/thejameskyle/babel-handbook)
学习如何创建自己的插件。

颠倒名称的简单插件（来自首页）：

```js
export default function() {
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name;
        // 颠倒名称：JavaScript -> tpircSavaJ
        path.node.name = name
          .split("")
          .reverse()
          .join("");
      },
    },
  };
}
```
