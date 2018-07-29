---
title: 学习 ES2015
id: version-6.x-learn
original_id: learn
---

<blockquote class="babel-callout babel-callout-info">
  <h3>es6功能</h3>
  <p>
    这份文档最初来自于 Luke Hoban 的优秀仓库
    <a href="https://git.io/es6features">es6features</a>。 在Github上给个star吧!
    
  </p>
</blockquote>

<blockquote class="babel-callout babel-callout-info">
  <h4>交互式编程环境</h4>
  <p>
    请务必在网上亲自<a href="/repl">试验</a>这些功能。
  </p>
</blockquote>

## 简介

> ECMAScript 2015 是2015年6月被批准的ECMAScript标准。   

ES2015 是语言的一次重大更新，也是自2009年ES5标准确定后的第一个重大更新，目前主流的JavaScript引擎中的实现进展[在这里](https://kangax.github.io/es5-compat-table/es6/)。    

查看 [ES2015版本的完整规范](http://www.ecma-international.org/ecma-262/6.0/index.html)


## ECMAScript 2015 功能

<!-- To not break some existing links to here, just in case. -->
<a id="arrows"></a>

### 箭头函数与this语法(Arrows and Lexical This)

箭头函数用 `=>` 来代表一个函数，语法上类似于C#, Java8和CoffeeScript中的相关特性。他同时支持表达式（Expression bodies）和语句（Statement bodies）的写法。值得注意的是，与一般的函数不同，箭头函数与包裹它的代码共享相同的`this`对象，如果箭头函数在其他函数的内部，它也将共享该函数的`arguments`变量。

```js
// 表达式写法 Expression bodies
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);

// 语句写法 Statement bodies
nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v);
});

//  this 对象
var bob = {
  _name: "Bob",
  _friends: [],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
};

// arguments 对象
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

### 类(Classes)
ES2015的类只是一个语法糖，通过class关键字让语法更接近传统的面向对象模式，本质上还是基于原型的。使用单一便捷的声明格式，使得类使用起来更方便，也更具互操作性。类支持基于原型的继承，调用父类的构造函数，生成实例，静态方法和构造函数。  

```js
class SkinnedMesh extends THREE.Mesh {
  constructor(geometry, materials) {
    // 调用父类的构造函数 super是父类的实例
    super(geometry, materials);

    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    //...
  }
  update(camera) {
    //调用this.update()
    super.update();
  }

  // 静态方法
  static defaultMatrix() {
    return new THREE.Matrix4();
  }
}
```

### 增强的对象字面量(Enhanced Object Literals)

经扩展后的对象字面量，允许在结构中设置原型，简化了`foo: foo`这样的赋值，定义方法和调用父级。这样使得对象字面量更接近类的声明，并且使得基于对象的设计更加方便。

```js
var obj = {
    // 设置 prototype
    __proto__: theProtoObj,
    // 计算属性不会重复设置__proto__，或者将直接触发错误。
    ['__proto__']: somethingElse,
    // ‘handler: handler’ 简写
    handler,
    // 方法
    toString() {
     // 调用父级方法
     return "d " + super.toString();
    },
    // 设置动态的属性名
    [ "prop_" + (() => 42)() ]: 42
};

```

<blockquote class="babel-callout babel-callout-warning">
  <p>
    <code>__proto__</code> 需要原生支持, 并且在 之前的ECMAScript 版本中已被弃用。虽然现在大多数引擎支持, 但是 <a href="https://kangax.github.io/compat-table/es6/#__proto___in_object_literals">仍有些引擎</a>是不支持的。另外，值得注意的是，如同<a href="http://www.ecma-international.org/ecma-262/6.0/index.html#sec-object.prototype.__proto__">附录 B</a>所示，只有 <a href="http://www.ecma-international.org/ecma-262/6.0/index.html#sec-additional-ecmascript-features-for-web-browsers">web 浏览器</a> 仍然需要支持该属性。在node中已经被支持。
  </p>
</blockquote>

### 模版字符串(Template Strings)

模版字符串提供了构建字符串的语法糖，类似于Perl，Python等语言中的字符串插值。可以构建一个自定义标签，避免注入攻击或者从字符串内容中构建更加高级的数据结构。

```js
// 创建基本的模板字符串
`This is a pretty little template string.`

// 多行字符串
`In ES5 this is
 not legal.`

// 插入变量
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`

// 不用转义
String.raw`In ES5 "\n" is a line-feed.`

// 创建一个HTTP请求头的模版字符串，通过替换内容来构建请求
GET`http://foo.org/bar?a=${a}&b=${b}
    Content-Type: application/json
    X-Credentials: ${credentials}
    { "foo": ${foo},
      "bar": ${bar}}`(myOnReadyStateChangeHandler);
```

### 解构(Destructuring)

解构允许使用模式匹配的方式进行绑定，并支持匹配
数组和对象。解构具有一定的容错机制，就像查找普通对象`foo['foo']`这样，当没有找到时会返回`undefined`（而不会直接报错）。
<br>
<blockquote class="babel-callout babel-callout-warning">
译者注：当上层结构都不存在时，解构是会报错的，如<code>const [{id: id}] = []</code>，解构数组为空，导致整个obj为<code>undefined</code>，此时再去找<code>obj.id</code>就会报错。
</blockquote>

```js
// 列表（数组）匹配
var [a, , b] = [1,2,3];

// 对象匹配
var { op: a, lhs: { op: b }, rhs: c }
       = getASTNode()

// 对象匹配的简写
// 绑定当前作用域的 `op`, `lhs` 和 `rhs`
var {op, lhs, rhs} = getASTNode()

// 可以用在函数的参数中
function g({name: x}) {
  console.log(x);
}
g({name: 5})

// 解构容错机制
var [a] = [];
a === undefined;

// 带默认值的解构容错
var [a = 1] = [];
a === 1;

// 解构 + 默认参数
function r({x, y, w = 10, h = 10}) {
  return x + y + w + h;
}
r({x:1, y:2}) === 23
```

### 默认参数(Default) + 不定参数(Rest) + 扩展运算符(Spread)

默认参数(default)的功能是在函数被调用时对参数做自动估值(若没被赋值，则自动赋值)，扩展运算符(spread)则可以将数组转换为连续的函数参数，不定参数(rest)用在参数末尾，将最末尾的参数转换为数组。不定参数(rest)让我们不再需要`arguments`，更直接地解决了一些常见的问题。

```js
function f(x, y=12) {
  // 如果没有传入y或传入了undefined，y的默认值为12
  return x + y;
}
f(3) == 15
```
```js
function f(x, ...y) {
  // y是一个数组
  return x * y.length;
}
f(3, "hello", true) == 6
```
```js
function f(x, y, z) {
  return x + y + z;
}
// 将数组中的每个元素展开为函数参数
f(...[1,2,3]) == 6
```

### Let(定义变量) + Const(定义常量)

这两个关键字具有块级作用域。`let`是`var`的升级版。`const`仅允许被赋值一次，通过静态限制（Static restrictions ）的方式阻止变量在赋值前被使用。


```js
function f() {
  {
    let x;
    {
      // 这是正确的，因为const具有块级作用域
      const x = "sneaky";
      // 错误，"x"已被定义为const常量，不允许再赋值
      x = "foo";
    }
    // 这是正确的，因为这里的"x"是被let定义的
    x = "bar";
    // 错误，"x"已经被定义，不允许再重复定义
    let x = "inner";
  }
}
```

### 迭代器(Iterators) + For..Of循环

ES6中的迭代器对象允许像 CLR(Common Language Runtime)的IEnumerable 接口或者 Java 的 Iterable 一样创建自定义迭代器，可以将`for..in`这种遍历模式更加一般化为`for..of`的形式。它是支持惰性模式的，不需要真正实现一个数组（只需要实现Iterator接口），就像LINQ语言那样。

```js
// 实现斐波那契数列的迭代器
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
  // 循环将在n > 1000 时结束
  if (n > 1000)
    break;
  console.log(n);
}
```

迭代器还可以基于"鸭子类型"来实现（使用[TypeScript](http://typescriptlang.org) 这种基于类型的语法来说明）：

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
  <h4> 通过 polyfill 支持</h4>
  <p>
    为了使用迭代器你必须引入Babel的 <a href="/docs/usage/polyfill">polyfill</a>.
  </p>
</blockquote>

### Generators

Generator通过使用`function*`和`yield`关键字简化了迭代器的编写。通过`function*`声明的函数会返回一个Generators实例。Generator可以看做是迭代器的子类，包含了额外的`next`和`throw`方法。这些特性可以让得到的结果值再传回Generator，因此`yield`是一个具有返回值（或抛出一个值）的表达式。

注意：Generator也可以用于使用‘await’这样的异步编程中，详见ES7 `await` [协议](https://github.com/lukehoban/ecmascript-asyncawait).

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

Generator 接口 (使用[TypeScript](http://typescriptlang.org) 这种基于类型的语法来说明):

```ts
interface Generator extends Iterator {
    next(value?: any): IteratorResult;
    throw(exception: any);
}
```

<blockquote class="babel-callout babel-callout-info">
  <h4>通过 polyfill 支持</h4>
  <p>
    要使用Generator，你需要在项目中包含Babel的 <a href="/docs/usage/polyfill">polyfill</a>.
  </p>
</blockquote>

### Comprehensions(Generator推导式)

Babel 6.0 移除了。

(译者注：[Generator Comprehensions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Generator_comprehensions)在14年8月27号修订中被移除了，不属于标准语法。)

### Unicode 编码

ES6 加强了对 Unicode 的支持，包括新的unicode表示法，正则表达式的`u`模式来匹配码点（code points），也提供新的API去处理21位的码点（code points）。这些新特性允许我们使用JavaScript构建国际化的应用。

```js
// 和ES5.1相同
"𠮷".length == 2

// 正则表达式新的u模式
"𠮷".match(/./u)[0].length == 2

// 新的unicode表示法
"\u{20BB7}" == "𠮷" == "\uD842\uDFB7"

// 新的字符串方法
"𠮷".codePointAt(0) == 0x20BB7

// for of迭代码点
for(var c of "𠮷") {
  console.log(c);
}
```

### 模块(Modules)

ES6从语言层面对模块进行了支持。编写方式借鉴了流行的JavaScript模块加载器（AMD, CommonJS）。由宿主环境的默认加载器定义模块运行时的行为，采取隐式异步模式——在模块可以被获取和加载前不会有代码执行。

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

还有的功能包括：`export default` and `export *`:

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
  <h4>模块的格式：</h4>
  <p>
    Babel可以将ES2015的模块转换为一下几种格式：Common.js，AMD，System，以及UMD。你甚至可以创建你自己的方式。详见<a href="/docs/plugins/">模块文档</a>.
  </p>
</blockquote>

### 模块加载器(Module Loaders)

<blockquote class="babel-callout babel-callout-warning">
  <h4>非ES2015部分</h4>
  <p>
    这并不是ES2015的一部分：这部分ECMAScript 2015规范是由实现定义（implementation-defined）的。最终的标准将在WHATWG的<a href="https://whatwg.github.io/loader/">Loader 规范</a>中确定，目前这项工作正在进行中，下面的内容来自于之前的ES2015草稿。
  </p>
</blockquote>

模块加载器支持以下功能：

- 动态加载（Dynamic loading）
- 状态一致性（State isolation）
- 全局空间一致性（Global namespace isolation）
- 编译钩子（Compilation hooks）
- 嵌套虚拟化（Nested virtualization）

你可以对默认的加载器进行配置，构建出新的加载器，可以被加载于独立或受限的执行环境。

```js
// 动态加载 – ‘System’ 是默认的加载器
System.import("lib/math").then(function(m) {
  alert("2π = " + m.sum(m.pi, m.pi));
});

// 创建执行沙箱 – new Loaders
var loader = new Loader({
  global: fixup(window) // replace ‘console.log’
});
loader.eval("console.log(\"hello world!\");");

// 直接操作模块的缓存
System.get("jquery");
System.set("jquery", Module({$: $})); // WARNING: not yet finalized
```

<blockquote class="babel-callout babel-callout-warning">
  <h4>需要额外的polyfill</h4>
  <p>
    由于Babel默认使用common.js的模块，你需要一个polyfill来使用加载器API。
    <a href="https://github.com/ModuleLoader/es6-module-loader">点击获取</a>.
  </p>
</blockquote>

<blockquote class="babel-callout babel-callout-info">
  <h4>使用模块加载器</h4>
  <p>
    为了使用此功能，你需要告诉Babel使用<code>system</code>模块格式化工具。在此查看
    <a href="https://github.com/systemjs/systemjs">System.js</a>
  </p>
</blockquote>


### Map + Set + WeakMap + WeakSet

为常见算法的实现提供了更有效的数据结构。WeakMaps提供了对对象的弱引用（不会被垃圾回收计数）。

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
// 由于传入的对象没有其他引用，故将不会被set保存。
```

<blockquote class="babel-callout babel-callout-info">
  <h4>需要polyfill支持</h4>
  <p>
    为了在所有环境下使用Maps，Sets，WeakMaps和WeakSets，你需要使用Babel的 <a href="/docs/usage/polyfill">polyfill</a>.
  </p>
</blockquote>

### Proxies(代理对象)

Proxies允许创建一个可以全范围控制宿主对象行为的对象，可用于拦截，对象的虚拟化，日志记录/性能分析等。

```js
// 代理普通对象
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
// 代理函数对象
var target = function () { return "I am the target"; };
var handler = {
  apply: function (receiver, ...args) {
    return "I am the proxy";
  }
};

var p = new Proxy(target, handler);
p() === "I am the proxy";
```

下面是完全在运行态的元操作（meta-operations）中可能出现的trap：

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
  <h4>不支持的特性</h4>
  <p>
    由于ES5的局限性，Proxies无法被转换或者通过polyfill兼容，查看<a href="https://kangax.github.io/compat-table/es6/#test-Proxy">不同JavaScript引擎</a>.
  </p>
</blockquote>

### Symbols

Symbol对对象的状态进行访问控制。Symbol允许对象的属性不仅可以通过`string（ES5）`命名，还可以通过`symbol`命名。`symbol`是一种基本数据类型。可选的`name`参数用于调试——但并不是他本身的一部分。Symbol是唯一的，但不是私有的，因为他们使用诸如`Object.getOwnPropertySymbols`这样的方法来使用。

```js
(function() {

  // 模块内的 symbol
  var key = Symbol("key");

  function MyClass(privateData) {
    this[key] = privateData;
  }

  MyClass.prototype = {
    doStuff: function() {
      ... this[key] ...
    }
  };

  // Bable只能有限支持，完全支持需要原生实现
  typeof key === "symbol"
})();

var c = new MyClass("hello")
c["key"] === undefined
```

<blockquote class="babel-callout babel-callout-info">
  <h4>通过polyfill部分实现：</h4>
  <p>
    通过Babel的<a href="/docs/usage/polyfill">polyfill</a>.部分实现。由于语言的限制，部分功能不能转换或通过polyfill兼容。您可以查看code.js的 <a href="https://github.com/zloirock/core-js#caveats-when-using-symbol-polyfill">注意事项</a> 获取更多信息.
  </p>
</blockquote>

### 可以被继承(子类化)的内建对象(Subclassable Built-ins)

在ES2015中，可以创建内建对象如`Array `，`Date`以及`DOMElement`的子类。

```js
// 创建Array的子类
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
    部分支持：由于ES5引擎的限制，可以创建HTMLElement的子类，但不能创建诸如Array，Date和Error等对象的子类。
  </p>
</blockquote>

### Math + Number + String + Object APIs

新增很多功能，如核心的Math库，数组转换和用于对象复制的Object.assign()。

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
  <h4>通过polyfill有限的支持</h4>
  <p>
    上述许多API都通过polyfill进行了支持，但是部分特性由于多种原因没有被实现（如，String.prototype.normalize需要编写大量额外的代码来实现），你可以在
    <a href="https://github.com/addyosmani/es6-tools#polyfills">这里</a>找到更多的polyfill。
  </p>
</blockquote>

### 二进制和八进制字面量
新增两种数字字面量：二进制`b`和八进制`o`。

```js
0b111110111 === 503 // true
0o767 === 503 // true
```

<blockquote class="babel-callout babel-callout-warning">
  <h4>仅支持字面模式</h4>
  <p>
    Babel仅可以转换0o767，并不能转换Number("0o767")。
  </p>
</blockquote>


### Promises

Promises是一种异步编程的方式。Promises在将来可能会得到支持。目前很多的JavaScript库都使用了Promises。

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
  <h4>通过polyfill</h4>
  <p>
    要使用Promises，你需要引入Babel的 <a href="/docs/usage/polyfill">polyfill</a>.
  </p>
</blockquote>

### Reflect API

完整的Reflect API暴露在对象的运行级元操作上。它可以用来有效地还原Proxy API，并允许调用相应的proxy traps，尤其是在执行proxies时非常有用。

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
  <h4>通过polyfill</h4>
  <p>
    要使用Reflect API，你需要引入Babel的 <a href="/docs/usage/polyfill">polyfill</a>.
  </p>
</blockquote>

### Tail Calls(尾调用)

尾递归调用可以保证调用栈不会无限增长，使得在无界输入的情况下，递归算法是安全的。

```js
function factorial(n, acc = 1) {
    "use strict";
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}

// 在绝大多数JS引擎中运行这段代码会导致栈溢出
// 但是在ES2015中，即便输入很随意也可以安全运行
factorial(100000)
```

<blockquote class="babel-callout babel-callout-warning">
  <h4>已经被bable6移除</h4>
  <p>
    该特性仅支持直接对自身引用的递归。由于功能本身的复杂性和表现冲突，使得该特性无法在全局下支持。
    移除是因为还有其他bug产生，它会被重新实现。
  </p>
</blockquote>
