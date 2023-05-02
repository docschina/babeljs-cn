就是这些！在你的 brunch 配置文件(例如: `brunch-config.coffee`)中设置 babel 选项，已经被内部处理的 `filename` 和 `sourceMap` 除外。

```coffee
plugins:
  babel:
    whitelist: ["arrowFunctions"]
    format:
      semicolons: false
```

<blockquote class="alert alert--info">
  <p>
    欲了解更多信息，请参阅 <a href="https://github.com/babel/babel-brunch">babel/babel-brunch 项目</a>。
  </p>
</blockquote>

