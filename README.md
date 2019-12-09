<p align="center">
    <img src="media/g4n.png"
         height="200" alt="ghasedak for nodejs">
</p>

<p align="center">
  <a href="https://travis-ci.org/ghasedakapi/ghasedak-node">
    <img src="https://travis-ci.org/ghasedakapi/ghasedak-node.svg?branch=master"
         alt="Build Status">
  </a>
  <a href="https://www.npmjs.com/package/ghasedak">
    <img src="https://badge.fury.io/js/ghasedak.svg"
         alt="npm version">
  </a>
</p>
<p align="center"><sup><strong> Ghasedak sms webservice package for nodejs. </strong></sup></p>

## install

You can simply install and use ghasedak nodejs library from npm:

```sh
npm install --save ghasedak-node
```

or from yarn:

```sh
yarn install ghasedak-node
```

## usage

Import `ghasedak` package:

```javascript
const Ghasedak = require("ghasedak");
```

You need a [Ghasedak](https://ghasedak.io) account. Register and get your API key.

Create an instance from `Ghasedak` class with your API key:

```javascript
let ghasedak = Ghasedak(
  "3ef8539ba50c06b2a11d674c8a7ded7d7360d7b090b5146ff0761e8d9927bd31"
);
```

Send some sms:

```javascript
ghasedak
  .send({
    message: "Hello World!",
    receptor: "09xxxxxxxxx",
    linenumber: "300002525"
  })
  .then(res => {
    // ... check documentation for response type
    // https://ghasedak.io/docs
  });
```
