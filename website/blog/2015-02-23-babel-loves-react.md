---
layout: post
title:  "Babel 喜爱 React"
author: James Kyle
authorURL: https://twitter.com/thejameskyle
date:   2015-02-23 10:00:00
categories: announcements
share_text: "Babel <3 React"
---

令人惊讶的事情之一就是 Babel
支持开箱即用的 JSX。

<!--truncate-->

我们会告诉你切换到支持 JSX 的环境是多么容易：

<<<<<<< HEAD
> **注意：**想要使用 Babel 有_很多_不同的方式，这里只是列出其中一些。
> 如果你需要列出更加完整的使用方式，
> 请查看我们的 [使用指南](/docs/en/usage)<!--/docs/using-babel/--> 页面。

**在浏览器中** ([文档](/setup#installation)<!--/docs/usage/browser/-->)
=======
> **Note:** There are _tons_ of ways to use Babel, I'll only list a few of them
> here. If you'd like to see a more complete list check out our
> [Using Babel](/setup) page.

**In the Browser** ([docs](/setup#browser/))
>>>>>>> c2717fdcae14326582db5938a40667c63160ef8a

原先：

```html
<script type='text/jsx'></script>
```

以后：

```html
<script type='text/babel'></script>
```

<<<<<<< HEAD
**在 Browserify 中** ([文档](/setup#installation)<!--/docs/using-babel/#browserify-->)
=======
**In Browserify** ([docs](/setup#browserify))
>>>>>>> c2717fdcae14326582db5938a40667c63160ef8a

原先：

```sh title="Shell"
$ browserify -t reactify main.js
```

以后：

```sh title="Shell"
$ browserify -t babelify main.js
```

<<<<<<< HEAD
**在 Node 中** ([文档](/setup#installation)<!--/docs/usage/require/-->)
=======
**In Node** ([docs](/setup#require/))
>>>>>>> c2717fdcae14326582db5938a40667c63160ef8a

原先：

```js title="JavaScript"
require('node-jsx').install();
```

以后：

```js title="JavaScript"
require('babel/register');
````

<<<<<<< HEAD
**在 webpack 中** ([文档](/setup#installation)<!--/docs/using-babel/#webpack-->)
=======
**In Webpack** ([docs](/setup#webpack))
>>>>>>> c2717fdcae14326582db5938a40667c63160ef8a

原先：

```js title="JavaScript"
loaders: [
  { test: /\.js$/, exclude: /node_modules/, loader: 'jsx-loader'}
]
```

以后：

```js title="JavaScript"
loaders: [
  { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
]
```

<<<<<<< HEAD
**在 Gulp 中** ([文档](/setup#installation)<!--/docs/using-babel/#gulp-->)
=======
**In Gulp** ([docs](/setup#gulp))
>>>>>>> c2717fdcae14326582db5938a40667c63160ef8a

原先：

```js title="JavaScript"
gulp.src('views/**/*.js')
    .pipe(jsx())
    .pipe(gulp.dest('dist'));
```

以后：

```js title="JavaScript"
gulp.src('views/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
```

---

<<<<<<< HEAD
还有很多未列出的，但你现在应该知道配置已经变得简单起来。
如果你没有看到正在寻找的工具，请不要担心，
在 [使用指南](/docs/en/usage)<!--/docs/using-babel/--> 页面中完整列出了所有的使用方式。

如果你需要更多设置的帮助，
请务必阅读我们的 [JSX](/docs/usage/jsx/)<!----> 文档，
或者在我们的 [聊天支持](https://gitter.im/babel/babel) 中询问其他 Babel 用户。
=======
The list goes on, but you probably get how simple it is by now. If you didn't
see the tool you are looking for don't worry we have a full list of them on our
[Using Babel](/setup) page.

If you need more help getting setup be sure to read our [JSX](/setup#jsx/)
docs or come ask other Babel users in our
[support chat](https://gitter.im/babel/babel).
>>>>>>> c2717fdcae14326582db5938a40667c63160ef8a

<p class="text-right">— 来自 Babel 团队</p>
