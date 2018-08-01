---
id: version-6.x-babel-helpers
title: babel-helpers
sidebar_label: babel-helpers
original_id: babel-helpers
---

## 安装

```sh
npm install --save-dev babel-helpers
```

## 用法

```js
import * as helpers from 'babel-helpers';
import * as t from 'babel-types';

const typeofHelper = helpers.get('typeof');

t.isExpressionStatement(typeofHelper);
// true
```

