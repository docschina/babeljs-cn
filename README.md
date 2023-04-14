# [babel/website](https://babel.docschina.org/)

这是 [babel.docschina.org](https://babel.docschina.org/) 网站的源代码；请随意对我们的文档提出更改建议！

- 当前: `cn-v7` 分支被部署到 https://babel.docschina.org/

### 设置

Node: 检查 Node 是否安装了 10.19.0 及以上版本。你可以通过 node -v 检查。

Yarn: 确保已经安装 Yarn 1 并且版本号 >= 1.19.0。

<<<<<<< HEAD
```bash
$ git clone git@github.com:docschina/babeljs-cn.git
$ cd babeljs-cn
=======
```shell title="Shell"
$ git clone git@github.com:babel/website.git
$ cd website
>>>>>>> 0253e6b50b7bf5bd87beed9f44ab40f5552247a7
$ yarn && yarn bootstrap
```

- 接下来仅需要运行 `yarn start` （在 package.json 中检查该脚本）。

### 为网站作出贡献

为了使所有 Babel 的包中的文档保持同步，文档现在直接位于这个存储库中。 [`babel/babel`](https://github.com/babel/babel) 中的 README 是 [自动生成的](https://github.com/babel/babel/blob/main/scripts/generators/readmes.js) 并指向这个文档。

你可能想让自己熟悉 [docusaurus](https://docusaurus.io/docs/en/installation) 来使网站有重大变化。

#### 寻求支持？

有关贡献的问题和支持，请加入我们的 [Slack 社区](https://slack.babeljs.io/) 的 `#website` 频道，或直接在 [这里](https://babeljs.slack.com/messages/website).
