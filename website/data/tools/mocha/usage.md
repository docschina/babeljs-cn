#### Mocha 8

在你的 `package.json` 文件中做如下变化：

Create `.mocharc.yaml` in your project root:
```yaml
require:
  - '@babel/register'
```

有些特性需要一个 polyfill:

```sh
# Polyfills for builtin methods
npm install --save core-js
```

Add import polyfills _before_ `@babel/register`.
```yaml
require:
  - 'core-js'
  - '@babel/register'
```

Create `babel.config.json` in your project root:
```json
{
  "presets": ["@babel/preset-env"]
}
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    For more information see the <code>babel</code>
    <a href="https://github.com/mochajs/mocha-examples/tree/master/packages/babel">mocha-examples</a>.
  </p>
</blockquote>

#### Mocha 3

`--compilers` is deprecated as of Mocha v4.0.0. See [further explanation and workarounds](https://github.com/mochajs/mocha/wiki/compilers-deprecation).

```json
{
  "scripts": {
    "test": "mocha --compilers js:@babel/register"
  }
}
```

通过 polyfill:

```json
{
  "scripts": {
    "test": "mocha --require babel-polyfill --compilers js:@babel/register"
  }
}
```
