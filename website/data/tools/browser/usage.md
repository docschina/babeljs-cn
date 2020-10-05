
<<<<<<< HEAD
<h4>使用 babel-standalone </h4>
=======
<h4>With @babel/standalone</h4>
>>>>>>> 7ae691a15da4168e1d53c274a67fee118648d8a9

```html
<div id="output"></div>
<!-- 加载 Babel -->
<!-- <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script> -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<!-- 你的脚本代码 -->
<script type="text/babel">
const getMessage = () => "Hello World";
document.getElementById('output').innerHTML = getMessage();
</script>
```

<blockquote class="babel-callout babel-callout-info">
  <p>
    See <a href="/docs/babel-standalone">docs</a> for full documentation on <code>@babel/standalone</code>.
  </p>
</blockquote>
