<<<<<<< HEAD
AVA 通过使用 Babel 6 内置支持 ES2015, 所以您可以立即使用 ES2015 语法编写测试。

AVA 默认的 Babel 配置包括 `"es2015"` 和 `"stage-2"` presets, 但是为了转译测试文件，你可以通过 AVA 中 [`package.json` 配置](https://github.com/sindresorhus/ava#configuration) 的 `"babel"` 选项自定义任何 Babel 选项。

比如：

```json
{
  "ava": {
    "babel": {
      "presets": [
        "es2015",
        "react"
      ]
    }
  }
}
```

或者你可以简单地从 [`.babelrc`](/docs/usage/babelrc/) 或者 Babel's
[`package.json` 配置](/docs/usage/babelrc/) `"inherit"` Babel 的配置，使得测试文件和你源文件使用相同的配置：

=======
Enable Babel support either in `package.json` or `ava.config.*`
>>>>>>> a1d138a098a311c8f6319650716b490262a8e6d0
```json
{
  "ava": {
    "babel": true
  }
}
```

<<<<<<< HEAD
请注意，AVA _总是_ 在转译你的插件时会添加一些自定义的 Babel 插件，请看<a href="https://github.com/sindresorhus/ava/blob/master/docs/recipes/babelrc.md#notes">标注</a>。

<blockquote class="babel-callout babel-callout-info">
  <p>
    欲了解更多信息，请参阅 <a
    href="https://github.com/sindresorhus/ava/blob/master/docs/recipes/babelrc.md">
    如何配置</a> Babel.
=======
Note that AVA _always_ adds a few custom Babel plugins when transpiling
your plugins see <a href="https://github.com/avajs/ava/blob/master/docs/03-assertions.md#enhanced-assertion-messages">notes</a>.

<blockquote class="babel-callout babel-callout-info">
  <p>
    For more information see the<a href="https://github.com/avajs/babel">@ava/babel repo</a>.
>>>>>>> a1d138a098a311c8f6319650716b490262a8e6d0
  </p>
</blockquote>
