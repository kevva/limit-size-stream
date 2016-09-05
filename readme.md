# limit-size-stream [![Build Status](https://travis-ci.org/kevva/limit-size-stream.svg?branch=master)](https://travis-ci.org/kevva/limit-size-stream)

> Limit the size of a stream


## Install

```
$ npm install --save limit-size-stream
```


## Usage

```js
const fs = require('fs');
const getStream = require('get-stream');
const limitSizeStream = require('limit-size-stream');
const stream = fs.createReadStream('unicorn.txt');

getStream(limitStream(stream, 5)).then(str => {
	console.log(str);
	//=> 'unico'
});
```


## API

### limitSizeStream(stream, limit)

#### stream

Type: `Stream`

Stream to limit.

#### limit

Type: `number`

Maximum length of the returned buffer or string.

### limitSizeStream.obj(stream, limit)

#### stream

Type: `Stream`

Stream to limit.

#### limit

Type: `number`

Maximum number of items to return.


## License

MIT © [Kevin Martensson](https://github.com/kevva)
