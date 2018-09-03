---
id: version-6.26.3-babel-preset-minify
title: babel-preset-minify
sidebar_label: minify
original_id: babel-preset-minify
---

+ [安装](#安装)
+ [使用](#使用)
+ [选项](#选项)

## 安装

```sh
npm install --save-dev babel-preset-minify
```

## 使用

### 通过 `.babelrc` (推荐)

**.babelrc**

```json
{
  "presets": ["minify"]
}
```

或者添加选项 -

```json
{
  "presets": [["minify", {
    "mangle": {
      "exclude": ["MyCustomError"]
    },
    "unsafe": {
      "typeConstructors": false
    },
    "keepFnName": true
  }]]
}
```

### 通过 CLI

```sh
babel script.js --presets minify
```

### 通过 Node API

```javascript
require("babel-core").transform("code", {
  presets: ["minify"]
});
```

## 选项

包含以下两种选择:

1. 1-1 插件映射
2. 相同选项传递给多个插件

#### 1-1 插件映射

+ `false` - 禁用插件
+ `true` - 启用插件
+ `{ ...pluginOpts }` - 启用插件并将 pluginOpts 传递给插件。

选项名          | 插件                                                         | 默认值
----------          | ------                                                         | ------------
booleans            | [transform-minify-booleans][booleans]                          | true
builtIns            | [minify-builtins][builtIns]                                    | true
consecutiveAdds     | [transform-inline-consecutive-adds][consecutiveAdds]           | true
deadcode            | [minify-dead-code-elimination][deadcode]                       | true
evaluate            | [minify-constant-folding][evaluate]                            | true
flipComparisons     | [minify-flip-comparisons][flipComparisons]                     | true
guards              | [minify-guarded-expressions][guards]                           | true
infinity            | [minify-infinity][infinity]                                    | true
mangle              | [minify-mangle-names][mangle]                                  | true
memberExpressions   | [transform-member-expression-literals][memberExpressions]      | true
mergeVars           | [transform-merge-sibling-variables][mergeVars]                 | true
numericLiterals     | [minify-numeric-literals][numericLiterals]                     | true
propertyLiterals    | [transform-property-literals][propertyLiterals]                | true
regexpConstructors  | [transform-regexp-constructors][regexpConstructors]            | true
removeConsole       | [transform-remove-console][removeConsole]                      | false
removeDebugger      | [transform-remove-debugger][removeDebugger]                    | false
removeUndefined     | [transform-remove-undefined][removeUndefined]                  | true
replace             | [minify-replace][replace]                                      | true
simplify            | [minify-simplify][simplify]                                    | true
simplifyComparisons | [transform-simplify-comparison-operators][simplifyComparisons] | true
typeConstructors    | [minify-type-constructors][typeConstructors]                   | true
undefinedToVoid     | [transform-undefined-to-void][undefinedToVoid]                 | true

#### 相同选项传递给多个插件

+ 当多个插件需要相同选项时，可以简单的声明在相同位置。这些选项会被传递到两个或更多的插件中。

选项名          | 插件
----------          | -------
keepFnName          | 通过 [mangle][mangle] & [deadcode][deadcode]
keepClassName       | 通过 [mangle][mangle] & [deadcode][deadcode]
tdz                 | 通过 [builtIns][builtIns], [evaluate][evaluate], [deadcode][deadcode], [removeUndefined][removeUndefined]

**例如**

```json
{
  "presets": [["minify", {
    "evaluate": false,
    "mangle": true
  }]]
}
```

```json
{
  "presets": [["minify", {
    "mangle": {
      "exclude": ["ParserError", "NetworkError"]
    }
  }]]
}
```

```json
{
  "presets": [["minify", {
    "keepFnName": true
  }]]
}
// 等同于
{
  "presets": [["minify", {
    "mangle": {
      "keepFnName": true
    },
    "deadcode": {
      "keepFnName": true
    }
  }]]
}
```

[booleans]: babel-plugin-transform-minify-booleans
[builtIns]: babel-plugin-minify-builtins
[consecutiveAdds]: babel-plugin-transform-inline-consecutive-adds
[deadcode]: babel-plugin-minify-dead-code-elimination
[evaluate]: babel-plugin-minify-constant-folding
[flipComparisons]: babel-plugin-minify-flip-comparisons
[guards]: babel-plugin-minify-guarded-expressions
[infinity]: babel-plugin-minify-infinity
[mangle]: babel-plugin-minify-mangle-names
[memberExpressions]: babel-plugin-transform-member-expression-literals
[mergeVars]: babel-plugin-transform-merge-sibling-variables
[numericLiterals]: babel-plugin-minify-numeric-literals
[propertyLiterals]: babel-plugin-transform-property-literals
[regexpConstructors]: babel-plugin-transform-regexp-constructors
[removeConsole]: babel-plugin-transform-remove-console
[removeDebugger]: babel-plugin-transform-remove-debugger
[removeUndefined]: babel-plugin-transform-remove-undefined
[replace]: babel-plugin-minify-replace
[simplify]: babel-plugin-minify-simplify
[simplifyComparisons]: babel-plugin-transform-simplify-comparison-operators
[typeConstructors]: babel-plugin-minify-type-constructors
[undefinedToVoid]: babel-plugin-transform-undefined-to-void
