<<<<<<< HEAD
<p>
  非常棒！虽然已经配置好了 Babel ，但并没有让它真正<em>生效</em>。在项目的根目录中创建一个 <a href="/docs/usage/babelrc">.babelrc</a> 文件并启用一些<a href="/docs/plugins">插件</a>。
</p>

<p>
  首先，你可以使用转换 ES2015+ 的 <a href="/docs/en/babel-preset-env">env preset</a> 。 
</p>
=======
<p>Great! You've configured Babel but you haven't made it actually <em>do</em> anything. Create a <a href="/docs/usage#configuration">babel.config.json</a> config in your project root and enable some <a href="/docs/presets">presets</a>.</p>

To start, you can use the <a href="/docs/plugins/preset-env">env preset</a>, which enables transforms for ES2015+
>>>>>>> 42632b66e02e898b53f56573cbf10769c62a1ddf

```shell
npm install @babel/preset-env --save-dev
```

<<<<<<< HEAD
<p>
  为了让 preset 生效，你需要像下面这样定义你的 <code>.babelrc</code> 文件：
</p>
=======
In order to enable the preset you have to define it in your <code>babel.config.json</code> file, like this:
>>>>>>> 42632b66e02e898b53f56573cbf10769c62a1ddf

```json
{
  "presets": ["@babel/preset-env"]
}
```
