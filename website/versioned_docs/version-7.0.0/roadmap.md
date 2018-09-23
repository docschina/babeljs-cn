---
id: version-7.0.0-roadmap
title: Babel 路线图
sidebar_label: Roadmap
original_id: roadmap
---

> 并非所有内容都已确定，如有疑问，你可以发起一个 issues ！希望发布这些内容能吸引更多人参与，或者应用于其他项目之中。

## Babel 7

在 [babel/notes](https://github.com/babel/notes/blob/master/2017/2017-12/dec-21.md#before-the-v7-final) 和一些[高优先级项目](https://github.com/babel/babel/labels/Priority%3A%20High)中有提到。

## 生态系统

### 重新制作 preset-env 中的 `compat-table`。

> https://github.com/kangax/compat-table可以使用重制版本，理想情况下可以与浏览器供应商合作

- https://github.com/mdn/browser-compat-data 这里也有使用
- 还使用来自 test262 的数据？
- 运行针对真实浏览器的测试
- 拥有纯数据格式
- 需要持续维护

### Polyfill 行为

> 参见 https://github.com/babel/babel/tree/master/packages/babel-preset-env#usebuiltins-usage

- 允许任何替代 polyfill 而不是 `core-js`。应该能够覆盖任何东西（自定义 `Promise` 等）。
- 稳定后，将 `"usage"` 选项设置为默认。

### 构建/发布工作流程

- 编制/发布ES2015 +，.mjs 等指南: https://twitter.com/philwalton/status/908082461799616512
- 支持基于 ES 版本/浏览器/引擎的多构建/文件夹输出？
- 确保可以安全地运行 Babel 像在[#6280](https://github.com/babel/babel/pull/6280)的 node_modules 上，[create-react-app 有一个关于这个得问题](https://github.com/facebookincubator/create-react-app/issues/3777)

### TC39 提案的重构件

> Lebab /其他人已经习惯从 ES5 转换 -> ESNext，因此将其合并到 Babel 本身。

- 重构 [Lebab](https://github.com/lebab/lebab/issues/138) 用作 Babel 变换（因为它是一个单独的工具，可以保留 cli）
  - 用例: ES3 -> ES6+ (在源码上)
  - 用例: 删除已废弃提案的用法
  - 用例: 自动升级到最新版本的提案规范（尽可能）
  - 我们可以以某种方式分离：babel-codemod / jscodeshift / lebab，prettier / recast / babel-generator？ 我真的不想更新所有这些：新语法等于在所有这些地方分离的/不同步的重新编写。

## 提高社区插件的质量

- 与社区合作，创建有关如何编写插件或了解 AST 的指南，等等
- 使用 API /语法的分析（Google BigQuery）
- 根据一些标准有 #blessed/sanctioned/curated 包
  - 可用于烟雾测试
  - 官方测试包
  - 稳定的覆盖，下载等
  - 在 github / npm 上为这些创建一个范围命名空间？像 webpack-contrib
  - 可以在 apis 上执行 linting 规则吗？
  - 如果可以预先通知并且升级这些插件，可以更轻松地进行生态系统更改
  - 创建一组标准的验证测试（处理所有语法）
  - 记录/测试的一组选项

### AST 管理器

- 允许自定义版本的babel-standalone（与 REPL 相同，允许每个 PR 测试）
- 与 repl 集成？（两者都在 react 中）
- 自动发布一个插件到 npm？
- 创建测试?
- 挂进 codesandbox?

---

## 功能

### ES6 +的性能表（使用新选项中用于 babel-preset-env，例如 `perf`）

> 在 `preset-env` 中加入一个新的选项: 如果原生支持 *较慢*，将继续编译。可以设置一个阈值，可能需要与大小差异进行比较

- 使用 [six-speed repo](https://github.com/kpdecker/six-speed) 作为基础，需要申请 ES6 并提案
- 需要持续维护

### 编译输出统计

> [#5340](https://github.com/babel/babel/issues/5340) 可以在编译之前和之后显示代码大小以给出编译输出的建议。可以创建诸如使用 “loose” 模式或不编译等建议。

- [REPL](https://twitter.com/existentialism/status/948940160653291520)只添加了一个前/后代码大小
- 每次转换可能很难做到

### 异步转换

支持异步插件。将需要它选择加入和所有其他插件都是异步的。

### 插件排序

- 为指定插件顺序，给插件添加 `before`/`after` 的 key
- 可能在相同的 “plugin” 中实现相关插件，但只是向最终用户公开标志

### Babel 辅助 (共享代码)
- loader 应该自动处理像 rollup 这些打包工具
- 允许第三方助手?  https://github.com/babel/babel/issues/6487
- 允许编译助手（用 esnext 编写？） https://github.com/babel/babel/issues/5876

## 重新调整 `babel` / 创建 `babel-init`

> 我们可以重新使用 `babel` 软件包以获得更简化的0 config™版本

不确定这是什么样子但是这个想法很长一段时间并没有实现 - cli 版本可能只是给 libs？https://github.com/developit/microbundle也许 webpack / parcel 可以覆盖应用程序？

---

## General/Infra

### 针对 Spec 测试运行 Babel（test262，TS，Flow，JSX）

为了稳定性/规范合规性更好地一组测试。

- 解析器（babylon）已经有 test262 测试的白名单
- 需要对变换执行相同的操作

### 烟雾测试

- Babel 自身 https://github.com/babel/babel/issues/6134
- 重要的社区插件(`babel-plugin-instanbul`, css-in-js)
- `babel-core` 的集成 (被集成在像 `babel-loader`, 测试框架等)
- 库 (`(p)react`, `redux`, `vue`)
- 使用单个包的工具 (`debugger.html`, `prepack`)
- OSS 应用程序 (`nylas-mail`)

### 更好的可调试性

- 查询其他工具的数据配置
- `babel --settings`
- 更好地验证配置
- 创建/扩展新工具，像 https://github.com/boopathi/babel-time-travel

### 速度

> 已经通过 https://github.com/v8/web-tooling-benchmark 与 v8 合作，但可以加入其它代表性工作量：jsx/flow/ts/es6+。

可以为 perf PR 运行这些基准测试，应该随着时间的推移进行跟踪。

### 网站重组

- 使用像 Gatsby / Docusaurus 这样的博客框架
- 版本化的文档页面：目前我们没有简单的方法来显示 v6，v7 及更高版本的文档。
- 可翻译的文档

#### 扩展文档

- 有关 API 的真实文档
- 更新 babel-handbook /合并到 rehauled 网站
- 继续我们的[视频页面](https://babeljs.io/docs/community/videos/)
- 链接到常见错误页面

#### 更好地 REPL

- 来自 github 的下拉示例/语法示例？
- 可以从 npm 导入任何包（可以提供第三方插件的测试示例，调试问题）
- 运行 npm 的任何插件
- 从 repl 创建一个插件（我们可以将它与 ASTExplorer / codesandbox 合并吗？），甚至发布，从URL运行？
- 引入/导出一个配置文件
- 将^与在 PR / master 中运行 Babel 版本的能力结合起来。
- 在 repo 中使用插件测试作为文档的“示例”。

### `babel-bot`

> [#43](https://github.com/babel/babel-bot/issues/43) 用 [probot](https://github.com/probot/probot) 重写

bot 对于自动执行 github / maintainer 活动非常有用。

由于 Andrew 很忙并且没有在 AWS 上设置自动 infra，我们在很长一段时间内都没有对此进行更新。切换将使更新实现，因此我们可以添加一些新功能，这将节省一些头痛。

参考: https://github.com/eslint/eslint-github-bot, https://github.com/open-bot/open-bot

### 扩展的维护者指南

> 更好的管理/贡献指南
- 为不同方面的 issues/ PR 提供真实案例的指导

### 维护者/持续性

- 提升坦率的集体，与公司谈论办公时间，赞助，签约？
- 指导：Google Summer of Code / Rails Girls Summer of Code 很棒，但很难留下志愿者，我觉得我们可以通过全职帮助做更多事情。
- 也许在本地聚会上做贡献，或进行直播开发/维护工作？
- 即使有前期工作不会增加，也应该专注于引入能够降低负担的维护者

---

## 庞大的愿望清单 (可能超出 scope/complex/生态系统)

- Babel 应该运行多文件/接收 dep graph ？
- Babel 应该使用类型信息（来自ts / flow / runtime info 等其他内容）
- AST
  - 我们可以回到 acorn + estree吗？
  - 我们应该改用 shift？
  - 关于二进制 ast?
  - 不变的? https://github.com/babel/babel/issues/4130#issuecomment-245411113
