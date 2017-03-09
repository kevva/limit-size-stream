'use strict';
const PassThrough = require('stream').PassThrough;
const isStream = require('is-stream');

const limitSizeStream = (inputStream, limit, opts) => {
	opts = Object.assign({objectMode: false}, opts);

	if (!isStream(inputStream)) {
		throw new TypeError(`Expected a stream, got ${typeof inputStream}`);
	}

	const stream = new PassThrough({objectMode: opts.objectMode});

	inputStream.pipe(stream);

	if (typeof limit === 'number') {
		let len = 0;

		stream.on('data', data => {
			if (opts.objectMode) {
				len++;
			} else {
				len += data.length;
			}

			if (len >= limit) {
				inputStream.unpipe(stream);
				stream.end();
			}
		});
	}

	return stream;
};

module.exports = (stream, limit) => limitSizeStream(stream, limit);
module.exports.obj = (stream, limit) => limitSizeStream(stream, limit, {objectMode: true});
