# Bottender Chatbase

[![npm](https://img.shields.io/npm/v/bottender-chatbase.svg?style=flat-square)](https://www.npmjs.com/package/bottender-chatbase)
[![Build Status](https://travis-ci.org/bottenderjs/bottender-chatbase.svg?branch=master)](https://travis-ci.org/bottenderjs/bottender-chatbase)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Middleware for using [Chatbase](https://chatbase.com/welcome) with
> [Bottender](https://github.com/Yoctol/bottender).

## Installation

```sh
npm install bottender-chatbase
```

## Example

```js
const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');
const chatbaseMiddleware = require('bottender-chatbase/express');

const bot = new MessengerBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  appSecret: '__FILL_YOUR_SECRET_HERE__',
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot, {
  verifyToken: '__FILL_YOUR_VERIFY_TOKEN_HERE__',
  webhookMiddleware: chatbaseMiddleware(bot, {
    apiKey: '__FILL_YOUR_CHATBASE_KEY_HERE__',
    platform: 'Facebook',
  }),
});

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
```

## Server

Supported server:

* express
* koa

### [express](https://github.com/expressjs/express)

```js
const chatbaseMiddleware = require('bottender-chatbase/express');
```

### [koa](https://github.com/koajs/koa)

```js
const chatbaseMiddleware = require('bottender-chatbase/koa');
```

## Contributing

Pull Requests and issue reports are welcome. You can follow steps below to
submit your pull requests:

Fork, then clone the repo:

```sh
git clone git@github.com:your-username/bottender-chatbase.git
```

Install the dependencies:

```sh
cd bottender-chatbase
yarn
```

Make sure the tests pass (including eslint, flow checks and jest tests):

```sh
yarn test
```

Make your changes and tests, and make sure the tests pass.

## License

MIT © [Yoctol](https://github.com/bottenderjs/bottender-chatbase)
