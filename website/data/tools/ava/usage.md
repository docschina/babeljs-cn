Enable Babel support either in `package.json` or `ava.config.*`
```json
{
  "ava": {
    "babel": true
  }
}
```

请注意，AVA _总是_ 在转译你的插件时会添加一些自定义的 Babel 插件，请看 <a href="https://github.com/avajs/ava/blob/master/docs/03-assertions.md#enhanced-assertion-messages">标注</a>。

<blockquote class="babel-callout babel-callout-info">
  <p>
    想要了解更多信息，请参阅 <a href="https://github.com/avajs/babel">@ava/babel 仓库</a>。
  </p>
</blockquote>
