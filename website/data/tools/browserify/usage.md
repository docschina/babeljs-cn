#### 通过 CLI 使用

```sh title="Shell"
browserify script.js -t babelify --outfile bundle.js
```

#### 通过 Node API 使用

```js title="JavaScript"
browserify({ debug: true })
  .transform(babelify);
```

或者一个更完整的例子:

```js title="JavaScript"
var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");

browserify({ debug: true })
  .transform(babelify)
  .require("./script.js", { entry: true })
  .bundle()
  .on("error", function (err) { console.log("Error: " + err.message); })
  .pipe(fs.createWriteStream("bundle.js"));
```

#### 传递选项

**CLI**

```sh title="Shell"
browserify -d -e script.js -t [ babelify --comments false ]
```

##### Node API

```js title="JavaScript"
browserify().transform(babelify.configure({
  comments: false
}))
```

##### package.json

```json title="JSON"
{
  "transform": [["babelify", { "comments": false }]]
}
```

<blockquote class="alert alert--info">
  <p>
    欲了解更多信息，请参阅 <a href="https://github.com/babel/babelify">babel/babelify 项目</a>。
  </p>
</blockquote>


