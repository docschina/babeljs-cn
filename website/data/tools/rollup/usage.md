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
<<<<<<< HEAD
    欲了解更多信息，请参阅 <a href="https://github.com/rollup/rollup">rollup</a> 和 <a href="https://github.com/rollup/rollup-plugin-babel">rollup-plugin-babel</a> 项目.
=======
    For more information see the <a href="https://github.com/rollup/rollup">rollup</a> and <a href="https://github.com/rollup/plugins/tree/master/packages/babel">@rollup/plugin-babel</a> repos.
>>>>>>> 0ffcbdc82d3ad8750b4dbb2a7ac83e9765174c4f
  </p>
</blockquote>
