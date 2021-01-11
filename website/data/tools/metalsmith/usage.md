#### [CLI](https://github.com/segmentio/metalsmith#cli)

在你的 `metalsmith.json` 中添加 `metalsmith-babel`.

```javascript
{
  "plugins": {
    "metalsmith-babel": {
<<<<<<< HEAD
      // babel 选项
=======
      // babel options
      "presets": ["@babel/preset-env"]
>>>>>>> 097bdc14f350c0cb680ba2c698446463b83a8cbb
    }
  }
}
```

#### [API](https://github.com/segmentio/metalsmith#api)

```javascript
var Metalsmith = require("metalsmith");
var babel = require("metalsmith-babel");

new Metalsmith("./source")
<<<<<<< HEAD
  .use(babel({/* babel 选项 */}));
=======
  .use(babel({
    /* babel options */
    presets: ["@babel/preset-env"]
  }))
>>>>>>> 097bdc14f350c0cb680ba2c698446463b83a8cbb
  .build(function(err, files) {
    if (err) {
      throw err;
    }

    console.log("Completed.");
  });
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    欲了解更多信息，请参阅 <a href="https://github.com/babel/metalsmith-babel">babel/metalsmith-babel 项目</a>。
  </p>
</blockquote>
