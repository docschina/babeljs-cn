---
title: 学习 ES2015
id: learn
---

<<<<<<< HEAD
<blockquote class="babel-callout babel-callout-info">
  <h3>es6 特性</h3>
  <p>
    本文源自 Luke Hoban 优秀的
    <a href="https://git.io/es6features">es6 特性</a>仓库。去 GitHub
    给他一个 star 吧！
  </p>
</blockquote>

<blockquote class="babel-callout babel-callout-info">
  <h4>REPL</h4>
  <p>
    一定要在线上的 <a href="/repl">REPL</a> 中
    尝试一下这些特性嗷！
  </p>
</blockquote>
=======
:::info es6features
This document was originally taken from Luke Hoban's excellent <a href="https://git.io/es6features">es6features</a> repo. Go give it a star
on GitHub!
:::

:::info REPL
Be sure to try these features out in the online <a href="/repl">REPL</a>.
:::
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e

## 简介

> ECMAScript 2015 是发布于 2015 年 6 月的 ECMAScript 标准。

ES2015 是对该语言的一次重大更新，也是自 2009 年 ES5 标准化以来对该语言的第一次重大更新。在主要的 JavaScript 引擎中，这些特性的实现[正在进行中](https://kangax.github.io/es5-compat-table/es6/)。

可阅读[ES2015 标准](http://www.ecma-international.org/ecma-262/6.0/index.html)
以了解 ECMAScript 2015 完整的语言规范。

## ECMAScript 2015 特性

<!-- To not break some existing links to here, just in case. -->
<a id="arrows"></a>

### 箭头函数和 this 作用域

箭头函数是一种使用 `=>` 语法的函数速记。
它们在语法上类似于 C#、Java 8 和 CoffeeScript 中的相关特性。
它们同时支持表达式和语句体两种写法。
不同于函数，箭头函数与其上下文代码共享相同的 `this`。
如果一个箭头函数在另一个函数里面，它共享其父函数的 "arguments "变量。

<<<<<<< HEAD
```js
// 表达式写法
=======
```js title="JavaScript"
// Expression bodies
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);

// 语句体写法
nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v);
});

// this 作用域
var bob = {
  _name: "Bob",
  _friends: [],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
};

// arguments 作用域
function square() {
  let example = () => {
    let numbers = [];
    for (let number of arguments) {
      numbers.push(number * number);
    }

    return numbers;
  };

  return example();
}

square(2, 4, 7.5, 8, 11.5, 21); // returns: [4, 16, 56.25, 64, 132.25, 441]
```

### 类

ES2015 的类是基于原型的面向对象模式的语法糖。
单一方便的声明形式使类模式更易用，并提升了互通性。
类支持基于原型的继承、父类调用、实例、
静态方法以及构造函数。

```js title="JavaScript"
class SkinnedMesh extends THREE.Mesh {
  constructor(geometry, materials) {
    super(geometry, materials);

    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    //...
  }
  update(camera) {
    //...
    super.update();
  }
  static defaultMatrix() {
    return new THREE.Matrix4();
  }
}
```

### 增强的对象字面量

对象字面量被扩展到在构造时支持设置原型、简写为`foo: foo`的赋值、
定义方法以及进行父类调用。
这些都使对象字面量和类声明更加接近，
并使基于对象的设计
从一些相同的便利中受益。

```js title="JavaScript"
var obj = {
    // 设置原型。"__proto__" 或者 '__proto__' 都可以。
    __proto__: theProtoObj,
    // 计算出的属性名称不会设置为原型，
    // 重复的 __proto__ 属性也不会在运行前报错。
    ['__proto__']: somethingElse,
    // ‘handler: handler’ 的简写
    handler,
    // 方法
    toString() {
     // 父类调用
     return "d " + super.toString();
    },
    // （动态）计算的属性名称
    [ "prop_" + (() => 42)() ]: 42
};
```

<<<<<<< HEAD
<blockquote class="babel-callout babel-callout-warning">
  <p>
   <code>__proto__</code> 属性必须得引擎原生支持，在前一版 ECMAScript 中已被弃用。大多数引擎现在仍然支持此属性，但 <a href="https://kangax.github.io/compat-table/es6/#__proto___in_object_literals">有些已不支持了</a>。另外，请注意，只有 <a href="http://www.ecma-international.org/ecma-262/6.0/index.html#sec-additional-ecmascript-features-for-web-browsers">web 游览器</a> 需要实现它，因为它在 <a href="http://www.ecma-international.org/ecma-262/6.0/index.html#sec-object.prototype.__proto__">附件 B</a> 中。它在 Node 中是可用的。
  </p>
</blockquote>
=======
:::caution
The <code>__proto__</code> property requires native support, and was deprecated in previous ECMAScript versions. Most engines now support the property, but <a href="https://kangax.github.io/compat-table/es6/#__proto___in_object_literals">some do not</a>. Also, note that only <a href="http://www.ecma-international.org/ecma-262/6.0/index.html#sec-additional-ecmascript-features-for-web-browsers">web browsers</a> are required to implement it, as it's in <a href="http://www.ecma-international.org/ecma-262/6.0/index.html#sec-object.prototype.__proto__">Annex B</a>. It is available in Node.
:::
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e

### 模版字符串

模版字符串为构造字符串提供语法糖。
这与 Perl、Python 等的字符串插值功能类似。
可以选择添加一个标签，以允许自定义字符串的构造，
避免注入攻击 或
从字符串内容中构造更高级别的数据结构。

<<<<<<< HEAD
```js
// 创建字符串字面量
=======
```js title="JavaScript"
// Basic literal string creation
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e
`This is a pretty little template string.`

// 多行字符串
`In ES5 this is
 not legal.`

// 插入变量绑定
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`

// 未转义的模版字符串
String.raw`In ES5 "\n" is a line-feed.`

// 构建一个 HTTP 请求前缀是用来解释可替换性和可构建性。
GET`http://foo.org/bar?a=${a}&b=${b}
    Content-Type: application/json
    X-Credentials: ${credentials}
    { "foo": ${foo},
      "bar": ${bar}}`(myOnReadyStateChangeHandler);
```

### 解构

解构允许使用模式匹配进行绑定，并支持匹配数组和对象。
解构是软失败的，类似于标准的对象查找 `foo["bar"]`，
在没有找到时提供 `undefined` 值。

<<<<<<< HEAD
```js
// 列表匹配
=======
```js title="JavaScript"
// list matching
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e
var [a, ,b] = [1,2,3];
a === 1;
b === 3;

// 对象匹配
var { op: a, lhs: { op: b }, rhs: c }
       = getASTNode()

// 对象匹配简写
// 在作用域内，绑定 `op`, `lhs` 和 `rhs`
var {op, lhs, rhs} = getASTNode()

// 也可用于参数
function g({name: x}) {
  console.log(x);
}
g({name: 5})

// 软失败解构
var [a] = [];
a === undefined;

// 带默认值的软失败解构
var [a = 1] = [];
a === 1;

// 解构与默认参数
function r({x, y, w = 10, h = 10}) {
  return x + y + w + h;
}
r({x:1, y:2}) === 23
```

### 默认值 + Rest + Spread

默认值就是调用执行的默认参数值。
在一个函数调用中把一个数组变成连续的参数。并将尾部参数绑定到一个数组—— Rest，
它可以取代对 `arguments` 的需求，也可以更直接地解决常见的情况。

```js title="JavaScript"
function f(x, y=12) {
  // 如果没有传值，y 是 12（或者传入的是 undefined）
  return x + y;
}
f(3) == 15
```
```js title="JavaScript"
function f(x, ...y) {
  // y 是一个数组
  return x * y.length;
}
f(3, "hello", true) == 6
```
```js title="JavaScript"
function f(x, y, z) {
  return x + y + z;
}
// 将数组的每一项作为参数传入
f(...[1,2,3]) == 6
```

### 变量 + 常量

拥有块级作用域的 `let` 是替代 `var` 的新的变量声明关键字。
`const`是一次赋值。在再次赋值前，静态限制防止会生效。


```js title="JavaScript"
function f() {
  {
    let x;
    {
      // 这是可以的，因为它是一个块范围
      const x = "sneaky";
      // 错误，因为上面是用 `const` 定义的。
      x = "foo";
    }
    // 这是可以的，因为它是用 `let` 声明的
    x = "bar";
    // 错误，因为在这个块级作用域中，x 已经声明过了
    let x = "inner";
  }
}
```

### 迭代器 + For..Of

迭代器对象实现了像 CLR IEnumerable 或 Java Iterable 一样的自定义迭代器。
将 `for...in` 泛化为基于自定义迭代器的 `for...of` 的迭代。
不需要实现一个数组，使懒惰的设计模式像
LINQ。

```js title="JavaScript"
let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur }
      }
    }
  }
}

for (var n of fibonacci) {
  // 在 1000 处截止该迭代
  if (n > 1000)
    break;
  console.log(n);
}
```

迭代器是基于这些鸭子类型的接口
（此处使用[TypeScript](https://www.typescriptlang.org/)类型语法举例，仅供参考）。

```ts
interface IteratorResult {
  done: boolean;
  value: any;
}
interface Iterator {
  next(): IteratorResult;
}
interface Iterable {
  [Symbol.iterator](): Iterator
}
```

<<<<<<< HEAD
<blockquote class="babel-callout babel-callout-info">
  <h4> 通过 polyfill 使用</h4>
  <p>
  为了使用迭代器，你必须引入 Babel <a href="/docs/usage/polyfill">polyfill</a>。
  </p>
</blockquote>
=======
:::info Support via polyfill
In order to use Iterators you must include the Babel <a href="/docs/babel-polyfill">polyfill</a>.
:::
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e

### 生成器

生成器使用 `function*` 和 `yield` 简化了迭代器的编写。
一个以 function* 声明的函数会返回一个生成器实例。
生成器是迭代器的子类型，包括额外的 `next` 和 `throw`。
这些使值能够回流到生成器中，
所以 `yield` 是一个返回值（或抛出）的表达形式。

注意：也可以用来启用类似 'await' 的异步编程，也可以参见 ES7 的 `await`[提案](https://github.com/lukehoban/ecmascript-asyncawait)。

```js title="JavaScript"
var fibonacci = {
  [Symbol.iterator]: function*() {
    var pre = 0, cur = 1;
    for (;;) {
      var temp = pre;
      pre = cur;
      cur += temp;
      yield cur;
    }
  }
}

for (var n of fibonacci) {
  // 在 1000 处截止该序列
  if (n > 1000)
    break;
  console.log(n);
}
```

生成器的接口是（使用[TypeScript](https://www.typescriptlang.org/)
语法举例说明）：

```ts
interface Generator extends Iterator {
    next(value?: any): IteratorResult;
    throw(exception: any);
}
```

<<<<<<< HEAD
<blockquote class="babel-callout babel-callout-info">
  <h4> 通过 polyfill 使用</h4>
  <p>
  为了使用生成器，你必须引入 Babel <a href="/docs/usage/polyfill">polyfill</a>。
  </p>
</blockquote>
=======
:::info Support via polyfill
In order to use Generators you must include the Babel <a href="/docs/babel-polyfill">polyfill</a>.
:::
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e

### Comprehensions

在 Babel 6.0 中已移除

### Unicode

非破坏性的添加，以支持完整的 Unicode 编码，
包括字符串中新的 unicode 字面形式和新的正则 `u` 模式来处理代码点，
以及新的 API 来处理 21 位代码点级别的字符串。
这些新增功能支持在 JavaScript 中构建全局应用程序。

<<<<<<< HEAD
```js
// 与 ES5.1 一样
=======
```js title="JavaScript"
// same as ES5.1
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e
"𠮷".length == 2

// 新的正则表达模式, opt-in ‘u’
"𠮷".match(/./u)[0].length == 2

// new form
"\u{20BB7}" == "𠮷"
"𠮷" == "\uD842\uDFB7"

// new String ops
"𠮷".codePointAt(0) == 0x20BB7

// for-of iterates code points
for(var c of "𠮷") {
  console.log(c);
}
```

### 模块化

语言层面上支持组件定义的模块。
编纂了流行的 JavaScript 模块加载器（AMD，CommonJS）的模式。
运行时行为由主机定义的默认加载器定义。
隐含的异步模式--在所请求的模块可用并被处理之前不会执行任何代码。

```js title="JavaScript"
// lib/math.js
export function sum(x, y) {
  return x + y;
}
export var pi = 3.141593;
```
```js title="JavaScript"
// app.js
import * as math from "lib/math";
console.log("2π = " + math.sum(math.pi, math.pi));
```
```js title="JavaScript"
// otherApp.js
import {sum, pi} from "lib/math";
console.log("2π = " + sum(pi, pi));
```

一些额外的功能包括 `export default` 和 `export *`：

```js title="JavaScript"
// lib/mathplusplus.js
export * from "lib/math";
export var e = 2.71828182846;
export default function(x) {
    return Math.exp(x);
}
```
```js title="JavaScript"
// app.js
import exp, {pi, e} from "lib/mathplusplus";
console.log("e^π = " + exp(pi));
```

<<<<<<< HEAD
<blockquote class="babel-callout babel-callout-info">
  <h4>模块格式化</h4>
  <p>
    Babel 可以将 ES2015 模块转译成几种不同的格式，
    包括 Common.js、AMD、System 和 UMD。你甚至可以创建你自己的格式。
    更多细节请查看<a href="/docs/plugins/">模块文档</a>。
  </p>
</blockquote>
=======
:::info Module Formatters
Babel can transpile ES2015 Modules to several different formats including
Common.js, AMD, System, and UMD. You can even create your own. For more
details see the <a href="/docs/plugins/">modules docs</a>.
:::
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e

### 模块加载器

<<<<<<< HEAD
<blockquote class="babel-callout babel-callout-warning">
  <h4>非 ES2015 标准部分</h4>
  <p>
    在 ECMAScript 2015 的规范中，这被留作实施定义。最终的标准将在 WHATWG 的 <a href="https://whatwg.github.io/loader/">Loader 规范</a>中，但那是目前正在进行的工作。下面的内容来自之前的 ES2015 草案。
  </p>
</blockquote>
=======
:::caution Not part of ES2015
This is left as implementation-defined within the ECMAScript 2015 specification. The eventual standard will be in WHATWG's <a href="https://whatwg.github.io/loader/">Loader specification</a>, but that is currently a work in progress. What is below is from a previous ES2015 draft.
:::
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e

模块加载器支持：

- 动态加载
- 状态隔离
- 全局命名空间隔离
- 编译钩子
- 嵌套虚拟化

可以配置默认的模块加载器，
也可以构建新的加载器来执行和加载被隔离或受限环境中的代码。

<<<<<<< HEAD
```js
// 动态加载 – ‘System’ 是默认的加载器
=======
```js title="JavaScript"
// Dynamic loading – ‘System’ is default loader
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e
System.import("lib/math").then(function(m) {
  alert("2π = " + m.sum(m.pi, m.pi));
});

// 创建一个执行沙盒 – 新的加载器
var loader = new Loader({
  global: fixup(window) // 替代 ‘console.log’
});
loader.eval("console.log(\"hello world!\");");

// 直接操作模块缓存
System.get("jquery");
System.set("jquery", Module({$: $})); // 警告：未定稿
```

<<<<<<< HEAD
<blockquote class="babel-callout babel-callout-warning">
  <h4>其他必须的 polyfill</h4>
  <p>
    由于 Babel 默认使用 common.js 模块，
    它不包括模块加载器 API 的 polyfill。
    可以从<a href="https://github.com/ModuleLoader/es6-module-loader">这里</a>获取其他 polyfill。
  </p>
</blockquote>

<blockquote class="babel-callout babel-callout-info">
  <h4>使用模块加载器</h4>
  <p>
    为了使用这个，你需要告诉 Babel 使用 <code>system</code> 模块格式化。
    也必须确保检查
    <a href="https://github.com/systemjs/systemjs">System.js</a>
  </p>
</blockquote>
=======
:::caution Additional polyfill needed
Since Babel defaults to using common.js modules, it does not include the
polyfill for the module loader API. Get it <a href="https://github.com/ModuleLoader/es6-module-loader">here</a>.
:::

:::info Using Module Loader
In order to use this, you'll need to tell Babel to use the <code>system</code> module formatter. Also be sure to check out <a href="https://github.com/systemjs/systemjs">System.js</a>.
:::
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e


### Map + Set + WeakMap + WeakSet

为常见的算法提供高效的数据结构。
WeakMaps 提供无泄漏的对象键的边表。

```js title="JavaScript"
// Sets
var s = new Set();
s.add("hello").add("goodbye").add("hello");
s.size === 2;
s.has("hello") === true;

// Maps
var m = new Map();
m.set("hello", 42);
m.set(s, 34);
m.get(s) == 34;

// Weak Maps
var wm = new WeakMap();
wm.set(s, { extra: 42 });
wm.size === undefined

// Weak Sets
var ws = new WeakSet();
ws.add({ data: 42 });
// 因为添加的对象没有其他引用，所以它不会被保存在集合中
```

<<<<<<< HEAD
<blockquote class="babel-callout babel-callout-info">
  <h4>通过 polyfill 使用</h4>
  <p>
    为了在所有环境中使用 Maps、 Sets、 WeakMaps 以及 WeakSets，你必须引入 Babel <a href="/docs/usage/polyfill">polyfill</a>.
  </p>
</blockquote>
=======
:::info Support via polyfill
In order to support Maps, Sets, WeakMaps, and WeakSets in all environments you must include the Babel <a href="/docs/babel-polyfill">polyfill</a>.
:::
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e

### 代理

代理使创建的对象具有目标对象的全部可用行为。
可用于拦截、对象虚拟化、
记录/归档等。

<<<<<<< HEAD
```js
// 代理一个普通对象
=======
```js title="JavaScript"
// Proxying a normal object
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e
var target = {};
var handler = {
  get: function (receiver, name) {
    return `Hello, ${name}!`;
  }
};

var p = new Proxy(target, handler);
p.world === "Hello, world!";
```

<<<<<<< HEAD
```js
// 代理一个函数对象
=======
```js title="JavaScript"
// Proxying a function object
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e
var target = function () { return "I am the target"; };
var handler = {
  apply: function (receiver, ...args) {
    return "I am the proxy";
  }
};

var p = new Proxy(target, handler);
p() === "I am the proxy";
```

所有的运行时级别的元操作都有 traps 可用：

```js title="JavaScript"
var handler =
{
  // target.prop
  get: ...,
  // target.prop = value
  set: ...,
  // 'prop' in target
  has: ...,
  // delete target.prop
  deleteProperty: ...,
  // target(...args)
  apply: ...,
  // new target(...args)
  construct: ...,
  // Object.getOwnPropertyDescriptor(target, 'prop')
  getOwnPropertyDescriptor: ...,
  // Object.defineProperty(target, 'prop', descriptor)
  defineProperty: ...,
  // Object.getPrototypeOf(target), Reflect.getPrototypeOf(target),
  // target.__proto__, object.isPrototypeOf(target), object instanceof target
  getPrototypeOf: ...,
  // Object.setPrototypeOf(target), Reflect.setPrototypeOf(target)
  setPrototypeOf: ...,
  // for (let i in target) {}
  enumerate: ...,
  // Object.keys(target)
  ownKeys: ...,
  // Object.preventExtensions(target)
  preventExtensions: ...,
  // Object.isExtensible(target)
  isExtensible :...
}
```

<<<<<<< HEAD
<blockquote class="babel-callout babel-callout-danger">
  <h4>不支持的特性</h4>
  <p>
    由于 ES5 的限制，代理不能被转译或 polyfill。可以查看 <a href="https://kangax.github.io/compat-table/es6/#test-Proxy">多种 JavaScript 引擎</a>的支持情况。
  </p>
</blockquote>
=======
:::danger Unsupported feature
Due to the limitations of ES5, Proxies cannot be transpiled or polyfilled. See support in <a href="https://kangax.github.io/compat-table/es6/#test-Proxy">various JavaScript engines</a>.
:::
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e

### Symbols

Symbol 实现了对对象状态的访问控制。Symbol 允许属性以 `string` （如 ES5）或 `Symbol` 为键。
Symbol 是一种新的原始类型。
可选的 `name` 参数可在调试中使用 - 但不是身份的一部分。
Symbol 是唯一的（就像 gensym），但不是私有的，
因为它们是通过反射功能（如`Object.getOwnPropertySymbols`）对外暴露的。

```js title="JavaScript"
(function() {

  // 模块范围内的符号
  var key = Symbol("key");

  function MyClass(privateData) {
    this[key] = privateData;
  }

  MyClass.prototype = {
    doStuff: function() {
      ... this[key] ...
    }
  };

  // Babel 可以有限支持 Symbol，完全支持还需要原生实现。
  typeof key === "symbol"
})();

var c = new MyClass("hello")
c["key"] === undefined
```

<<<<<<< HEAD
<blockquote class="babel-callout babel-callout-info">
  <h4>通过 polyfill 提供有限的支持</h4>
  <p>
    有限的支持依赖于 Babel <a href="/docs/usage/polyfill">polyfill</a>。由于语言级别的限制，一些功能并不能被转译或 polyfilled。详情查看 core.js's <a href="https://github.com/zloirock/core-js#caveats-when-using-symbol-polyfill">caveats  章节</a>。
  </p>
</blockquote>
=======
:::info Limited support via polyfill
Limited support requires the Babel <a href="/docs/babel-polyfill">polyfill</a>. Due to language limitations, some features can't be transpiled or polyfilled. See core.js's <a href="https://github.com/zloirock/core-js#caveats-when-using-symbol-polyfill">caveats section</a> for more details.
:::
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e

### 内置子类化

在 ES2015，如 `Array`、`Date` 和 DOM `Element`等可以被子类化。

<<<<<<< HEAD
```js
// 自定义 Array 子类
=======
```js title="JavaScript"
// User code of Array subclass
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e
class MyArray extends Array {
    constructor(...args) { super(...args); }
}

var arr = new MyArray();
arr[1] = 12;
arr.length == 2
```

<<<<<<< HEAD
<blockquote class="babel-callout babel-callout-warning">
  <h4>部分支持</h4>
  <p>
    内置的子类化只可以在个别基础类上执行，比如 <code>HTMLElement</code> <strong>可以</strong>被子类化。然而许多像 <code>Date</code>、<code>Array</code> 以及 <code>Error</code> 等由于 ES5 引擎的限制<strong>不能</strong>
  </p>
</blockquote>
=======
:::caution Partial support
Built-in subclassability should be evaluated on a case-by-case basis as classes such as <code>HTMLElement</code> <strong>can</strong> be subclassed while many such as <code>Date</code>, <code>Array</code> and <code>Error</code> <strong>cannot</strong> be due to ES5 engine limitations.
:::
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e

### Math + Number + String + Object APIs

增加了许多新的库，包括核心 Math 库、数组转换方法，
以及用于复制的 Object.assign。

```js title="JavaScript"
Number.EPSILON
Number.isInteger(Infinity) // false
Number.isNaN("NaN") // false

Math.acosh(3) // 1.762747174039086
Math.hypot(3, 4) // 5
Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2) // 2

"abcde".includes("cd") // true
"abc".repeat(3) // "abcabcabc"

Array.from(document.querySelectorAll("*")) // Returns a real Array
Array.of(1, 2, 3) // 与 new Array(...) 一样，但不具备特殊箭头函数行为。
[0, 0, 0].fill(7, 1) // [0,7,7]
[1,2,3].findIndex(x => x == 2) // 1
["a", "b", "c"].entries() // iterator [0, "a"], [1,"b"], [2,"c"]
["a", "b", "c"].keys() // iterator 0, 1, 2
["a", "b", "c"].values() // iterator "a", "b", "c"

Object.assign(Point, { origin: new Point(0,0) })
```

<<<<<<< HEAD
<blockquote class="babel-callout babel-callout-warning">
  <h4>通过 polyfill 提供有限支持</h4>
  <p>
    Babel <a href="/docs/usage/polyfill">polyfill</a> 支持大多数 API。
    但是由于各种原因，某些功能被省略了。
    (例如：<code>String.prototype.normalize</code> 需要大量额外代码来支持。）
    你可以在<a href="https://github.com/addyosmani/es6-tools#polyfills">这里</a>
    找到更多 polyfills。
  </p>
</blockquote>
=======
:::caution Limited support from polyfill
Most of these APIs are supported by the Babel <a href="/docs/babel-polyfill">polyfill</a>. However, certain features are omitted for various reasons (e.g. <code>String.prototype.normalize</code> needs a lot of additional code to support). You can find more polyfills <a href="https://github.com/addyosmani/es6-tools#polyfills">here</a>.
:::
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e

### 二进制和八进制字面量
为二进制（`b`）和八进制（`o`）增加了两种新的数字字面量。

```js title="JavaScript"
0b111110111 === 503 // true
0o767 === 503 // true
```

<<<<<<< HEAD
<blockquote class="babel-callout babel-callout-warning">
  <h4>只支持字面量形式</h4>
  <p>
    Babel 只能转译 <code>0o767</code> 却不能转译
    <code>Number("0o767")</code>.
  </p>
</blockquote>
=======
:::caution Only supports literal form
Babel is only able to transform <code>0o767</code> and not <code>Number("0o767")</code>.
:::
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e


### Promises

Promise 是一个用于异步编程的库。
Promise 是对未来可能提供的值的第一类表示。
Promise 在许多现有的 JavaScript 库中已有使用。

```js title="JavaScript"
function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    })
}

var p = timeout(1000).then(() => {
    return timeout(2000);
}).then(() => {
    throw new Error("hmm");
}).catch(err => {
    return Promise.all([timeout(100), timeout(200)]);
})
```

<<<<<<< HEAD
<blockquote class="babel-callout babel-callout-info">
  <h4>通过 polyfill 支持</h4>
  <p>
    为了支持 Promise，你必须引入 Babel <a href="/docs/usage/polyfill">polyfill</a>.
  </p>
</blockquote>
=======
:::info Support via polyfill
In order to support Promises you must include the Babel <a href="/docs/babel-polyfill">polyfill</a>.
:::
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e

### 反射 API

完整的反射 API，暴露了对象上的运行时间级别的元操作。
这实际上是代理 API 的逆向，
并允许进行与代理 trap 相同的元操作的调用。
对于实现代理特别有用。

```js title="JavaScript"
var O = {a: 1};
Object.defineProperty(O, 'b', {value: 2});
O[Symbol('c')] = 3;

Reflect.ownKeys(O); // ['a', 'b', Symbol(c)]

function C(a, b){
  this.c = a + b;
}
var instance = Reflect.construct(C, [20, 22]);
instance.c; // 42
```

<<<<<<< HEAD
<blockquote class="babel-callout babel-callout-info">
  <h4>通过 polyfill 支持</h4>
  <p>
    为了支持反射，你必须引入 Babel <a href="/docs/usage/polyfill">polyfill</a>.
  </p>
</blockquote>
=======
:::info Support via polyfill
In order to use the Reflect API you must include the Babel <a href="/docs/babel-polyfill">polyfill</a>.
:::
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e

### 尾调用

在尾部位置的调用被保证不会使堆栈无限制地增长。
使得递归算法在面对无界的输入时是安全的。

```js title="JavaScript"
function factorial(n, acc = 1) {
    "use strict";
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}

// 在今天的大多数实现中，堆栈溢出。
// 但在 ES2015 中对任意输入是安全的
factorial(100000)
```

<<<<<<< HEAD
<blockquote class="babel-callout babel-callout-warning">
  <h4>在 Babel 6 中暂时删除了</h4>
  <p>
    由于全局支持尾部调用的复杂性和性能影响，
    只支持显式自引用尾部递归。
    由于其他 Bug 而被删除，将被重新实现。
  </p>
</blockquote>
=======
:::caution Temporarily Removed in Babel 6
Only explicit self referencing tail recursion was supported due to the
complexity and performance impact of supporting tail calls globally.
Removed due to other bugs and will be re-implemented.
:::
>>>>>>> 4748a8229ae31f9a9e3794606e16bdea7fd7fd2e
