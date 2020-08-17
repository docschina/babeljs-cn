---
title: 注意事项
id: version-7.0.0-caveats
original_id: caveats
---

## Polyfills

为了使一些功能生效，需要特定的 polyfills。可以使用 [@babel/polyfill](polyfill.md) 来满足 **所有** Babel 功能要求。

你可以选择性引入：

<<<<<<< HEAD
| 功能                     | 需求                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------- |
=======
| Feature                     | Requirements                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------------- |
>>>>>>> 2048d1acdbdbe4cad216485bc989a1c3d2c19559
| Async functions, Generators | [regenerator runtime](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime) |
| Array destructuring, For Of | `Symbol`, `prototype[Symbol.iterator]`                                                                  |
| Spread                      | `Array.from`                                                                                            |

这些插件中有些也有 `loose` 选项。

<<<<<<< HEAD
## 类
=======
## Built-ins

Babel assumes that built-ins (e.g. `Array`, `WeakMap` and others), if polyfilled, are modified in a manner that is spec-compliant.

## Classes
>>>>>>> 2048d1acdbdbe4cad216485bc989a1c3d2c19559

由于 ES5 的限制（对于 [transform-classes](plugin-transform-classes.md) 插件），`Date`, `Array`, `DOM` 等内置类型无法正确子类化。你可以尝试基于 `Object.setPrototypeOf` 和 `Reflect.construct` 的 [babel-plugin-transform-builtin-extend](https://github.com/loganfsmyth/babel-plugin-transform-builtin-extend)，但是它也存在一些限制。

## ES5

由于 Babel 假定你的代码将在 ES5 环境中运行，因此它使用 ES5 函数。因此，如果使用的环境对 ES5 的支持有限或不支持，例如较低版本的 IE，那么使用 [@babel/polyfill](polyfill.md) 将添加对这些方法的支持。

## Internet Explorer

### 类 (IE10 及更低版本)

如果你继承自一个类，那么静态属性是通过 [\_\_proto\_\_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto) 从它继承的，这被广泛支持，但在很多旧浏览器运行时可能会遇到问题。

**注意:** IE <= 10不支持 `__proto__`，因此 **不会** 继承静态属性。请参阅 [protoToAssign](plugin-transform-proto-to-assign.md) 以了解可能的解决方法。

对于具有 `super` 的类，super 类将无法正确解析。你可以通过启用 [es2015-classes](plugin-transform-classes.md) 插件中的 `loose` 选项来解决这个问题。

### Getters/setters (IE8 及更低版本)

在 IE8 中， `Object.defineProperty` 只能用于 DOM 对象。这很遗憾，因为它需要设置 getter 和 setter。因此，如果计划支持 IE8 或更低版本，则不建议使用 getter 和 setter。

**参考**: [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Internet_Explorer_8_specific_notes).

#### 模块

默认情况下，在使用具有 Babel 的模块时，将导出不可枚举的 `__esModule` 属性。这是通过使用 `Object.defineProperty` 来完成的，而在 IE8 及以下版本是不支持的。解决方法是在相应的模块插件中启用 `loose` 选项。
