---
layout: post
title:  "并非出生而逐渐走向灭亡"
author: James Kyle
authorURL: https://twitter.com/thejameskyle
date:   2015-02-15 9:18:00
categories: announcements
share_text: "Not Born to Die: 6to5 has been renamed to Babel"
---

我想从 6to5 最新重大事件发生后都开始写博客文章。虽然还没有发生重大事件，不过这几天的时间，6to5 和 6to5-core 已经被下载**五十万次**，并且在一个月时间内将会超过**一百万次**。

过去，对于 6to5 在 JavaScript 社区中的所处角色存在一些混淆，这在很大程度上是由于它的名称产生的误解导致。

但是 6to5 并非出生而逐渐走向灭亡。

<!--truncate-->

即使所有环境都开始支持 JavaScript 的下代版本，6to5 中的工作仍将继续在社区中发挥着重要作用。

这是因为，从压缩工具(minifier)到美化工具(beautifier)、从代码检查工具(linter)到代码覆盖工具(code coverage instrumentor)、可编译到 JavaScript 的语言和语法扩展、代码高亮等这些功能来看，几乎任何编程语言的任何工具都相当重度地依赖于两件事：解析器(parser)和转译器(transpiler)。

在 JavaScript 中这些工具的历史很长、情况也很难受。每个人都在不断地重新实现相同的东西，造成了绝对的混乱。这也是新的语言特性花费很长时间推出的首要原因（比如“我喜欢使用箭头函数，但是它会破坏我们的代码覆盖率”）。

幸运的是，目前有很多人正在做的工作会改善这一点。

最近，来自 Mozilla, Esprima, jQuery 基金会, Acorn, 6to5, ESLint 和其他组织的许多人聚集在一起，共同创建了 [ESTree](https://github.com/estree/estree)，这是一个标准，所有解析器和转移器工具都将基于此标准。

我们希望 6to5 能够解决转译需求。如果社区可以整合围绕在一个能够提供坚实基础的工具，来处理大量共同的问题，那么我们将会变得更好。

这可能听起来有点荒谬，像是一个相当崇高的目标。很多人会认为这__超出了 “6to5” 的范围__。

所以，我想此时重新命名这个项目是个好的想法！

6to5 现在重生为 Babel。

Babel 将继续作为使用最新标准的 JavaScript 转移器，但也将开始为其他工具开放其 API。任何在内部参与该项目的人，都知道 Babel 非常易用。

我们对未来感到异常兴奋，我们希望我们能够对 JavaScript 社区产生更大的影响。

总是押注 JavaScript(always bet on JavaScript)。

<p class="text-right">— 来自当前的 Babel 团队</p>
