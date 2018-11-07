# karma-socket-reporter

Simple karma reporter that sends suit results over socket connection

## Installation

You can simply install `karma-socket-reporter` as a devDependency by:
```bash
npm install karma-socket-reporter --save-dev
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    reporters: ['socket']
  });
};
```

You can pass a list of reporters as a CLI argument too:
```bash
karma start --reporters socket
```

## Options

You can specify options in the karma conf file:
 - host (default: '127.0.0.1')
 - port (default: '4444')
 - ok Message to send (default: 'ok')
 - ko message to send (default: 'ko')
 - started Message to send (default: 'start')
 - skip message to send (default: 'skip')

Reporters sends a stringified object: 
 {
    type: Message Type (ex: 'ko'),
    msg: {
        name: Test Name,
        msg: Jasmine Result
    }
 }
