#### 通过 config 方式

```js
{
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
```

<<<<<<< HEAD
#### 通过 loader 方式

```js
var Person = require("babel!./Person.js").default;
new Person();
```

=======
>>>>>>> 501c215d927a3640d65e957bd010428a33c73aaa
<blockquote class="babel-callout babel-callout-info">
  <p>
    欲了解更多信息，请参阅 <a href="https://github.com/babel/babel-loader">babel/babel-loader 项目</a>。
  </p>
</blockquote>
