---
title: 常见问题及答案
id: version-7.0.0-faq
original_id: faq
---

## 为什么 for...of 的输出那么冗长和难看？?

为了符合规范，必须在出错时调用迭代器的返回方法。另一种方法是启用 [loose 模式](plugin-transform-es2015-for-of.md#loose) 但请注意，如果启用 loose 模式，那会有很多注意事项，而且你愿意选择非规范。

更多相关信息请查阅[google/traceur-compiler#1773](https://github.com/google/traceur-compiler/issues/1773) 和
[babel/babel#838](https://github.com/babel/babel/issues/838)。

## 为什么 `this` 和 `arguments` 在箭头函数中会被重映射?

箭头函数与正常函数 **不同**。在箭头函数中，`arguments` 和 `this` 指向他们的外部函数，例如：

```javascript
const user = {
  firstName: "Sebastian",
  lastName: "McKenzie",
  getFullName: () => {
    // oops! 这里的 `this` 并没有指向 `user`
    return this.firstName + " " + this.lastName;
  },
  // 在对象中使用简写
  getFullName2() {
    return this.firstName + " " + this.lastName;
  }
};
```

更多相关信息请查阅 [babel/babel#842](https://github.com/babel/babel/issues/842), [babel/babel#814](https://github.com/babel/babel/issues/814),
[babel/babel#733](https://github.com/babel/babel/issues/733) 和 [babel/babel#730](https://github.com/babel/babel/issues/730)。

## 为什么 `this` 被重新映射到 `undefined` ?

Babel 假设所有输入的代码都是 ES2015 模块。ES2015 模块是隐式严格模式，因此这意味着，顶层 `this` 在浏览器中不是 `window` Node.js 中也不是 `exports`

如果你不想要这种行为，那么你可以选择在 [es2015-modules-transform](plugin-transform-es2015-modules-commonjs.md#usage) 中禁用 `strict`。

**请注意:** 如果你这样做，你将愿意偏离规范，这可能会导致未来的互操作问题。

## 求助？！我只是想使用 5.x 的 Babel！现在一切都太复杂了!

我们听到了！Babel 6 需要一点配置才能使用。[我们认为这是最好的](/blog/2015/10/29/6.0.0)并已经增加 [presets](plugins.md#presets) 来缓解这种过渡。

## 从 Babel 5.x 升级到 Babel 6

Babel 6 的核心是[插件](plugins.md)。你需要什么插件完全取决于你指定的配置，但只需在[配置文件](config-files.md)中添加以下内容，将得到所有在 Babel 5 中相同的转换：

```json
{
  "presets": ["env", "react", "stage-2"]
}
```

```sh
npm install babel-preset-env babel-preset-react babel-preset-stage-2 --save-dev
```

也可以查看我们的[配置 Babel 6](http://babeljs.io/blog/2015/10/31/setting-up-babel-6)文章。

## 所有的文档都到哪里去了？！

Babel 6 移除了很多支持<a href="/docs/plugins">插件</a>，所以很多文档都不再适用

对于每个被删除的选项，都应该有一个插件。可能我们会遗漏某些东西，如果发现了这种情况，请<a href="https://github.com/babel/babel/issues">提交问题</a>！

Babel 是一个开源项目，我们很感激所有得到的贡献。请帮忙填写文档，你可以通过提交请求到 [babel.github.io](https://github.com/babel/babel.github.io) 仓库。

## 如何从源文件中构建 Babel?

请查看[构建说明](https://github.com/babel/babel/blob/master/CONTRIBUTING.md#developing)。

## 如何为 Babel 做贡献？

查看[贡献](https://github.com/babel/babel/blob/master/CONTRIBUTING.md)。

## 为什么会得到语法错误/意外标识?

很可能你没有包含支持该功能的插件/preset。（也可能是解析器的问题，或它实际上是一个语法错误）。

## 为什么不更新一个 babel-x 包？

我们目前使用 [Lerna's 固定版本](https://github.com/lerna/lerna#fixedlocked-mode-default)系统

我们对所有包有一个全局版本。当我们发布一个版本的时候，唯一更新的包是实际上有更改的包（我们在那文件夹执行了 `git diff`）。

如果只更新 `babel-plugin-transform-exponentiation-operator` 到 6.x.x，由于其他依赖使用 `^`，一般不用对所有包发布一个新的版本。

例如，Babel [v6.6.0 版本](https://github.com/babel/babel/releases/tag/v6.6.0)并不意味着所有包现在都是 6.6.0。

> 为了确保你使用的包是最新版本，你可能要再次删除 `node_modules` 并执行 `npm install`。
