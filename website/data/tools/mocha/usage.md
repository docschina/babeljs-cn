<<<<<<< HEAD
#### Mocha 4

从 Mocha v4.0.0 开始，不推荐使用 `--compilers`. 请参阅 [进一步解释和解决办法](https://github.com/mochajs/mocha/wiki/compilers-deprecation)。
=======
#### Mocha 8
>>>>>>> 0c904d6d88d2d86cb7502df053419e19b3a97c15

在你的 `package.json` 文件中做如下变化：

Create `.mocharc.yaml` in your project root:
```yaml
require:
  - '@babel/register'
```

<<<<<<< HEAD
有些特性需要一个 polyfill:
=======
Some features may require a polyfill:
>>>>>>> 0c904d6d88d2d86cb7502df053419e19b3a97c15

```sh
# Polyfills for builtin methods
npm install --save core-js
# Polyfills for generator function
npm install --save regenerator-runtime
```

Add import polyfills _before_ `@babel/register`.
```yaml
require:
  - 'core-js'
  - 'regenerator-runtime'
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
