
<<<<<<< HEAD
<h4>使用 babel-standalone </h4>
=======
<h4>With @babel/standalone</h4>
>>>>>>> 6b46b573105807b72b0dfb1451ee3ca0852e20b8

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
