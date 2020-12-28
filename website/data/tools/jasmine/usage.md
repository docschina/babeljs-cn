在你的 `spec/support/jasmine.json` 文件中作出如下变化：

```json
{
  "helpers": [
    "../node_modules/@babel/register/lib/node.js"
  ]
}
```

<<<<<<< HEAD
这个文件在你通过 `jasmine init` 命令建立一个项目生成。
=======
This file is created when you setup a project with the `jasmine init` command. Note that the file paths in `helpers` option are relative to `spec_dir`, not to project root path.

Create a `babel.config.json` in your project root:

```json
{
  "presets": ["@babel/preset-env"]
}
```
>>>>>>> 6b46b573105807b72b0dfb1451ee3ca0852e20b8

<blockquote class="babel-callout babel-callout-info">
  <p>
    欲了解更多信息，请参阅 <a href="https://github.com/piecioshka/test-jasmine-babel">piecioshka/test-jasmine-babel 项目</a>。
  </p>
</blockquote>
