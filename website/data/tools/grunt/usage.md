```js
grunt.initConfig({
  babel: {
    options: {
      sourceMap: true,
      presets: ["@babel/preset-env"],
    },
    dist: {
      files: {
        "dist/app.js": "src/app.js",
      },
    },
  },
});

grunt.loadNpmTasks('grunt-babel');

grunt.registerTask("default", ["babel"]);
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    欲了解更多信息，请参阅 <a href="https://github.com/babel/grunt-babel">babel/grunt-babel 项目</a>。
  </p>
</blockquote>

