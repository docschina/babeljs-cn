```js
import babel from '@rollup/plugin-babel';

const config = {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'esm'
  },
  plugins: [babel({ babelHelpers: 'bundled' })]
};

export default config;
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    欲了解更多信息，请参阅 <a href="https://github.com/rollup/rollup">rollup</a> 和 <a href="https://github.com/rollup/plugins/tree/master/packages/babel">@rollup/plugin-babel</a> 项目.
  </p>
</blockquote>
