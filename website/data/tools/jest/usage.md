在你的 `package.json` 文件中作出如下变化：

```json title="JSON"
{
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "transform": {
      "^.+\\.[t|j]sx?$": "babel-jest"
    }
  }
}
```

<blockquote class="alert alert--info">
  <p>
    欲了解更多信息，请参阅 <a href="https://github.com/facebook/jest/tree/master/packages/babel-jest">babel/babel-jest 项目</a>。
  </p>
</blockquote>

