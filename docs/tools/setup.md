<p>
  非常棒！虽然已经配置好了 Babel ，但并没有让它真正<em>生效</em>。在项目的根目录中创建一个 <a href="/docs/usage/babelrc">.babelrc</a> 文件并启用一些<a href="/docs/plugins">插件</a>。
</p>

<p>
  首先，你可以使用转换 ES2015+ 的 <a href="/docs/plugins/preset-env/">env preset</a> 。 
</p>

```shell
npm install babel-preset-env --save-dev
```

<p>
  为了让 preset 生效，你需要像下面这样定义你的 <code>.babelrc</code> 文件：
</p>

```json
{
  "presets": ["env"]
}
```
<p>
  <strong>注意</strong>: 因为 npm 2.x 下载依赖的关系，在使用 npm 2.x 运行 Babel 6.x 的项目时，可能会引起性能问题。 你可以通过切换到 npm 3.x 或在 npm 2.x 上使用 <a href="https://docs.npmjs.com/cli/dedupe">dedupe</a> 选项来解决这个问题。查看 npm 版本你可以运行如下命令:
</p>

```shell
npm --version
```
