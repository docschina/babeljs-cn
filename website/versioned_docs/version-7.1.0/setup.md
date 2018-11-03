---
original_id: undefined
id: version-7.1.0-undefined
---
<p>
  非常棒！虽然已经配置好了 Babel ，但并没有让它真正<em>生效</em>。在项目的根目录中创建一个 <a href="/docs/usage/babelrc">.babelrc</a> 文件并启用一些<a href="/docs/plugins">插件</a>。
</p>

<p>
  首先，你可以使用转换 ES2015+ 的 <a href="/docs/en/babel-preset-env">env preset</a> 。 
</p>

```shell
npm install @babel/preset-env --save-dev
```

<p>
  为了让 preset 生效，你需要像下面这样定义你的 <code>.babelrc</code> 文件：
</p>

```json
{
  "presets": ["@babel/preset-env"]
}
```
