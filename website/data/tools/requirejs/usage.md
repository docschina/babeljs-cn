在配置中添加以下路径:

```js title="JavaScript"
paths: {
    es6: '...node_modules/requirejs-babel/es6',
    babel: '...node_modules/@babel/standalone/babel.min',
    'babel-plugin-module-resolver': '...node_modules/babel-plugin-module-resolver-standalone/index'
  }
```

接下来，通过 `es6!` 加插件名引用文件:

```js title="JavaScript"
define(["es6!your-es6-module"], function (module) {
  // ...
});
```

<blockquote class="alert alert--info">
  <p>
    欲了解更多信息，请参阅 <a href="https://github.com/mikach/requirejs-babel">mikach/requirejs-babel 项目</a>.
  </p>
</blockquote>
