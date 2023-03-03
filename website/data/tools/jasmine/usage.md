在你的 `spec/support/jasmine.json` 文件中作出如下变化：

```json title="JSON"
{
  "helpers": [
    "../node_modules/@babel/register/lib/node.js"
  ]
}
```

这个文件在你通过 `jasmine init` 命令建立一个项目生成。Note that the file paths in `helpers` option are relative to `spec_dir`, not to project root path.

Create a `babel.config.json` in your project root:

```json title="babel.config.json"
{
  "presets": ["@babel/preset-env"]
}
```

<blockquote class="alert alert--info">
  <p>
    欲了解更多信息，请参阅 <a href="https://github.com/piecioshka/test-jasmine-babel">piecioshka/test-jasmine-babel 项目</a>。
  </p>
</blockquote>
