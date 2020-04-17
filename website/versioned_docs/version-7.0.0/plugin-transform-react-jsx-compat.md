---
id: version-7.0.0-babel-plugin-transform-react-jsx-compat
title: @babel/plugin-transform-react-jsx-compat
sidebar_label: transform-react-jsx-compat
original_id: babel-plugin-transform-react-jsx-compat
---

## Example

**In**

```javascript
var profile = <div>
  <img src="avatar.png" class="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;
```

**Out**

```javascript
var profile = React.DOM.div(null,
  React.DOM.img({ src: "avatar.png", "class": "profile" }),
  React.DOM.h3(null, [user.firstName, user.lastName].join(" "))
);
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-react-jsx-compat
```

## Usage

### With a configuration file (Recommended)

```json
{
  "plugins": ["@babel/plugin-transform-react-jsx-compat"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-react-jsx-compat script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-react-jsx-compat"]
});
```

