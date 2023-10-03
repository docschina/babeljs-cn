<p>非常棒！虽然已经配置好了 Babel ，但并没有让它真正<em>生效</em>。在项目的根目录中创建一个 <a href="/docs/usage#configuration">babel.config.json</a> 文件并启用一些 <a href="/docs/presets">presets</a>。</p>

To start, you can use the <a href="/docs/babel-preset-env">env preset</a>, which enables transforms for ES2015+

```shell npm2yarn
npm install @babel/preset-env --save-dev
```

<p>
  为了让 preset 生效，你需要像下面这样定义你的 <code>babel.config.json</code> 文件：
</p>

```json title="babel.config.json"
{
  "presets": ["@babel/preset-env"]
}
```
