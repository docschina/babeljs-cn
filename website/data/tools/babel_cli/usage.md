我们将把我们的指令放在本地版本的 **npm 脚本**中，而不是直接通过命令行来运行 Babel.

简单的在你的 `package.json` 中添加一个 `"scripts"` 属性并将 babel 命令放在它的 `build` 属性中。

```diff
  {
    "name": "my-project",
    "version": "1.0.0",
+   "scripts": {
+     "build": "babel src -d lib"
+   },
    "devDependencies": {
      "@babel/cli": "^7.0.0"
    }
  }
```

现在从我们的终端可以运行以下命令：

```sh title="Shell"
npm run build
```

这会按照和之前一样的方式来运行 Babel 并将输出放在 `lib` 目录下，唯一不同在于我们现在使用了一个本地拷贝。

另外，你可以在 `node_modules` 中引用 `babel` 命令。

```sh title="Shell"
./node_modules/.bin/babel src -d lib
```

<blockquote class="alert alert--info">
  <p>
    For full documentation on the Babel CLI see the <a href="/docs/usage#basic-usage-with-cli">usage docs</a>.
  </p>
</blockquote>
