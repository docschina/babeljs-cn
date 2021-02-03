<p>非常棒！虽然已经配置好了 Babel ，但并没有让它真正<em>生效</em>。在项目的根目录中创建一个 <a href="/docs/usage#configuration">babel.config.json</a> 文件并启用一些 <a href="/docs/presets">presets</a>。</p>

首先，你可以使用转换 ES2015+ 的 <a href="/docs/plugins/preset-env">env preset</a>。

```shell
npm install @babel/preset-env --save-dev
```

<p>
  为了让 preset 生效，你需要像下面这样定义你的 <code>babel.config.json</code> 文件：
</p>

```json
{
  "presets": ["@babel/preset-env"]
}
```
