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

> **Note:** There are _tons_ of ways to use Babel, I'll only list a few of them
> here. If you'd like to see a more complete list check out our
> [Using Babel](/setup) page.

**In the Browser** ([docs](/setup#browser/))

原先：

```html
<script type='text/jsx'></script>
```

以后：

```html
<script type='text/babel'></script>
```

**In Browserify** ([docs](/setup#browserify))

原先：

```sh title="Shell"
$ browserify -t reactify main.js
```

以后：

```sh title="Shell"
$ browserify -t babelify main.js
```

**In Node** ([docs](/setup#require/))

原先：

```js title="JavaScript"
require('node-jsx').install();
```

以后：

```js title="JavaScript"
require('babel/register');
````

**In Webpack** ([docs](/setup#webpack))

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

**In Gulp** ([docs](/setup#gulp))

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

The list goes on, but you probably get how simple it is by now. If you didn't
see the tool you are looking for don't worry we have a full list of them on our
[Using Babel](/setup) page.

If you need more help getting setup be sure to read our [JSX](/setup#jsx/)
docs or come ask other Babel users in our
[support chat](https://gitter.im/babel/babel).

<p class="text-right">— 来自 Babel 团队</p>
