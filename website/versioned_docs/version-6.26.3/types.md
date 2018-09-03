---
id: version-6.26.3-babel-types
title: babel-types
sidebar_label: babel-types
original_id: babel-types
---

## 安装

```sh
npm install --save-dev babel-types
```

## API

<!-- begin generated section -->

### anyTypeAnnotation
```javascript
t.anyTypeAnnotation()
```

参见 `t.isAnyTypeAnnotation(node, opts)` 和 `t.assertAnyTypeAnnotation(node, opts)` 。

别名： `Flow`，`FlowBaseAnnotation`


---

### arrayExpression
```javascript
t.arrayExpression(elements)
```

参见 `t.isArrayExpression(node, opts)` 和 `t.assertArrayExpression(node, opts)` 。

别名: `Expression`

 - `elements`: `Array<null | Expression | SpreadElement>` (默认为： `[]`)

---

### arrayPattern
```javascript
t.arrayPattern(elements, typeAnnotation)
```

参见 `t.isArrayPattern(node, opts)` 和 `t.assertArrayPattern(node, opts)` 。

别名： `Pattern`，`LVal`

 - `elements`: `Array<Identifier | Pattern | RestElement>` (必填)
 - `typeAnnotation` (必填)
 - `decorators`: `Array<Decorator>` (默认为：`null`)

---

### arrayTypeAnnotation
```javascript
t.arrayTypeAnnotation(elementType)
```

参加 `t.isArrayTypeAnnotation(node, opts)` 和 `t.assertArrayTypeAnnotation(node, opts)` 。

别名: `Flow`

 - `elementType` (必填)

---

### arrowFunctionExpression
```javascript
t.arrowFunctionExpression(params, body, async)
```

参见 `t.isArrowFunctionExpression(node, opts)` 和 `t.assertArrowFunctionExpression(node, opts)` 。

别名： `Scopable`, `Function`, `BlockParent`, `FunctionParent`, `Expression`, `Pureish`

 - `params`: `Array<LVal>` (必填)
 - `body`: `BlockStatement | Expression` (必填)
 - `async`: `boolean` (默认为：`false`)
 - `returnType` (默认为：`null`)
 - `typeParameters` (默认为：`null`)

---

### assignmentExpression
```javascript
t.assignmentExpression(operator, left, right)
```

参见 `t.isAssignmentExpression(node, opts)` 和 `t.assertAssignmentExpression(node, opts)` 。

别名: `Expression`

 - `operator`: `string` (必填)
 - `left`: `LVal` (必填)
 - `right`: `Expression` (必填)

---

### assignmentPattern
```javascript
t.assignmentPattern(left, right)
```

参见 `t.isAssignmentPattern(node, opts)` 和 `t.assertAssignmentPattern(node, opts)` 。

别名: `Pattern`, `LVal`

 - `left`: `Identifier` (必填)
 - `right`: `Expression` (必填)
 - `decorators`: `Array<Decorator>` (默认为：`null`)

---

### awaitExpression
```javascript
t.awaitExpression(argument)
```

参见 `t.isAwaitExpression(node, opts)` 和 `t.assertAwaitExpression(node, opts)` 。

别名: `Expression`, `Terminatorless`

 - `argument`: `Expression` (必填)

---

### binaryExpression
```javascript
t.binaryExpression(operator, left, right)
```

参见 `t.isBinaryExpression(node, opts)` 和 `t.assertBinaryExpression(node, opts)` 。

别名: `Binary`, `Expression`

 - `operator`: `'+' | '-' | '/' | '%' | '*' | '**' | '&' | '|' | '>>' | '>>>' | '<<' | '^' | '==' | '===' | '!=' | '!==' | 'in' | 'instanceof' | '>' | '<' | '>=' | '<='` (必填)
 - `left`: `Expression` (必填)
 - `right`: `Expression` (必填)

---

### bindExpression
```javascript
t.bindExpression(object, callee)
```

参见 `t.isBindExpression(node, opts)` 和 `t.assertBindExpression(node, opts)` 。

别名: `Expression`

 - `object` (必填)
 - `callee` (必填)

---

### blockStatement
```javascript
t.blockStatement(body, directives)
```

参见 `t.isBlockStatement(node, opts)` 和 `t.assertBlockStatement(node, opts)` 。

别名: `Scopable`, `BlockParent`, `Block`, `Statement`

 - `body`: `Array<Statement>` (必填)
 - `directives`: `Array<Directive>` (默认为：`[]`)

---

### booleanLiteral
```javascript
t.booleanLiteral(value)
```

参见 `t.isBooleanLiteral(node, opts)` 和 `t.assertBooleanLiteral(node, opts)` 。

别名: `Expression`, `Pureish`, `Literal`, `Immutable`

 - `value`: `boolean` (必填)

---

### booleanLiteralTypeAnnotation
```javascript
t.booleanLiteralTypeAnnotation()
```

参见 `t.isBooleanLiteralTypeAnnotation(node, opts)` 和 `t.assertBooleanLiteralTypeAnnotation(node, opts)` 。

别名: `Flow`


---

### booleanTypeAnnotation
```javascript
t.booleanTypeAnnotation()
```

参见 `t.isBooleanTypeAnnotation(node, opts)` 和 `t.assertBooleanTypeAnnotation(node, opts)` 。

别名: `Flow`, `FlowBaseAnnotation`


---

### breakStatement
```javascript
t.breakStatement(label)
```

参见 `t.isBreakStatement(node, opts)` 和 `t.assertBreakStatement(node, opts)` 。

别名: `Statement`, `Terminatorless`, `CompletionStatement`

 - `label`: `Identifier` (默认为：`null`)

---

### callExpression
```javascript
t.callExpression(callee, arguments)
```

参见 `t.isCallExpression(node, opts)` 和 `t.assertCallExpression(node, opts)` 。

别名: `Expression`

 - `callee`: `Expression` (必填)
 - `arguments`: `Array<Expression | SpreadElement>` (必填)

---

### catchClause
```javascript
t.catchClause(param, body)
```

参见 `t.isCatchClause(node, opts)` 和 `t.assertCatchClause(node, opts)` 。

别名: `Scopable`

 - `param`: `Identifier` (必填)
 - `body`: `BlockStatement` (必填)

---

### classBody
```javascript
t.classBody(body)
```

参见 `t.isClassBody(node, opts)` 和 `t.assertClassBody(node, opts)` 。

 - `body`: `Array<ClassMethod | ClassProperty>` (必填)

---

### classDeclaration
```javascript
t.classDeclaration(id, superClass, body, decorators)
```

参见 `t.isClassDeclaration(node, opts)` 和 `t.assertClassDeclaration(node, opts)` 。

别名: `Scopable`, `Class`, `Statement`, `Declaration`, `Pureish`

 - `id`: `Identifier` (必填)
 - `superClass`: `Expression` (默认为：`null`)
 - `body`: `ClassBody` (必填)
 - `decorators`: `Array<Decorator>` (必填)
 - `implements` (默认为：`null`)
 - `mixins` (默认为：`null`)
 - `superTypeParameters` (默认为：`null`)
 - `typeParameters` (默认为：`null`)

---

### classExpression
```javascript
t.classExpression(id, superClass, body, decorators)
```

参见 `t.isClassExpression(node, opts)` 和 `t.assertClassExpression(node, opts)` 。

别名: `Scopable`, `Class`, `Expression`, `Pureish`

 - `id`: `Identifier` (默认为：`null`)
 - `superClass`: `Expression` (默认为：`null`)
 - `body`: `ClassBody` (必填)
 - `decorators`: `Array<Decorator>` (必填)
 - `implements` (默认为：`null`)
 - `mixins` (默认为：`null`)
 - `superTypeParameters` (默认为：`null`)
 - `typeParameters` (默认为：`null`)

---

### classImplements
```javascript
t.classImplements(id, typeParameters)
```

参见 `t.isClassImplements(node, opts)` 和 `t.assertClassImplements(node, opts)` 。

别名: `Flow`

 - `id` (必填)
 - `typeParameters` (必填)

---

### classMethod
```javascript
t.classMethod(kind, key, params, body, computed, static)
```

参见 `t.isClassMethod(node, opts)` 和 `t.assertClassMethod(node, opts)` 。

别名: `Function`, `Scopable`, `BlockParent`, `FunctionParent`, `Method`

 - `kind`: `"get" | "set" | "method" | "constructor"` (默认为：`'method'`)
 - `key`if computed then `Expression` else `Identifier | Literal` (必填)
 - `params`: `Array<LVal>` (必填)
 - `body`: `BlockStatement` (必填)
 - `computed`: `boolean` (默认为：`false`)
 - `static`: `boolean` (默认为：`false`)
 - `async`: `boolean` (默认为：`false`)
 - `decorators` (默认为：`null`)
 - `generator`: `boolean` (默认为：`false`)
 - `returnType` (默认为：`null`)
 - `typeParameters` (默认为：`null`)

---

### classProperty
```javascript
t.classProperty(key, value, typeAnnotation, decorators, computed)
```

参见 `t.isClassProperty(node, opts)` 和 `t.assertClassProperty(node, opts)` 。

别名: `Property`

 - `key` (必填)
 - `value` (必填)
 - `typeAnnotation` (必填)
 - `decorators` (必填)
 - `computed`: `boolean` (默认为：`false`)

---

### conditionalExpression
```javascript
t.conditionalExpression(test, consequent, alternate)
```

参见 `t.isConditionalExpression(node, opts)` 和 `t.assertConditionalExpression(node, opts)` 。

别名: `Expression`, `Conditional`

 - `test`: `Expression` (必填)
 - `consequent`: `Expression` (必填)
 - `alternate`: `Expression` (必填)

---

### continueStatement
```javascript
t.continueStatement(label)
```

参见 `t.isContinueStatement(node, opts)` 和 `t.assertContinueStatement(node, opts)` 。

别名: `Statement`, `Terminatorless`, `CompletionStatement`

 - `label`: `Identifier` (默认为：`null`)

---

### debuggerStatement
```javascript
t.debuggerStatement()
```

参见 `t.isDebuggerStatement(node, opts)` 和 `t.assertDebuggerStatement(node, opts)` 。

别名: `Statement`


---

### declareClass
```javascript
t.declareClass(id, typeParameters, extends, body)
```

参见 `t.isDeclareClass(node, opts)` 和 `t.assertDeclareClass(node, opts)` 。

别名: `Flow`, `FlowDeclaration`, `Statement`, `Declaration`

 - `id` (必填)
 - `typeParameters` (必填)
 - `extends` (必填)
 - `body` (必填)

---

### declareExportDeclaration
```javascript
t.declareExportDeclaration(declaration, specifiers, source)
```

参见 `t.isDeclareExportDeclaration(node, opts)` 和 `t.assertDeclareExportDeclaration(node, opts)` 。

别名: `Flow`, `FlowDeclaration`, `Statement`, `Declaration`

 - `declaration` (必填)
 - `specifiers` (必填)
 - `source` (必填)

---

### declareFunction
```javascript
t.declareFunction(id)
```

参见 `t.isDeclareFunction(node, opts)` 和 `t.assertDeclareFunction(node, opts)` 。

别名: `Flow`, `FlowDeclaration`, `Statement`, `Declaration`

 - `id` (必填)

---

### declareInterface
```javascript
t.declareInterface(id, typeParameters, extends, body)
```

参见 `t.isDeclareInterface(node, opts)` 和 `t.assertDeclareInterface(node, opts)` 。

别名: `Flow`, `FlowDeclaration`, `Statement`, `Declaration`

 - `id` (必填)
 - `typeParameters` (必填)
 - `extends` (必填)
 - `body` (必填)

---

### declareModule
```javascript
t.declareModule(id, body)
```

参见 `t.isDeclareModule(node, opts)` 和 `t.assertDeclareModule(node, opts)` 。

别名: `Flow`, `FlowDeclaration`, `Statement`, `Declaration`

 - `id` (必填)
 - `body` (必填)

---

### declareModuleExports
```javascript
t.declareModuleExports(typeAnnotation)
```

参见 `t.isDeclareModuleExports(node, opts)` 和 `t.assertDeclareModuleExports(node, opts)` 。

别名: `Flow`, `FlowDeclaration`, `Statement`, `Declaration`

 - `typeAnnotation` (必填)

---

### declareOpaqueType
```javascript
t.declareOpaqueType(id, typeParameters, supertype)
```

参见 `t.isDeclareOpaqueType(node, opts)` 和 `t.assertDeclareOpaqueType(node, opts)` 。

别名: `Flow`, `FlowDeclaration`, `Statement`, `Declaration`

 - `id` (必填)
 - `typeParameters` (必填)
 - `supertype` (必填)

---

### declareTypeAlias
```javascript
t.declareTypeAlias(id, typeParameters, right)
```

参见 `t.isDeclareTypeAlias(node, opts)` 和 `t.assertDeclareTypeAlias(node, opts)` 。

别名: `Flow`, `FlowDeclaration`, `Statement`, `Declaration`

 - `id` (必填)
 - `typeParameters` (必填)
 - `right` (必填)

---

### declareVariable
```javascript
t.declareVariable(id)
```

参见 `t.isDeclareVariable(node, opts)` 和 `t.assertDeclareVariable(node, opts)` 。

别名: `Flow`, `FlowDeclaration`, `Statement`, `Declaration`

 - `id` (必填)

---

### decorator
```javascript
t.decorator(expression)
```

参见 `t.isDecorator(node, opts)` 和 `t.assertDecorator(node, opts)` 。

 - `expression`: `Expression` (必填)

---

### directive
```javascript
t.directive(value)
```

参见 `t.isDirective(node, opts)` 和 `t.assertDirective(node, opts)` 。

 - `value`: `DirectiveLiteral` (必填)

---

### directiveLiteral
```javascript
t.directiveLiteral(value)
```

参见 `t.isDirectiveLiteral(node, opts)` 和 `t.assertDirectiveLiteral(node, opts)` 。

 - `value`: `string` (必填)

---

### doExpression
```javascript
t.doExpression(body)
```

参见 `t.isDoExpression(node, opts)` 和 `t.assertDoExpression(node, opts)` 。

别名: `Expression`

 - `body`: `BlockStatement` (必填)

---

### doWhileStatement
```javascript
t.doWhileStatement(test, body)
```

参见 `t.isDoWhileStatement(node, opts)` 和 `t.assertDoWhileStatement(node, opts)` 。

别名: `Statement`, `BlockParent`, `Loop`, `While`, `Scopable`

 - `test`: `Expression` (必填)
 - `body`: `Statement` (必填)

---

### emptyStatement
```javascript
t.emptyStatement()
```

参见 `t.isEmptyStatement(node, opts)` 和 `t.assertEmptyStatement(node, opts)` 。

别名: `Statement`


---

### emptyTypeAnnotation
```javascript
t.emptyTypeAnnotation()
```

参见 `t.isEmptyTypeAnnotation(node, opts)` 和 `t.assertEmptyTypeAnnotation(node, opts)` 。

别名: `Flow`, `FlowBaseAnnotation`


---

### existentialTypeParam
```javascript
t.existentialTypeParam()
```

参见 `t.isExistentialTypeParam(node, opts)` 和 `t.assertExistentialTypeParam(node, opts)` 。

别名: `Flow`


---

### exportAllDeclaration
```javascript
t.exportAllDeclaration(source)
```

参见 `t.isExportAllDeclaration(node, opts)` 和 `t.assertExportAllDeclaration(node, opts)` 。

别名: `Statement`, `Declaration`, `ModuleDeclaration`, `ExportDeclaration`

 - `source`: `StringLiteral` (必填)

---

### exportDefaultDeclaration
```javascript
t.exportDefaultDeclaration(declaration)
```

参见 `t.isExportDefaultDeclaration(node, opts)` 和 `t.assertExportDefaultDeclaration(node, opts)` 。

别名: `Statement`, `Declaration`, `ModuleDeclaration`, `ExportDeclaration`

 - `declaration`: `FunctionDeclaration | ClassDeclaration | Expression` (必填)

---

### exportDefaultSpecifier
```javascript
t.exportDefaultSpecifier(exported)
```

参见 `t.isExportDefaultSpecifier(node, opts)` 和 `t.assertExportDefaultSpecifier(node, opts)` 。

别名: `ModuleSpecifier`

 - `exported`: `Identifier` (必填)

---

### exportNamedDeclaration
```javascript
t.exportNamedDeclaration(declaration, specifiers, source)
```

参见 `t.isExportNamedDeclaration(node, opts)` 和 `t.assertExportNamedDeclaration(node, opts)` 。

别名: `Statement`, `Declaration`, `ModuleDeclaration`, `ExportDeclaration`

 - `declaration`: `Declaration` (默认为：`null`)
 - `specifiers`: `Array<ExportSpecifier>` (必填)
 - `source`: `StringLiteral` (默认为：`null`)

---

### exportNamespaceSpecifier
```javascript
t.exportNamespaceSpecifier(exported)
```

参见 `t.isExportNamespaceSpecifier(node, opts)` 和 `t.assertExportNamespaceSpecifier(node, opts)` 。

别名: `ModuleSpecifier`

 - `exported`: `Identifier` (必填)

---

### exportSpecifier
```javascript
t.exportSpecifier(local, exported)
```

参见 `t.isExportSpecifier(node, opts)` 和 `t.assertExportSpecifier(node, opts)` 。

别名: `ModuleSpecifier`

 - `local`: `Identifier` (必填)
 - `exported`: `Identifier` (必填)

---

### expressionStatement
```javascript
t.expressionStatement(expression)
```

参见 `t.isExpressionStatement(node, opts)` 和 `t.assertExpressionStatement(node, opts)` 。

别名: `Statement`, `ExpressionWrapper`

 - `expression`: `Expression` (必填)

---

### file
```javascript
t.file(program, comments, tokens)
```

参见 `t.isFile(node, opts)` 和 `t.assertFile(node, opts)` 。

 - `program`: `Program` (必填)
 - `comments` (必填)
 - `tokens` (必填)

---

### forAwaitStatement
```javascript
t.forAwaitStatement(left, right, body)
```

参见 `t.isForAwaitStatement(node, opts)` 和 `t.assertForAwaitStatement(node, opts)` 。

别名: `Scopable`, `Statement`, `For`, `BlockParent`, `Loop`, `ForXStatement`

 - `left`: `VariableDeclaration | LVal` (必填)
 - `right`: `Expression` (必填)
 - `body`: `Statement` (必填)

---

### forInStatement
```javascript
t.forInStatement(left, right, body)
```

参见 `t.isForInStatement(node, opts)` 和 `t.assertForInStatement(node, opts)` 。

别名: `Scopable`, `Statement`, `For`, `BlockParent`, `Loop`, `ForXStatement`

 - `left`: `VariableDeclaration | LVal` (必填)
 - `right`: `Expression` (必填)
 - `body`: `Statement` (必填)

---

### forOfStatement
```javascript
t.forOfStatement(left, right, body)
```

参见 `t.isForOfStatement(node, opts)` 和 `t.assertForOfStatement(node, opts)` 。

别名: `Scopable`, `Statement`, `For`, `BlockParent`, `Loop`, `ForXStatement`

 - `left`: `VariableDeclaration | LVal` (必填)
 - `right`: `Expression` (必填)
 - `body`: `Statement` (必填)

---

### forStatement
```javascript
t.forStatement(init, test, update, body)
```

参见 `t.isForStatement(node, opts)` 和 `t.assertForStatement(node, opts)` 。

别名: `Scopable`, `Statement`, `For`, `BlockParent`, `Loop`

 - `init`: `VariableDeclaration | Expression` (默认为：`null`)
 - `test`: `Expression` (默认为：`null`)
 - `update`: `Expression` (默认为：`null`)
 - `body`: `Statement` (必填)

---

### functionDeclaration
```javascript
t.functionDeclaration(id, params, body, generator, async)
```

参见 `t.isFunctionDeclaration(node, opts)` 和 `t.assertFunctionDeclaration(node, opts)` 。

别名: `Scopable`, `Function`, `BlockParent`, `FunctionParent`, `Statement`, `Pureish`, `Declaration`

 - `id`: `Identifier` (必填)
 - `params`: `Array<LVal>` (必填)
 - `body`: `BlockStatement` (必填)
 - `generator`: `boolean` (默认为：`false`)
 - `async`: `boolean` (默认为：`false`)
 - `returnType` (默认为：`null`)
 - `typeParameters` (默认为：`null`)

---

### functionExpression
```javascript
t.functionExpression(id, params, body, generator, async)
```

参见 `t.isFunctionExpression(node, opts)` 和 `t.assertFunctionExpression(node, opts)` 。

别名: `Scopable`, `Function`, `BlockParent`, `FunctionParent`, `Expression`, `Pureish`

 - `id`: `Identifier` (默认为：`null`)
 - `params`: `Array<LVal>` (必填)
 - `body`: `BlockStatement` (必填)
 - `generator`: `boolean` (默认为：`false`)
 - `async`: `boolean` (默认为：`false`)
 - `returnType` (默认为：`null`)
 - `typeParameters` (默认为：`null`)

---

### functionTypeAnnotation
```javascript
t.functionTypeAnnotation(typeParameters, params, rest, returnType)
```

参见 `t.isFunctionTypeAnnotation(node, opts)` 和 `t.assertFunctionTypeAnnotation(node, opts)` 。

别名: `Flow`

 - `typeParameters` (必填)
 - `params` (必填)
 - `rest` (必填)
 - `returnType` (必填)

---

### functionTypeParam
```javascript
t.functionTypeParam(name, typeAnnotation)
```

参见 `t.isFunctionTypeParam(node, opts)` 和 `t.assertFunctionTypeParam(node, opts)` 。

别名: `Flow`

 - `name` (必填)
 - `typeAnnotation` (必填)

---

### genericTypeAnnotation
```javascript
t.genericTypeAnnotation(id, typeParameters)
```

参见 `t.isGenericTypeAnnotation(node, opts)` 和 `t.assertGenericTypeAnnotation(node, opts)` 。

别名: `Flow`

 - `id` (必填)
 - `typeParameters` (必填)

---

### identifier
```javascript
t.identifier(name)
```

参见 `t.isIdentifier(node, opts)` 和 `t.assertIdentifier(node, opts)` 。

别名: `Expression`, `LVal`

 - `name``string` (必填)
 - `decorators`: `Array<Decorator>` (默认为：`null`)
 - `typeAnnotation` (默认为：`null`)

---

### ifStatement
```javascript
t.ifStatement(test, consequent, alternate)
```

参见 `t.isIfStatement(node, opts)` 和 `t.assertIfStatement(node, opts)` 。

别名: `Statement`, `Conditional`

 - `test`: `Expression` (必填)
 - `consequent`: `Statement` (必填)
 - `alternate`: `Statement` (默认为：`null`)

---

### import
```javascript
t.import()
```

参见 `t.isImport(node, opts)` 和 `t.assertImport(node, opts)` 。

别名: `Expression`


---

### importDeclaration
```javascript
t.importDeclaration(specifiers, source)
```

参见 `t.isImportDeclaration(node, opts)` 和 `t.assertImportDeclaration(node, opts)` 。

别名: `Statement`, `Declaration`, `ModuleDeclaration`

 - `specifiers`: `Array<ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier>` (必填)
 - `source`: `StringLiteral` (必填)

---

### importDefaultSpecifier
```javascript
t.importDefaultSpecifier(local)
```

参见 `t.isImportDefaultSpecifier(node, opts)` 和 `t.assertImportDefaultSpecifier(node, opts)` 。

别名: `ModuleSpecifier`

 - `local`: `Identifier` (必填)

---

### importNamespaceSpecifier
```javascript
t.importNamespaceSpecifier(local)
```

参见 `t.isImportNamespaceSpecifier(node, opts)` 和 `t.assertImportNamespaceSpecifier(node, opts)` 。

别名: `ModuleSpecifier`

 - `local`: `Identifier` (必填)

---

### importSpecifier
```javascript
t.importSpecifier(local, imported)
```

参见 `t.isImportSpecifier(node, opts)` 和 `t.assertImportSpecifier(node, opts)` 。

别名: `ModuleSpecifier`

 - `local`: `Identifier` (必填)
 - `imported`: `Identifier` (必填)
 - `importKind`: `null | 'type' | 'typeof'` (默认为：`null`)

---

### interfaceDeclaration
```javascript
t.interfaceDeclaration(id, typeParameters, extends, body)
```

参见 `t.isInterfaceDeclaration(node, opts)` 和 `t.assertInterfaceDeclaration(node, opts)` 。

别名: `Flow`, `FlowDeclaration`, `Statement`, `Declaration`

 - `id` (必填)
 - `typeParameters` (必填)
 - `extends` (必填)
 - `body` (必填)

---

### interfaceExtends
```javascript
t.interfaceExtends(id, typeParameters)
```

参见 `t.isInterfaceExtends(node, opts)` 和 `t.assertInterfaceExtends(node, opts)` 。

别名: `Flow`

 - `id` (必填)
 - `typeParameters` (必填)

---

### intersectionTypeAnnotation
```javascript
t.intersectionTypeAnnotation(types)
```

参见 `t.isIntersectionTypeAnnotation(node, opts)` 和 `t.assertIntersectionTypeAnnotation(node, opts)` 。

别名: `Flow`

 - `types` (必填)

---

### jSXAttribute
```javascript
t.jSXAttribute(name, value)
```

参见 `t.isJSXAttribute(node, opts)` 和 `t.assertJSXAttribute(node, opts)` 。

别名: `JSX`, `Immutable`

 - `name`: `JSXIdentifier | JSXNamespacedName` (必填)
 - `value`: `JSXElement | StringLiteral | JSXExpressionContainer` (默认为：`null`)

---

### jSXClosingElement
```javascript
t.jSXClosingElement(name)
```

参见 `t.isJSXClosingElement(node, opts)` 和 `t.assertJSXClosingElement(node, opts)` 。

别名: `JSX`, `Immutable`

 - `name`: `JSXIdentifier | JSXMemberExpression` (必填)

---

### jSXElement
```javascript
t.jSXElement(openingElement, closingElement, children, selfClosing)
```

参见 `t.isJSXElement(node, opts)` 和 `t.assertJSXElement(node, opts)` 。

别名: `JSX`, `Immutable`, `Expression`

 - `openingElement`: `JSXOpeningElement` (必填)
 - `closingElement`: `JSXClosingElement` (默认为：`null`)
 - `children`: `Array<JSXText | JSXExpressionContainer | JSXSpreadChild | JSXElement>` (必填)
 - `selfClosing` (必填)

---

### jSXEmptyExpression
```javascript
t.jSXEmptyExpression()
```

参见 `t.isJSXEmptyExpression(node, opts)` 和 `t.assertJSXEmptyExpression(node, opts)` 。

别名: `JSX`, `Expression`


---

### jSXExpressionContainer
```javascript
t.jSXExpressionContainer(expression)
```

参见 `t.isJSXExpressionContainer(node, opts)` 和 `t.assertJSXExpressionContainer(node, opts)` 。

别名: `JSX`, `Immutable`

 - `expression`: `Expression` (必填)

---

### jSXIdentifier
```javascript
t.jSXIdentifier(name)
```

参见 `t.isJSXIdentifier(node, opts)` 和 `t.assertJSXIdentifier(node, opts)` 。

别名: `JSX`, `Expression`

 - `name`: `string` (必填)

---

### jSXMemberExpression
```javascript
t.jSXMemberExpression(object, property)
```

参见 `t.isJSXMemberExpression(node, opts)` 和 `t.assertJSXMemberExpression(node, opts)` 。

别名: `JSX`, `Expression`

 - `object`: `JSXMemberExpression | JSXIdentifier` (必填)
 - `property`: `JSXIdentifier` (必填)

---

### jSXNamespacedName
```javascript
t.jSXNamespacedName(namespace, name)
```

参见 `t.isJSXNamespacedName(node, opts)` 和 `t.assertJSXNamespacedName(node, opts)` 。

别名: `JSX`

 - `namespace`: `JSXIdentifier` (必填)
 - `name`: `JSXIdentifier` (必填)

---

### jSXOpeningElement
```javascript
t.jSXOpeningElement(name, attributes, selfClosing)
```

参见 `t.isJSXOpeningElement(node, opts)` 和 `t.assertJSXOpeningElement(node, opts)` 。

别名: `JSX`, `Immutable`

 - `name`: `JSXIdentifier | JSXMemberExpression` (必填)
 - `attributes`: `Array<JSXAttribute | JSXSpreadAttribute>` (必填)
 - `selfClosing`: `boolean` (默认为：`false`)

---

### jSXSpreadAttribute
```javascript
t.jSXSpreadAttribute(argument)
```

参见 `t.isJSXSpreadAttribute(node, opts)` 和 `t.assertJSXSpreadAttribute(node, opts)` 。

别名: `JSX`

 - `argument`: `Expression` (必填)

---

### jSXSpreadChild
```javascript
t.jSXSpreadChild(expression)
```

参见 `t.isJSXSpreadChild(node, opts)` 和 `t.assertJSXSpreadChild(node, opts)` 。

别名: `JSX`, `Immutable`

 - `expression`: `Expression` (必填)

---

### jSXText
```javascript
t.jSXText(value)
```

参见 `t.isJSXText(node, opts)` 和 `t.assertJSXText(node, opts)` 。

别名: `JSX`, `Immutable`

 - `value`: `string` (必填)

---

### labeledStatement
```javascript
t.labeledStatement(label, body)
```

参见 `t.isLabeledStatement(node, opts)` 和 `t.assertLabeledStatement(node, opts)` 。

别名: `Statement`

 - `label`: `Identifier` (必填)
 - `body`: `Statement` (必填)

---

### logicalExpression
```javascript
t.logicalExpression(operator, left, right)
```

参见 `t.isLogicalExpression(node, opts)` 和 `t.assertLogicalExpression(node, opts)` 。

别名: `Binary`, `Expression`

 - `operator`: `'||' | '&&'` (必填)
 - `left`: `Expression` (必填)
 - `right`: `Expression` (必填)

---

### memberExpression
```javascript
t.memberExpression(object, property, computed)
```

参见 `t.isMemberExpression(node, opts)` 和 `t.assertMemberExpression(node, opts)` 。

别名: `Expression`, `LVal`

 - `object`: `Expression` (必填)
 - `property`if computed then `Expression` else `Identifier` (必填)
 - `computed`: `boolean` (默认为：`false`)

---

### metaProperty
```javascript
t.metaProperty(meta, property)
```

参见 `t.isMetaProperty(node, opts)` 和 `t.assertMetaProperty(node, opts)` 。

别名: `Expression`

 - `meta`: `string` (必填)
 - `property`: `string` (必填)

---

### mixedTypeAnnotation
```javascript
t.mixedTypeAnnotation()
```

参见 `t.isMixedTypeAnnotation(node, opts)` 和 `t.assertMixedTypeAnnotation(node, opts)` 。

别名: `Flow`, `FlowBaseAnnotation`


---

### newExpression
```javascript
t.newExpression(callee, arguments)
```

参见 `t.isNewExpression(node, opts)` 和 `t.assertNewExpression(node, opts)` 。

别名: `Expression`

 - `callee`: `Expression` (必填)
 - `arguments`: `Array<Expression | SpreadElement>` (必填)

---

### noop
```javascript
t.noop()
```

参见 `t.isNoop(node, opts)` 和 `t.assertNoop(node, opts)` 。


---

### nullLiteral
```javascript
t.nullLiteral()
```

参见 `t.isNullLiteral(node, opts)` 和 `t.assertNullLiteral(node, opts)` 。

别名: `Expression`, `Pureish`, `Literal`, `Immutable`


---

### nullLiteralTypeAnnotation
```javascript
t.nullLiteralTypeAnnotation()
```

参见 `t.isNullLiteralTypeAnnotation(node, opts)` 和 `t.assertNullLiteralTypeAnnotation(node, opts)` 。

别名: `Flow`, `FlowBaseAnnotation`


---

### nullableTypeAnnotation
```javascript
t.nullableTypeAnnotation(typeAnnotation)
```

参见 `t.isNullableTypeAnnotation(node, opts)` 和 `t.assertNullableTypeAnnotation(node, opts)` 。

别名: `Flow`

 - `typeAnnotation` (必填)

---

### numberTypeAnnotation
```javascript
t.numberTypeAnnotation()
```

参见 `t.isNumberTypeAnnotation(node, opts)` 和 `t.assertNumberTypeAnnotation(node, opts)` 。

别名: `Flow`, `FlowBaseAnnotation`


---

### numericLiteral
```javascript
t.numericLiteral(value)
```

参见 `t.isNumericLiteral(node, opts)` 和 `t.assertNumericLiteral(node, opts)` 。

别名: `Expression`, `Pureish`, `Literal`, `Immutable`

 - `value`: `number` (必填)

---

### numericLiteralTypeAnnotation
```javascript
t.numericLiteralTypeAnnotation()
```

参见 `t.isNumericLiteralTypeAnnotation(node, opts)` 和 `t.assertNumericLiteralTypeAnnotation(node, opts)` 。

别名: `Flow`


---

### objectExpression
```javascript
t.objectExpression(properties)
```

参见 `t.isObjectExpression(node, opts)` 和 `t.assertObjectExpression(node, opts)` 。

别名: `Expression`

 - `properties`: `Array<ObjectMethod | ObjectProperty | SpreadProperty>` (必填)

---

### objectMethod
```javascript
t.objectMethod(kind, key, params, body, computed)
```

参见 `t.isObjectMethod(node, opts)` 和 `t.assertObjectMethod(node, opts)` 。

别名: `UserWhitespacable`, `Function`, `Scopable`, `BlockParent`, `FunctionParent`, `Method`, `ObjectMember`

 - `kind`: `"method" | "get" | "set"` (默认为：`'method'`)
 - `key`if computed then `Expression` else `Identifier | Literal` (必填)
 - `params` (必填)
 - `body`: `BlockStatement` (必填)
 - `computed`: `boolean` (默认为：`false`)
 - `async`: `boolean` (默认为：`false`)
 - `decorators`: `Array<Decorator>` (默认为：`null`)
 - `generator`: `boolean` (默认为：`false`)
 - `returnType` (默认为：`null`)
 - `typeParameters` (默认为：`null`)

---

### objectPattern
```javascript
t.objectPattern(properties, typeAnnotation)
```

参见 `t.isObjectPattern(node, opts)` 和 `t.assertObjectPattern(node, opts)` 。

别名: `Pattern`, `LVal`

 - `properties`: `Array<RestProperty | Property>` (必填)
 - `typeAnnotation` (必填)
 - `decorators`: `Array<Decorator>` (默认为：`null`)

---

### objectProperty
```javascript
t.objectProperty(key, value, computed, shorthand, decorators)
```

参见 `t.isObjectProperty(node, opts)` 和 `t.assertObjectProperty(node, opts)` 。

别名: `UserWhitespacable`, `Property`, `ObjectMember`

 - `key`if computed then `Expression` else `Identifier | Literal` (必填)
 - `value`: `Expression | Pattern | RestElement` (必填)
 - `computed`: `boolean` (默认为：`false`)
 - `shorthand`: `boolean` (默认为：`false`)
 - `decorators`: `Array<Decorator>` (默认为：`null`)

---

### objectTypeAnnotation
```javascript
t.objectTypeAnnotation(properties, indexers, callProperties)
```

参见 `t.isObjectTypeAnnotation(node, opts)` 和 `t.assertObjectTypeAnnotation(node, opts)` 。

别名: `Flow`

 - `properties` (必填)
 - `indexers` (必填)
 - `callProperties` (必填)

---

### objectTypeCallProperty
```javascript
t.objectTypeCallProperty(value)
```

参见 `t.isObjectTypeCallProperty(node, opts)` 和 `t.assertObjectTypeCallProperty(node, opts)` 。

别名: `Flow`, `UserWhitespacable`

 - `value` (必填)

---

### objectTypeIndexer
```javascript
t.objectTypeIndexer(id, key, value)
```

参见 `t.isObjectTypeIndexer(node, opts)` 和 `t.assertObjectTypeIndexer(node, opts)` 。

别名: `Flow`, `UserWhitespacable`

 - `id` (必填)
 - `key` (必填)
 - `value` (必填)

---

### objectTypeProperty
```javascript
t.objectTypeProperty(key, value)
```

参见 `t.isObjectTypeProperty(node, opts)` 和 `t.assertObjectTypeProperty(node, opts)` 。

别名: `Flow`, `UserWhitespacable`

 - `key` (必填)
 - `value` (必填)

---

### objectTypeSpreadProperty
```javascript
t.objectTypeSpreadProperty(argument)
```

参见 `t.isObjectTypeSpreadProperty(node, opts)` 和 `t.assertObjectTypeSpreadProperty(node, opts)` 。

别名: `Flow`, `UserWhitespacable`

 - `argument` (必填)

---

### opaqueType
```javascript
t.opaqueType(id, typeParameters, impltype, supertype)
```

参见 `t.isOpaqueType(node, opts)` 和 `t.assertOpaqueType(node, opts)` 。

别名: `Flow`, `FlowDeclaration`, `Statement`, `Declaration`

 - `id` (必填)
 - `typeParameters` (必填)
 - `impltype` (必填)
 - `supertype` (必填)

---

### parenthesizedExpression
```javascript
t.parenthesizedExpression(expression)
```

参见 `t.isParenthesizedExpression(node, opts)` 和 `t.assertParenthesizedExpression(node, opts)` 。

别名: `Expression`, `ExpressionWrapper`

 - `expression`: `Expression` (必填)

---

### program
```javascript
t.program(body, directives)
```

参见 `t.isProgram(node, opts)` 和 `t.assertProgram(node, opts)` 。

别名: `Scopable`, `BlockParent`, `Block`, `FunctionParent`

 - `body`: `Array<Statement>` (必填)
 - `directives`: `Array<Directive>` (默认为：`[]`)

---

### qualifiedTypeIdentifier
```javascript
t.qualifiedTypeIdentifier(id, qualification)
```

参见 `t.isQualifiedTypeIdentifier(node, opts)` 和 `t.assertQualifiedTypeIdentifier(node, opts)` 。

别名: `Flow`

 - `id` (必填)
 - `qualification` (必填)

---

### regExpLiteral
```javascript
t.regExpLiteral(pattern, flags)
```

参见 `t.isRegExpLiteral(node, opts)` 和 `t.assertRegExpLiteral(node, opts)` 。

别名: `Expression`, `Literal`

 - `pattern`: `string` (必填)
 - `flags`: `string` (默认为：`''`)

---

### restElement
```javascript
t.restElement(argument, typeAnnotation)
```

参见 `t.isRestElement(node, opts)` 和 `t.assertRestElement(node, opts)` 。

别名: `LVal`

 - `argument`: `LVal` (必填)
 - `typeAnnotation` (必填)
 - `decorators`: `Array<Decorator>` (默认为：`null`)

---

### restProperty
```javascript
t.restProperty(argument)
```

参见 `t.isRestProperty(node, opts)` 和 `t.assertRestProperty(node, opts)` 。

别名: `UnaryLike`

 - `argument`: `LVal` (必填)

---

### returnStatement
```javascript
t.returnStatement(argument)
```

参见 `t.isReturnStatement(node, opts)` 和 `t.assertReturnStatement(node, opts)` 。

别名: `Statement`, `Terminatorless`, `CompletionStatement`

 - `argument`: `Expression` (默认为：`null`)

---

### sequenceExpression
```javascript
t.sequenceExpression(expressions)
```

参见 `t.isSequenceExpression(node, opts)` 和 `t.assertSequenceExpression(node, opts)` 。

别名: `Expression`

 - `expressions`: `Array<Expression>` (必填)

---

### spreadElement
```javascript
t.spreadElement(argument)
```

参见 `t.isSpreadElement(node, opts)` 和 `t.assertSpreadElement(node, opts)` 。

别名: `UnaryLike`

 - `argument`: `Expression` (必填)

---

### spreadProperty
```javascript
t.spreadProperty(argument)
```

参见 `t.isSpreadProperty(node, opts)` 和 `t.assertSpreadProperty(node, opts)` 。

别名: `UnaryLike`

 - `argument`: `Expression` (必填)

---

### stringLiteral
```javascript
t.stringLiteral(value)
```

参见 `t.isStringLiteral(node, opts)` 和 `t.assertStringLiteral(node, opts)` 。

别名: `Expression`, `Pureish`, `Literal`, `Immutable`

 - `value`: `string` (必填)

---

### stringLiteralTypeAnnotation
```javascript
t.stringLiteralTypeAnnotation()
```

参见 `t.isStringLiteralTypeAnnotation(node, opts)` 和 `t.assertStringLiteralTypeAnnotation(node, opts)` 。

别名: `Flow`


---

### stringTypeAnnotation
```javascript
t.stringTypeAnnotation()
```

参见 `t.isStringTypeAnnotation(node, opts)` 和 `t.assertStringTypeAnnotation(node, opts)` 。

别名: `Flow`, `FlowBaseAnnotation`


---

### super
```javascript
t.super()
```

参见 `t.isSuper(node, opts)` 和 `t.assertSuper(node, opts)` 。

别名: `Expression`


---

### switchCase
```javascript
t.switchCase(test, consequent)
```

参见 `t.isSwitchCase(node, opts)` 和 `t.assertSwitchCase(node, opts)` 。

 - `test`: `Expression` (默认为：`null`)
 - `consequent`: `Array<Statement>` (必填)

---

### switchStatement
```javascript
t.switchStatement(discriminant, cases)
```

参见 `t.isSwitchStatement(node, opts)` 和 `t.assertSwitchStatement(node, opts)` 。

别名: `Statement`, `BlockParent`, `Scopable`

 - `discriminant`: `Expression` (必填)
 - `cases`: `Array<SwitchCase>` (必填)

---

### taggedTemplateExpression
```javascript
t.taggedTemplateExpression(tag, quasi)
```

参见 `t.isTaggedTemplateExpression(node, opts)` 和 `t.assertTaggedTemplateExpression(node, opts)` 。

别名: `Expression`

 - `tag`: `Expression` (必填)
 - `quasi`: `TemplateLiteral` (必填)

---

### templateElement
```javascript
t.templateElement(value, tail)
```

参见 `t.isTemplateElement(node, opts)` 和 `t.assertTemplateElement(node, opts)` 。

 - `value` (必填)
 - `tail`: `boolean` (默认为：`false`)

---

### templateLiteral
```javascript
t.templateLiteral(quasis, expressions)
```

参见 `t.isTemplateLiteral(node, opts)` 和 `t.assertTemplateLiteral(node, opts)` 。

别名: `Expression`, `Literal`

 - `quasis`: `Array<TemplateElement>` (必填)
 - `expressions`: `Array<Expression>` (必填)

---

### thisExpression
```javascript
t.thisExpression()
```

参见 `t.isThisExpression(node, opts)` 和 `t.assertThisExpression(node, opts)` 。

别名: `Expression`


---

### thisTypeAnnotation
```javascript
t.thisTypeAnnotation()
```

参见 `t.isThisTypeAnnotation(node, opts)` 和 `t.assertThisTypeAnnotation(node, opts)` 。

别名: `Flow`, `FlowBaseAnnotation`


---

### throwStatement
```javascript
t.throwStatement(argument)
```

参见 `t.isThrowStatement(node, opts)` 和 `t.assertThrowStatement(node, opts)` 。

别名: `Statement`, `Terminatorless`, `CompletionStatement`

 - `argument`: `Expression` (必填)

---

### tryStatement
```javascript
t.tryStatement(block, handler, finalizer)
```

参见 `t.isTryStatement(node, opts)` 和 `t.assertTryStatement(node, opts)` 。

别名: `Statement`

 - `block` (必填)
 - `handler` (默认为：`null`)
 - `finalizer`: `BlockStatement` (默认为：`null`)
 - `body`: `BlockStatement` (默认为：`null`)

---

### tupleTypeAnnotation
```javascript
t.tupleTypeAnnotation(types)
```

参见 `t.isTupleTypeAnnotation(node, opts)` 和 `t.assertTupleTypeAnnotation(node, opts)` 。

别名: `Flow`

 - `types` (必填)

---

### typeAlias
```javascript
t.typeAlias(id, typeParameters, right)
```

参见 `t.isTypeAlias(node, opts)` 和 `t.assertTypeAlias(node, opts)` 。

别名: `Flow`, `FlowDeclaration`, `Statement`, `Declaration`

 - `id` (必填)
 - `typeParameters` (必填)
 - `right` (必填)

---

### typeAnnotation
```javascript
t.typeAnnotation(typeAnnotation)
```

参见 `t.isTypeAnnotation(node, opts)` 和 `t.assertTypeAnnotation(node, opts)` 。

别名: `Flow`

 - `typeAnnotation` (必填)

---

### typeCastExpression
```javascript
t.typeCastExpression(expression, typeAnnotation)
```

参见 `t.isTypeCastExpression(node, opts)` 和 `t.assertTypeCastExpression(node, opts)` 。

别名: `Flow`, `ExpressionWrapper`, `Expression`

 - `expression` (必填)
 - `typeAnnotation` (必填)

---

### typeParameter
```javascript
t.typeParameter(bound)
```

参见 `t.isTypeParameter(node, opts)` 和 `t.assertTypeParameter(node, opts)` 。

别名: `Flow`

 - `bound` (必填)

---

### typeParameterDeclaration
```javascript
t.typeParameterDeclaration(params)
```

参见 `t.isTypeParameterDeclaration(node, opts)` 和 `t.assertTypeParameterDeclaration(node, opts)` 。

别名: `Flow`

 - `params` (必填)

---

### typeParameterInstantiation
```javascript
t.typeParameterInstantiation(params)
```

参见 `t.isTypeParameterInstantiation(node, opts)` 和 `t.assertTypeParameterInstantiation(node, opts)` 。

别名: `Flow`

 - `params` (必填)

---

### typeofTypeAnnotation
```javascript
t.typeofTypeAnnotation(argument)
```

参见 `t.isTypeofTypeAnnotation(node, opts)` 和 `t.assertTypeofTypeAnnotation(node, opts)` 。

别名: `Flow`

 - `argument` (必填)

---

### unaryExpression
```javascript
t.unaryExpression(operator, argument, prefix)
```

参见 `t.isUnaryExpression(node, opts)` 和 `t.assertUnaryExpression(node, opts)` 。

别名: `UnaryLike`, `Expression`

 - `operator`: `'void' | 'delete' | '!' | '+' | '-' | '++' | '--' | '~' | 'typeof'` (必填)
 - `argument`: `Expression` (必填)
 - `prefix`: `boolean` (默认为：`true`)

---

### unionTypeAnnotation
```javascript
t.unionTypeAnnotation(types)
```

参见 `t.isUnionTypeAnnotation(node, opts)` 和 `t.assertUnionTypeAnnotation(node, opts)` 。

别名: `Flow`

 - `types` (必填)

---

### updateExpression
```javascript
t.updateExpression(operator, argument, prefix)
```

参见 `t.isUpdateExpression(node, opts)` 和 `t.assertUpdateExpression(node, opts)` 。

别名: `Expression`

 - `operator`: `'++' | '--'` (必填)
 - `argument`: `Expression` (必填)
 - `prefix`: `boolean` (默认为：`false`)

---

### variableDeclaration
```javascript
t.variableDeclaration(kind, declarations)
```

参见 `t.isVariableDeclaration(node, opts)` 和 `t.assertVariableDeclaration(node, opts)` 。

别名: `Statement`, `Declaration`

 - `kind`: `"var" | "let" | "const"` (必填)
 - `declarations`: `Array<VariableDeclarator>` (必填)

---` 。

### variableDeclarator
```javascript
t.variableDeclarator(id, init)
```

参见 `t.isVariableDeclarator(node, opts)` 和 `t.assertVariableDeclarator(node, opts)` 。

 - `id`: `LVal` (必填)
 - `init`: `Expression` (默认为：`null`)

---

### voidTypeAnnotation
```javascript
t.voidTypeAnnotation()
```

参见 `t.isVoidTypeAnnotation(node, opts)` 和 `t.assertVoidTypeAnnotation(node, opts)` 。

别名: `Flow`, `FlowBaseAnnotation`


---

### whileStatement
```javascript
t.whileStatement(test, body)
```

参见 `t.isWhileStatement(node, opts)` 和 `t.assertWhileStatement(node, opts)` 。

别名: `Statement`, `BlockParent`, `Loop`, `While`, `Scopable`

 - `test`: `Expression` (必填)
 - `body`: `BlockStatement | Statement` (必填)

---

### withStatement
```javascript
t.withStatement(object, body)
```

参见 `t.isWithStatement(node, opts)` 和 `t.assertWithStatement(node, opts)` 。

别名: `Statement`

 - `object` (必填)
 - `body`: `BlockStatement | Statement` (必填)

---

### yieldExpression
```javascript
t.yieldExpression(argument, delegate)
```

参见 `t.isYieldExpression(node, opts)` 和 `t.assertYieldExpression(node, opts)` 。

别名: `Expression`, `Terminatorless`

 - `argument`: `Expression` (默认为：`null`)
 - `delegate`: `boolean` (默认为：`false`)

---


<!-- end generated section -->


