---
id: roadmap
title: Babel 路线图
sidebar_label: 路线图
---

本文档概述了我们的团队成员希望在今年进行的一些改进。

这远不是我们将为 Babel 带来的所有新功能或重要更改的完整列表，但是，如果你对项目发展的大方向感兴趣，那么这是一个很好的总结。实际上，我们也许并不能完成列出的所有要点，甚至可能会将某些实现推迟到明年。某些要点已有明确的起止时间，而另一些则需要更多的研究或 [RFCs](https://github.com/babel/rfcs)。

如果贵公司有兴趣并希望直接赞助，请 [联系我们](mail:team@babeljs.io)！

## Babel 2021 路线图

### Babel 8

<<<<<<< HEAD
关于 Babel 8 的发布我们已经讨论了一年多了（我们早在一年前就有了安排）！不过相比之前，我们现在离它的发布越来越近了！
=======
We have been talking about the Babel 8 release for more than one year (we initially scheduled it about one year ago)! However, we are now closer then ever to its release!
>>>>>>> 0253e6b50b7bf5bd87beed9f44ab40f5552247a7

剩下的大部分工作都是在 [跟踪 issue](https://github.com/babel/babel/issues/10746)，但仍有一些阻塞内容：
- 我们希望取消对 [Node.js 10](https://github.com/nodejs/Release) 的支持，它将在 2021-04-30 停止维护。
- 我们希望将 Babel 作为一个纯 ES 模块包发布。现在我们正在转换我们的源码以兼容 Node.js 的 ES 模块实现，同时，我们正在研究如何让目前使用 Babel 的人更容易地将 ES 模块编译成 CommonJS 模块。
- 我们正在尝试将我们的 TypeScript AST 项目与 [`typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint/) 项目对齐。它们的 AST _几乎_ 完全相同，但我们还需要做出一些小的突破性更改，才能完全一致。
- 我们的发布基础设施还不支持预发布，也不支持使用多个 "main" 分支（一个用于 Babel 8，一个用于 Babel 7）。
- 我们还没有弄清楚 Babel 7 的维护策略。

### 实现新的 TC39 提案

除了顶级 await、导入断言和 JSON 模块（它们最好由使用依赖关系图的构建工具来处理）之外，Babel 目前可以解析并转译所有第 3 阶段提案。

我们支持所有第 2 阶段提案，除了：
- 新版装饰器提案（我们需要同时实现解析和转译）；
- 转译块级模块提案（在 Babel 7.13.0 我们实现了解析）。

我们将实现对装饰器的支持，并研究是否应该以及如何实现对块级模块的转译。

尽管我们不支持许多第 1 阶段提案，但最近对管道运算符和 do 表达式进行了更新。因为我们已经支持这些提案，并且社区也对它们非常期待，所以我们将继续更新我们的实现。

还有其它提案（比如模式匹配）我们至今没有实现，因为它们的拥护者希望对语法和语义进行重大更改。不过，我们正在密切关注它们的发展，一旦它们稳定下来，我们就会在 Babel 中实现它们。

### 将 `@babel/preset-env` 移入 `@babel/core`

一个最小的 Babel 转译配置至少需要三个包：
- `@babel/core`
- `@babel/preset-env`
- 一个 Babel "运行器"（`@babel/cli`、`babel-loader`、`@rollup/plugin-babel` 等）

将 `@babel/preset-env` 直接移入 `@babel/core` 有两大好处：

- 在简单的项目中配置 Babel 将会更容易，你只需要在 `babel.config.json` 中启用 `compileJS: true` 选项（或者在将来它甚至可能是默认值 —— 目前它不能作为默认值是因为 `@babel/eslint-parser` 不编译源码）
- 它将确保插件版本与 `@babel/core` 版本保持同步，从而避免因为 不匹配/不兼容 的包版本而导致的大多数问题
- 当我们迁移至 ES 模块时，将很难在 `transformSync` 中同步解析和加载插件。而这就可以解决前面的问题。

已经有[一个 RFC](https://github.com/babel/rfcs/pull/10) 可以为 `@babel/core` 中的标准 ECMAScript 特性迁移 _插件_，这是朝该方向迈出的第一步。

使用我们当前的 `@babel/preset-env` 架构，我们需要专门处理官方插件，以便根据 `targets` 自动启用或禁用它们。
然而，这有两个缺点：
- 特定插件的兼容性数据与插件实现完全分离（它甚至不是依赖，更像是内部隐式的对等依赖：插件 -> @babel/core -> @babel/compat-data）；
- 官方插件将从 `@babel/core` 获得特殊对待，但我们希望确保第三方插件具有与官方插件相同的能力。

### 继续开发 `babel-polyfills` 项目

我们已经决定从 Babel 8 的 `@babel/preset-env` 中移除较旧的 `core-js@2` 的支持。我们还希望停止推广特定的第三方 polyfill，因为这可能会给我们的用户留下这样的印象：它是 Babel 本身的一部分。

这可能以两种不同的方式进行：
- 我们只需从 Babel 8 的 `@babel/preset-env` 中移除 `core-js@3`，鼓励用户迁移到 `babel-plugin-polyfill-corejs3`（从 v7.10.0 开始，在 `@babel/preset-env` 内部使用）
- 我们可以在 `@babel/preset-env` 中保留对 `core-js@3` 的支持，但在移动转译插件时，不将其迁移到 `@babel/core`。

无论我们采取哪种方式，当我们的用户需要在他们的配置中更新 `core-js` 集成的时候，我们希望为他们提供至少一个替代方案。`core-js` 是一个非常好的 polyfill，它确保了尽可能高的规范合规性，但用户可能更喜欢不同的权衡。

<<<<<<< HEAD
([Nicolò](https://github.com/nicolo-ribaudo)) 正在与 [@ljharb](https://github.com/ljharb) 合作，为了确保 [`@es-shims` 项目](https://github.com/es-shims/) 至少支持 ES2015+ 的所有功能（实际上我们的目标是 ES5+），这样 Babel 用户可以在至少两个选项之间自由选择。
=======
([Nicolò](https://github.com/nicolo-ribaudo)) is working with [@ljharb](https://github.com/ljharb) to make sure that the [`@es-shims` project](https://github.com/es-shims/) supports at least all the ES2015+ features (we actually aim for ES5+), so that Babel users are free to choose between at least two options.
>>>>>>> 0253e6b50b7bf5bd87beed9f44ab40f5552247a7

这需要在放弃对 `core-js@3` 的内置支持 _之前_ 完成, 这样对 `es-shims` 感兴趣的人就不需要迁移两次了。

### 扩展粒度转译的 `targets` 使用率

从一开始，`@babel/preset-env` 就使用 `targets` 选项自动启用或禁用转译插件。

然而，在 Babel 插件与浏览器中实现的特性之间不存在一对一的映射。

例如，对于不同的类字段类型（公共和私有、静态和实例），我们只有一个插件，但浏览器却有不同的兼容性矩阵：

- Firefox 73 和 Safari 14 仅支持公共实例字段
- Firefox 75+ 支持公有实例和静态字段
- Chrome 79+ 支持公有和私有字段，但不支持某些可选链接表达式中的私有字段
- Chrome 84+ 完全支持私有字段，以及私有方法
- Safari TP 121 完全支持私有字段（即使使用 `?.`），但不支持私有方法

为每个功能创建一个插件并不是最优的。例如，我们可以将私有方法转译为私有字段，然后根据需要将它们转译为较旧的语法。但是，如果我们知道私有方法需要向下转译，我们可以通过直接将私有方法向下转译为较旧的语法来生成更好/优化的输出，而不需要中间步骤。

从 Babel 7.13.0 开始，我们可以直接在插件中读取 `targets` 选项，我们可以修改我们的插件来自动执行给定 ECMAScript 特性的 _部分_ 编译，这将在输出大小和运行时性能方面带来优势。

**现有技术**

这种方法并不是全新的。多亏了与 [@_developit](https://twitter.com/_developit) 的合作，在 Babel 7.9.0 中，我们在 `@babel/preset-env` 中引入了一个新的 `bugfixes: true` 选项。启用此选项并使用 `esmodules: true` 作为编译目标时，我们只会部分编译 [某些特性](https://github.com/babel/preset-modules#features-supported)。这就是我们最初考虑这种可能性的原因，但当前的部分转译在使用更现代的目标（例如：`defaults, not ie 11`）时用处不大。

我们已经使用 `targets` 选项来决定在编译对象扩展时是否可以使用 `Object.assign`。

**行动要点**

这个目标可以分为两个可以并行完成的大任务：
- 我们需要通过收集真实的 browserslist 查询并模拟流行的查询（例如：`defaults` 或 `>2%, not dead`）在未来将如何演变，来确定这些优化在 *哪些方面* 有用。
- 我们需要实际实现必要的优化，确保它们仍然可以与其他插件很好地协同工作（因为它们会极大地增加可能的转译组合数量）。

### 调查新的编译器 `assumptions`

在 Babel 7.13.0 中，我们引入了一个新的顶层 [`assumptions`](https://babeljs.io/docs/en/options#assumptions) 选项来正式化 `loose` 模式选项的功能，并为我们的用户提供更精细的控制（因为他们通常只能启用 _某些_ 假设，而不是所有）。

但是，我们只包含了在 `loose` 模式下编译时 _已经_ 做出的假设选项。我们现在可以审查我们的用户可能需要哪些新的假设。

<<<<<<< HEAD
已经有一些提案，例如：
- [#8222](https://github.com/babel/babel/issues/8222) - 假设所有 ESM 导入实际上都是不可变的，从而避免了活动绑定所需的代码。
- [#11356](https://github.com/babel/babel/issues/11356) - 假设编译的类不扩展原生类，从而避免了实例化可能的原生类所需的运行时性能成本。

我们可以通过以下方式找到我们应该实现的新假设：
- 手动检查我们编译成“不明显”输出的特性，这通常是由许多开发人员不关心的边缘情况引起的。
- 从社区寻求反馈，因为开发人员可以测试哪些假设对他们的应用有效，哪些假设无效。
=======
There are already some proposals, such as:
- [#8222](https://github.com/babel/babel/issues/8222) - assume that all the ESM imports are actually immutable, avoiding the code needed for live bindings.
- [#11356](https://github.com/babel/babel/issues/11356) - assume that compiled classes do not extends native classes, avoiding the runtime performance cost needed to instantiate possibly native classes.

We can find which new assumptions we should implement, by:
- Manually checking which features we compile to "non-obvious" output, which is usually caused by edge cases that many developers don't care about.
- Asking for feedback from the community, since developers can test which assumptions work and which don't on their applications.
>>>>>>> 0253e6b50b7bf5bd87beed9f44ab40f5552247a7

### 检修 Babel REPL

Babel REPL 是一个方便学习 Babel 如何转译源码的 playground。

目前的限制：

- REPL 不支持 `assumptions` 配置。尽管我们目前在 https://babel.dev/assumptions 上有一个专门基于每个假设的迷你 REPL，但我们还不能展示这些 `assumptions` 是如何协同工作的
- REPL 不支持插件选项。某些插件具有必需的选项，例如 `@babel/plugin-proposal-record-and-tuple` 和 `@babel/plugin-proposal-decorators`
https://github.com/babel/website/issues/1292, https://github.com/babel/website/issues/2224, https://github.com/babel/website/pull/1970

已有的优秀功能：

- AST 资源管理器（与现有系统集成）
- 具有完整堆栈跟踪的标准错误输出作为错误日志
- 标准输出作为输出
- 从 UI 更改 Babel 版本

Babel 站点仓库上至少有 15% 的未解决 issues 与 REPL 有关：https://github.com/babel/website/issues?q=is%3Aissue+is%3Aopen+label%3Arepl

### 教育/调试工具

与 REPL/AST 资源管理器相关，我们可以使用更多工具来帮助我们自己和第三方插件进行通用插件开发。这在本质上是相当具有探索性的：AST 本身、调试等有不同的可视化。

一些事情已经在进行中，Henry 一直在断断续续地工作：

<<<<<<< HEAD
- [Codesandbox](https://codesandbox.io/s/babel-repl-custom-plugin-7s08o) 用于制作一个简单的 Babel 插件，与 https://astexplorer.net 的思路相同，不过会带有自定义配置。
- [可视化](https://twitter.com/left_pad/status/1367941962083471361?s=20) 的输入到输出映射帮助理解 Babel 是如何转译代码的。甚至作为让 JavaScript 用户熟悉新语法或一个特定的转译示例的文档也很有用。
- 输入到输出的 [映射](https://twitter.com/left_pad/status/1298792944099561473?s=20) 类似于 sourcemap 类型的结构。可以做一个反向映射，找出是什么插件导致代码以某种方式输出，这有助于调试。
=======
- [Codesandbox](https://codesandbox.io/s/babel-repl-custom-plugin-7s08o) for making a simple Babel plugin in the same vein as https://astexplorer.net but with custom configs.
- [Visualization](https://twitter.com/left_pad/status/1367941962083471361?s=20) of input to output mapping to help understand how Babel transforms its code. Could be useful even for documentation in getting JavaScript users familiar with new syntax or a specific demo of a transform.
- [Mapping](https://twitter.com/left_pad/status/1298792944099561473?s=20) of input to output like a sourcemap type structure. Can do a reverse mapping to find out what plugin caused the code to be outputted a certain way which helps with debugging.
>>>>>>> 0253e6b50b7bf5bd87beed9f44ab40f5552247a7

查看我们正在思考的互动示例：https://babel-explorer.netlify.app/（在底部扇区单击并按住鼠标！）

<!--

## Ecosystem

### Test Against `test262`

> The parser already does this, but we don't do it for transforms.

We should run against `test262` (the JavaScript test suite). This is made easier with [test262-harness](https://github.com/bterlson/test262-harness). In addition, it would be great to have it run in [test262-report](https://test262.report/), as [announced](https://bocoup.com/blog/announcing-test262-report) by Bocoup.

This will give us a few things:

- Better confidence in Babel's output. More tests/coverage is better for catching regressions and finding spec bugs worth working on.
- Can use these to help do a reverse test against any kind of "loose" mode. We can purposely fail a test when that option intends to not adhere to the spec.
- Can use this new data instead of `compat-table` for `@babel/preset-env`.

### Polyfill behavior

> This is regarding https://github.com/babel/babel/tree/main/packages/babel-preset-env#usebuiltins-usage

- [ ] Allow any substitute polyfill instead of `core-js`. You should be able to override anything (custom `Promise`, etc)
- [ ] Make `"usage"` option the default after it is stable.

### Build/publish workflow

- Guide on compiling/publishing ES2015+, .mjs, etc: https://twitter.com/philwalton/status/908082461799616512
- Support multi-build/folder outputs based on ES version/browser/engines?

### Codemods for TC39 Proposals

> Lebab/others are already used to convert from ES5 -> ESNext, so incorporate it into Babel itself.

- Refactor [Lebab](https://github.com/lebab/lebab/issues/138) as Babel transforms (can keep the cli since it's a separate tool)
  - Usecase: ES3 -> ES6+ (on source code)
  - Usecase: Remove usage of dropped proposals
  - Usecase: Auto upgrade to the latest version of a proposal spec (if possible)
  - Can we somehow combine forces in: babel-codemod/jscodeshift/lebab, prettier/recast/babel-generator? I really don't want to update all of these: new syntax equals re-writing the printer in all of these places separately/out of sync.

## Increasing the quality of community plugins

- Work with the community to create guides on how to write plugins or understand ASTs, etc
- Analysis of API's/syntax used (Google BigQuery)
- Have #blessed/sanctioned/curated packages according to some standard
  - Can use for smoke tests
  - Official testing package
  - Certain level of coverage, downloads, etc
  - Create a scoped namespace on github/npm for these? like webpack-contrib
  - Can enforce linting rules on apis?
  - Makes ecosystem changes easier if can notify and upgrade these plugins beforehand
  - Create a set of standard tests to verify against (handles all syntax)
  - Documented/tested set of options

### ASTExplorer

- allow custom version of babel-standalone (same as REPL to allow per PR tests)
- integrate with repl? (both are in react)
- auto publish a plugin to npm?
- create tests?
- hook into codesandbox?

---

## Feature

### Performance table for ES6+ (used in babel-preset-env under new option e.g `perf`)

> Add a new option in `preset-env`: will continue to compile if the native support is *slower*. Can setup a threshold, may need to compare against the size difference.

- Use [six-speed](https://github.com/kpdecker/six-speed) repo as a base, needs to apply for ES6 and proposals
- Need continued maintenance

### Compiled Output Stats

> [#5340](https://github.com/babel/babel/issues/5340) Can show the code size before and after compiling to give a sense of compiled output. Could create suggestions like using "loose" mode or not compiling, etc.

- The [REPL](https://twitter.com/existentialism/status/948940160653291520) just added a before/after code-size
- Maybe difficult to do per transform

### Async Transforms

Support having async plugins. Will require it to be opt-in and for all other plugins to be async.

### Plugin Ordering

- Add `before`/`after` keys for plugins so they can specify order.
- Possibly implement related plugins in the same "plugin" but just expose a flag out to the end-user.

### Babel Helpers (shared code)
- loader should handle these automatically like rollup
- allow 3rd party helpers?  https://github.com/babel/babel/issues/6487
- allow compilation of helpers (write in esnext?) https://github.com/babel/babel/issues/5876

## Repurpose `babel` / create `babel-init`

> We can re-use the `babel` package for a more simplified *0 config™* version

Not sure what this looks like but had this idea for a really long time and didn't really get anywhere - the cli version could just be https://github.com/developit/microbundle for libs? Maybe webpack/parcel would have it covered for apps?

---

## General/Infra

### Smoke Tests

- Babel itself https://github.com/babel/babel/issues/6134
- Important community plugins (`babel-plugin-instanbul`, css-in-js)
- `babel-core` integrations (wrappers like `babel-loader`, test frameworks, etc)
- Libraries (`(p)react`, `redux`, `vue`)
- Tools that use individual packages (`debugger.html`, `prepack`)
- OSS Apps (`nylas-mail`)

### Better Debuggability

- Query config for data for other tools
- `babel --settings`
- Validate config better
- Create/expand on new tools like https://github.com/boopathi/babel-time-travel

#### Website/Docs

- Translations
- Real documentation on APIs
- Up to date babel-handbook/merge into rehauled website
- Link to common errors pages

#### Better REPL

- Dropdown examples/examples of syntax from github?
- Import any package from npm (can give test examples for 3rd party plugins, debugging issues)
- Run any plugin from npm
- Create a plugin from the repl (can we merge it with ASTExplorer/codesandbox?), even publish, run from URL?
- Import/Export a config file
- Combine ^ with the ability to run the version of Babel in a PR/master.
- Use plugin's tests in the repo as "examples" for docs.

### `babel-bot`

> [#43](https://github.com/babel/babel-bot/issues/43) Rewrite it with [probot](https://github.com/probot/probot)

A bot is really useful to do github/maintainer activities automatically.

We haven't updated this in a long time due to Andrew being busy and not setting up the automatic infra on AWS. Switching will make updating actually real so we can add some new features which would save some headache.

References: https://github.com/eslint/eslint-github-bot, https://github.com/open-bot/open-bot

### Expanded Maintainer Guide

> Better onboarding/contributing guide
- Guide to different aspects of contributing with real examples to issues/PRs

### Maintainers/Sustainability

- Promote Open Collective, talking with companies about office hours, sponsorship, contracting?
- Mentoring: Google Summer of Code/Rails Girls Summer of Code were great but was hard to keep up with volunteers and I felt like we could be doing a lot more with full time help.
- Maybe doing local meetups on contributing, or livestreaming development/maintenance work?
- Should focus on bringing in maintainers that will lower the burden, not increase it even if there is upfront work

---

## Big Wishlist (might be out of scope/complex/ecosystem)

- Should Babel operate multi-file/take in a dep graph?
- Should Babel use type info (from other things like ts/flow/runtime info)
- AST
  - Can we just move back to acorn + estree?
  - Should we switch to shift?
  - What about binary ast?
  - immutable? https://github.com/babel/babel/issues/4130#issuecomment-245411113

-->
