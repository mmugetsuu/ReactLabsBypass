[![ReactLabs Logo](https://react.su/img/logo.png)](http://react.su/)

 ReactLabsBypass is a tool designed to bypass DDoS protection mechanisms implemented by ReactLabs for [Node.js](http://nodejs.org).

[![npm version](https://img.shields.io/npm/v/reactlabsbypass.svg?style=flat-square)](https://www.npmjs.org/package/reactlabsbypass)
[![npm downloads](https://img.shields.io/npm/dm/reactlabsbypass.svg?style=flat-square)](https://npm-stat.com/charts.html?package=reactlabsbypass)

```js
const { bypassReact } = require('reactlabsbypass');
import { bypassReact } from 'reactlabsbypass';

bypassReact({
    url: 'https://arizona-rp.com/'
  }).then((html) => console.log(`HTML: ${html}`))
    .catch(err => console.error(err));
```

## Installation

```console
$ npm install reactlabsbypass
$ yarn add reactlabsbypass
```


## Links

  * [Author](http://mugetsu.app/) | [GitHub](https://github.com/mmugetsuu/ReactLabsBypass)