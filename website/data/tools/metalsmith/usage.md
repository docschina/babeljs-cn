#### [CLI](https://github.com/segmentio/metalsmith#cli)

在你的 `metalsmith.json` 中添加 `metalsmith-babel`.

```js title="JavaScript"
{
  "plugins": {
    "metalsmith-babel": {
      // babel 选项
      "presets": ["@babel/preset-env"]
    }
  }
}
```

#### [API](https://github.com/segmentio/metalsmith#api)

```js title="JavaScript"
var Metalsmith = require("metalsmith");
var babel = require("metalsmith-babel");

new Metalsmith("./source")
  .use(babel({
    /* babel 选项 */
    presets: ["@babel/preset-env"]
  }))
  .build(function(err, files) {
    if (err) {
      throw err;
    }

    console.log("Completed.");
  });
```

<blockquote class="alert alert--info">
  <p>
    欲了解更多信息，请参阅 <a href="https://github.com/babel/metalsmith-babel">babel/metalsmith-babel 项目</a>。
  </p>
</blockquote>
