```js title="JavaScript"
module.exports = function(config) {
  config.set({
    files: [
      "src/**/*.js",
      "test/**/*.js"
    ],
    preprocessors: {
      "src/**/*.js": ["babel"],
      "test/**/*.js": ["babel"]
    },
    "babelPreprocessor": {
      // options go here
      options: {
        presets: ["@babel/preset-env"],
        sourceMap: "inline"
      },
    }
  });
};
```

<blockquote class="alert alert--info">
  <p>
    欲了解更多信息，请参阅 <a href="https://github.com/babel/karma-babel-preprocessor">babel/karma-babel-preprocessor 项目</a>。
  </p>
</blockquote>

