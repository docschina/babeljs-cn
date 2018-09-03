---
title: 学习 ES2015
id: version-7.0.0-learn
original_id: learn
---

<blockquote class="babel-callout babel-callout-info">
  <h3>es6 功能</h3>
  <p>
    本文档最初来自 Luke Hoban 的优秀文章
    <a href="https://git.io/es6features">es6 功能</a> 。 
    去 GitHub 上给它一个 start 吧！
  </p>
</blockquote>

<blockquote class="babel-callout babel-callout-info">
  <h4>REPL</h4>
  <p>
    确定在线尝试这些功能
    <a href="/repl">REPL</a>.
  </p>
</blockquote>

## 介绍

> ECMAScript 2015是一项 ECMAScript 标准，于2015年6月批准。

ES2015 是 JS 的重要更新，也是自2009年 ES5 标准化以来该语言的第一次重大更新。现在正在主要 JavaScript 引擎中[实现](https://kangax.github.io/es5-compat-table/es6/)这些功能。

有关 ECMAScript 2015语言的完整规范，请参阅 [ES2015 标准](http://www.ecma-international.org/ecma-262/6.0/index.html)。

## ECMAScript 2015 功能

<!-- To not break some existing links to here, just in case. -->
<a id="arrows"></a>

### 箭头函数

箭头函数是使用 `=>` 语法的函数简写。
它们在语法上类似于 C＃，Java 8和 CoffeeScript 中的相关功能。
它们支持表达式和语句体。
与函数不同，箭头与周围的代码共享相同的 `this` 。
如果箭头在另一个函数内，它共享其父函数的“ arguments ”变量。

```js
// Expression bodies
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);

// Statement bodies
nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v);
});

// Lexical this
var bob = {
  _name: "Bob",
  _friends: [],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
};

// Lexical arguments
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

ES 2015中类比基于原型的面向对象模式简单。拥有一个方便的声明形式使类模式更易于使用，并鼓励互用性。类支持基于原型的继承，超级调用，实例和静态方法以及构造函数。

```js
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

对象字面量扩展了支持在构造时设置原型， `foo: foo` 赋值的简写，定义方法和进行超级调用。它们使对象字面量和类声明更加紧密，让基于对象的设计从中获得一些便利。

```js
var obj = {
    // Sets the prototype. "__proto__" or '__proto__' would also work.
    __proto__: theProtoObj,
    // Computed property name does not set prototype or trigger early error for
    // duplicate __proto__ properties.
    ['__proto__']: somethingElse,
    // Shorthand for ‘handler: handler’
    handler,
    // Methods
    toString() {
     // Super calls
     return "d " + super.toString();
    },
    // Computed (dynamic) property names
    [ "prop_" + (() => 42)() ]: 42
};
```

<blockquote class="babel-callout babel-callout-warning">
  <p>
    <code>__proto__</code> 属性需要原生支持，并且在之前的 ECMAScript 版本中已弃用。大多数引擎现在支持该属性，但<a href="https://kangax.github.io/compat-table/es6/#__proto___in_object_literals">有些</a>则不支持。此外，请注意，只有<a href="http://www.ecma-international.org/ecma-262/6.0/index.html#sec-additional-ecmascript-features-for-web-browsers"> web 浏览器</a>才能实现它，如<a href="http://www.ecma-international.org/ecma-262/6.0/index.html#sec-object.prototype.__proto__"> Annex B </a>中所示。它在 Node 中是可用的。
  </p>
</blockquote>

### 模板字符串

模板字符串为构造字符串提供语法糖。这类似于 Perl，Python 等中的字符串插值功能。可选地，可以添加标签以允许定制字符串构造，避免注入攻击或从字符串内容构造更高级别的数据结构。

```js
// Basic literal string creation
`This is a pretty little template string.`

// Multiline strings
`In ES5 this is
 not legal.`

// Interpolate variable bindings
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`

// Unescaped template strings
String.raw`In ES5 "\n" is a line-feed.`

// Construct an HTTP request prefix is used to interpret the replacements and construction
GET`http://foo.org/bar?a=${a}&b=${b}
    Content-Type: application/json
    X-Credentials: ${credentials}
    { "foo": ${foo},
      "bar": ${bar}}`(myOnReadyStateChangeHandler);
```

### 解构

解构允许使用模式匹配进行绑定，并支持匹配数组和对象。解构是一种故障弱化，类似于标准对象查找 `foo["bar"]`，在未找到时生成 `undefined`。

```js
// list matching
var [a, ,b] = [1,2,3];
a === 1;
b === 3;

// object matching
var { op: a, lhs: { op: b }, rhs: c }
       = getASTNode()

// object matching shorthand
// binds `op`, `lhs` and `rhs` in scope
var {op, lhs, rhs} = getASTNode()

// Can be used in parameter position
function g({name: x}) {
  console.log(x);
}
g({name: 5})

// Fail-soft destructuring
var [a] = [];
a === undefined;

// Fail-soft destructuring with defaults
var [a = 1] = [];
a === 1;

// Destructuring + defaults arguments
function r({x, y, w = 10, h = 10}) {
  return x + y + w + h;
}
r({x:1, y:2}) === 23
```

### 默认值 + Rest 参数 + 扩展运算符

支持由被调用函数进行求值的参数默认值。 在函数调用时使用...运算符，可以将作为参数的数组拆解为连续的多个参数。在函数定义时使用 `...` 运算符，则可以将函数尾部的多个参数绑定到一个数组中。Rest 参数取代了 `arguments`，并可更直接地应用于通常的用例中。

```js
function f(x, y=12) {
  // y is 12 if not passed (or passed as undefined)
  return x + y;
}
f(3) == 15
```
```js
function f(x, ...y) {
  // y is an Array
  return x * y.length;
}
f(3, "hello", true) == 6
```
```js
function f(x, y, z) {
  return x + y + z;
}
// Pass each elem of array as argument
f(...[1,2,3]) == 6
```

### Let + Const

块级作用域的绑定构造函数。`let` 是新的 `var`，`const` 是单一赋值。此两种操作符具有静态限制，可以防止出现“在赋值之前使用”的错误。

```js
function f() {
  {
    let x;
    {
      // this is ok since it's a block scoped name
      const x = "sneaky";
      // error, was just defined with `const` above
      x = "foo";
    }
    // this is ok since it was declared with `let`
    x = "bar";
    // error, already declared above in this block
    let x = "inner";
  }
}
```

### Iterators + For..Of 循环

Iterator 对象支持自定义迭代，如 CLR IEnumerable 或 Java Iterable。使用 `for..of` 将 `for..in` 转换为基于自定义迭代器的迭代。不需要实现数组，支持像 LINQ 一样的惰性设计模式。

```js
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
  // truncate the sequence at 1000
  if (n > 1000)
    break;
  console.log(n);
}
```

Iteration 基于这些 duck-typed 接口（仅使用[TypeScript](http://typescriptlang.org)类型语法进行展示）：

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

<blockquote class="babel-callout babel-callout-info">
  <h4>通过 polyfill 支持</h4>
  <p>
    为了使用 Iterators 必须使用 Babel <a href="/docs/usage/polyfill">polyfill</a>。
  </p>
</blockquote>

### Generators 函数

生成器使用 `function*` 和 `yield` 简化迭代器编写。形如 function* 的函数声明返回一个 Generator 实例。Generators 是迭代器的子类型，包括额外的 `next` 和 `throw`。这使得值能够流回到 generator 中，因此 `yield` 是一个返回值（或抛出）的表达式形式。

注意：也可以被用作类似‘await’一样的异步编程中，具体细节查看 `await` [提案](https://github.com/lukehoban/ecmascript-asyncawait).

```js
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
  // truncate the sequence at 1000
  if (n > 1000)
    break;
  console.log(n);
}
```

 生成器接口如下(此处使用 [TypeScript](http://typescriptlang.org) 的类型语法，仅用于阐述问题)：

```ts
interface Generator extends Iterator {
    next(value?: any): IteratorResult;
    throw(exception: any);
}
```

<blockquote class="babel-callout babel-callout-info">
  <h4>通过 polyfill 支持</h4>
  <p>
    为了使用 Iterators 必须使用 Babel <a href="/docs/usage/polyfill">polyfill</a>。
  </p>
</blockquote>

### 数组推导式

在 Babel 6.0 剔除

### Unicode 统一码

渐进增强地、非破坏性地全面支持 Unicode。字符串支持新的 Unicode 文本形式，也增加了新的正则表达式修饰符 `u` 来处理码位，同时，新的 API 可以在21 bit 码位级别上处理字符串，增加这些支持后可以使用 Javascript 构建全球化的应用。 

```js
// same as ES5.1
"𠮷".length == 2

// new RegExp behaviour, opt-in ‘u’
"𠮷".match(/./u)[0].length == 2

// new form
"\u{20BB7}" == "𠮷" == "\uD842\uDFB7"

// new String ops
"𠮷".codePointAt(0) == 0x20BB7

// for-of iterates code points
for(var c of "𠮷") {
  console.log(c);
}
```

### Modules 模块

ES6 在语言层面上支持使用模块来进行组件定义，将流行的 JavaScript 模块加载器（AMD、CommonJS）中的模式固化到了语言中。运行时行为由宿主定义的默认加载器定义，隐式异步模型 - 直到（全部）请求的模块均可用且经处理后，才会执行（当前模块内的）代码。

```js
// lib/math.js
export function sum(x, y) {
  return x + y;
}
export var pi = 3.141593;
```
```js
// app.js
import * as math from "lib/math";
console.log("2π = " + math.sum(math.pi, math.pi));
```
```js
// otherApp.js
import {sum, pi} from "lib/math";
console.log("2π = " + sum(pi, pi));
```

额外的新特性，包括 `export default` 以及 `export *`:

```js
// lib/mathplusplus.js
export * from "lib/math";
export var e = 2.71828182846;
export default function(x) {
    return Math.exp(x);
}
```
```js
// app.js
import exp, {pi, e} from "lib/mathplusplus";
console.log("e^π = " + exp(pi));
```

<blockquote class="babel-callout babel-callout-info">
  <h4>模块格式化</h4>
  <p>
    Babel 可以将 ES 2015模块转换为几种不同的格式，包括 Common.js，AMD，System 和 UMD。你甚至可以创建自己的。有关更多详细信息，请参阅<a href="/docs/plugins/">modules 文档</a>。
  </p>
</blockquote>

### Module Loaders 模块加载器

<blockquote class="babel-callout babel-callout-warning">
  <h4>不属于 ES2015</h4>
  <p>
    这保留在 ECMAScript 2015规范中的实现定义中。最终标准将在 WHATWG 的<a href="https://whatwg.github.io/loader/"> Loader 规范</a>中，但目前正在进行中。以下内容来自之前的 ES 2015草案。
  </p>
</blockquote>

模块加载器支持:

- 动态加载
- 状态隔离
- 全局命名空间隔离
- 编译钩子
- 嵌套虚拟化

默认的模块加载器是可配置的，也可以构建新的加载器，对在隔离和受限上下文中的代码进行求值和加载

```js
// Dynamic loading – ‘System’ is default loader
System.import("lib/math").then(function(m) {
  alert("2π = " + m.sum(m.pi, m.pi));
});

// Create execution sandboxes – new Loaders
var loader = new Loader({
  global: fixup(window) // replace ‘console.log’
});
loader.eval("console.log(\"hello world!\");");

// Directly manipulate module cache
System.get("jquery");
System.set("jquery", Module({$: $})); // WARNING: not yet finalized
```

<blockquote class="babel-callout babel-callout-warning">
  <h4>额外需要 polyfill </h4>
  <p>
    由于 Babel 默认使用 common.js 模块，因此它不包含模块加载器 API 的 polyfill。从<a href="https://github.com/ModuleLoader/es6-module-loader">这里</a>获取。
  </p>
</blockquote>

<blockquote class="babel-callout babel-callout-info">
  <h4>使用模块加载器</h4>
  <p>
    为了使用，你需要告诉 Babel 使用
    <code>system</code> 模块格式化. 另外请务必查看
    <a href="https://github.com/systemjs/systemjs">System.js</a>。
  </p>
</blockquote>


### Map + Set + WeakMap + WeakSet

用于实现常见算法的高效数据结构。WeakMaps 提供不会泄露的对象键索引表。

```js
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
// Because the added object has no other references, it will not be held in the set
```

<blockquote class="babel-callout babel-callout-info">
  <h4>通过 polyfill 支持</h4>
  <p>
    为了在所有环境下支持 Maps, Sets, WeakMaps, 和 WeakSets，需要使用 Babel <a href="/docs/usage/polyfill">polyfill</a>。
  </p>
</blockquote>

### Proxies

代理可以创造一个具备宿主对象全部可用行为的对象。可用于拦截、对象虚拟化、日志/分析等。

```js
// Proxying a normal object
var target = {};
var handler = {
  get: function (receiver, name) {
    return `Hello, ${name}!`;
  }
};

var p = new Proxy(target, handler);
p.world === "Hello, world!";
```

```js
// Proxying a function object
var target = function () { return "I am the target"; };
var handler = {
  apply: function (receiver, ...args) {
    return "I am the proxy";
  }
};

var p = new Proxy(target, handler);
p() === "I am the proxy";
```

所有运行时级别的元操作都有对应的陷阱：

```js
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

<blockquote class="babel-callout babel-callout-danger">
  <h4>不支持的功能</h4>
  <p>
    由于 ES5 的限制，代理无法进行转换或填充。请参阅<a href="https://kangax.github.io/compat-table/es6/#test-Proxy">各种 JavaScript 引擎</a>中的支持。
  </p>
</blockquote>

### Symbols

Symbol 能够实现针对对象状态的访问控制，允许使用 `string` (与ES5相同)或 `symbol` 作为键来访问属性。符号是一个新的原语类型，可选的 `name` 参数可以用于调试——但并不是符号身份的一部分。符号是独一无二的(如同 gensym（所产生的符号）)，但不是私有的，因为它们可以通过类似 `Object.getOwnPropertySymbols` 的反射特性暴露出来。

```js
(function() {

  // module scoped symbol
  var key = Symbol("key");

  function MyClass(privateData) {
    this[key] = privateData;
  }

  MyClass.prototype = {
    doStuff: function() {
      ... this[key] ...
    }
  };

  // Limited support from Babel, full support requires native implementation.
  typeof key === "symbol"
})();

var c = new MyClass("hello")
c["key"] === undefined
```

<blockquote class="babel-callout babel-callout-info">
  <h4>通过 polyfill 有限的支持</h4>
  <p>
    有限的支持需要 Babel <a href="/docs/usage/polyfill">polyfill</a>。由于语言限制，某些功能无法转换或填充。有关更多详细信息，请参阅 core.js 的<a href="https://github.com/zloirock/core-js#caveats-when-using-symbol-polyfill">警告部分</a>。
  </p>
</blockquote>

### 可子类化的内建对象

在 ES 2015中，可以对 `Array`, `Date` 和 DOM `Element` 等内置函数进行子类化。

```js
// User code of Array subclass
class MyArray extends Array {
    constructor(...args) { super(...args); }
}

var arr = new MyArray();
arr[1] = 12;
arr.length == 2
```

<blockquote class="babel-callout babel-callout-warning">
  <h4>部分支持</h4>
  <p>
    应根据具体情况评估内置子类可分性，因为<code>HTMLElement</code>等类<strong>可以</strong>进行子类化，而许多例如<code>Date</code>，<code>Array</code> 和 <code>Error</code> 由于 ES5 引擎限制不能子类化。
  </p>
</blockquote>

### Math + Number + String + Object APIs

新加入了许多库，包括核心数学库，进行数组转换的协助函数，字符串 helper，以及用来进行拷贝的 Object.assign。

```js
Number.EPSILON
Number.isInteger(Infinity) // false
Number.isNaN("NaN") // false

Math.acosh(3) // 1.762747174039086
Math.hypot(3, 4) // 5
Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2) // 2

"abcde".includes("cd") // true
"abc".repeat(3) // "abcabcabc"

Array.from(document.querySelectorAll("*")) // Returns a real Array
Array.of(1, 2, 3) // Similar to new Array(...), but without special one-arg behavior
[0, 0, 0].fill(7, 1) // [0,7,7]
[1,2,3].findIndex(x => x == 2) // 1
["a", "b", "c"].entries() // iterator [0, "a"], [1,"b"], [2,"c"]
["a", "b", "c"].keys() // iterator 0, 1, 2
["a", "b", "c"].values() // iterator "a", "b", "c"

Object.assign(Point, { origin: new Point(0,0) })
```

<blockquote class="babel-callout babel-callout-warning">
  <h4>通过 polyfill 有限的支持</h4>
  <p>
    Babel <a href="/docs/usage/polyfill">polyfill</a> 支持大多数这些 API。但是，由于各种原因省略了某些功能（例如，<code>String.prototype.normalize</code> 需要许多额外的代码来支持）。你可以在<a href="https://github.com/addyosmani/es6-tools#polyfills">这里</a>找到更多的填料。
  </p>
</blockquote>

### 二进制和八进制字面量
加入对二进制( `b` )和八进制( `o` )字面量的支持。

```js
0b111110111 === 503 // true
0o767 === 503 // true
```

<blockquote class="babel-callout babel-callout-warning">
  <h4>仅支持字面量形式</h4>
  <p>
    Babel 只能转换 <code>0o767</code> 而不是<code>Number("0o767")</code>。
  </p>
</blockquote>


### Promises

Promise 是用来进行异步编程的库。Promise 是对一个“将来可能会变得可用”的值的第一类表示，Promise 被使用在现有的许多 JavaScript 库中。

```js
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

<blockquote class="babel-callout babel-callout-info">
  <h4>通过 polyfill 支持</h4>
  <p>
    为了支持 Promises 需要使用 Babel <a href="/docs/usage/polyfill">polyfill</a>.
  </p>
</blockquote>

### Reflect API

完整的反射 API。此 API 在对象上暴露了运行时级别的元操作，从效果上来说，这是一个反代理 API，并允许调用与代理陷阱中相同的元操作。实现代理非常有用。

```js
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

<blockquote class="babel-callout babel-callout-info">
  <h4>通过 polyfill 支持</h4>
  <p>
    为了支持 Reflect API 需要使用 Babel <a href="/docs/usage/polyfill">polyfill</a>.
  </p>
</blockquote>

### Tail Calls

ES6 保证尾部调用时栈不会无限增长，这使得递归算法在面对未作限制的输入时，能够安全地执行。

```js
function factorial(n, acc = 1) {
    "use strict";
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}

// Stack overflow in most implementations today,
// but safe on arbitrary inputs in ES2015
factorial(100000)
```

<blockquote class="babel-callout babel-callout-warning">
  <h4>暂时在 Babel 6中删除</h4>
  <p>
    由于全局支持尾调用的复杂性和性能影响，仅支持显式自引用尾递归。由于其他错误而被删除，将重新实施。
  </p>
</blockquote>
