---
id: version-6.26.3-babel-plugin-transform-react-jsx
title: babel-plugin-transform-react-jsx
sidebar_label: transform-react-jsx
original_id: babel-plugin-transform-react-jsx
---

You can also use React without using Babel: [React Without JSX](https://facebook.github.io/react/docs/react-without-jsx.html)

One way to do this is by manually writing `React.createElement`, or aliasing it to something like `$`

```js
const React = require("react");
const ReactDOM = require("react-dom");
const $ = React.createElement;

ReactDOM.render(
  $("div", null, "Hello World"), // <div>Hello World</div>
  document.getElementById("root")
);
```

Also checkout [WTF is JSX](https://jasonformat.com/wtf-is-jsx/) for an explanation of the syntax and how it's just a sugar for function calls.

## Example

### React

**In**

```javascript
var profile = <div>
  <img src="avatar.png" className="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;
```

**Out**

```javascript
var profile = React.createElement("div", null,
  React.createElement("img", { src: "avatar.png", className: "profile" }),
  React.createElement("h3", null, [user.firstName, user.lastName].join(" "))
);
```

### Custom

**In**

```javascript
/** @jsx dom */

var { dom } = require("deku");

var profile = <div>
  <img src="avatar.png" className="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;
```

**Out**

```javascript
/** @jsx dom */

var dom = require("deku").dom;

var profile = dom( "div", null,
  dom("img", { src: "avatar.png", className: "profile" }),
  dom("h3", null, [user.firstName, user.lastName].join(" "))
);
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-react-jsx
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

Without options:

```json
{
  "plugins": ["transform-react-jsx"]
}
```

With options:

```json
{
  "plugins": [
    ["transform-react-jsx", {
      "pragma": "dom" // default pragma is React.createElement
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins transform-react-jsx script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-react-jsx"]
});
```

## Options

### `pragma`

`string`, defaults to `React.createElement`.

Replace the function used when compiling JSX expressions.

Note that the `@jsx React.DOM` pragma has been deprecated as of React v0.12

### `useBuiltIns`

`boolean`, defaults to `false`.

When spreading props, use `Object.assign` directly instead of Babel's extend helper.

