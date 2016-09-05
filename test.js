import {Transform} from 'stream';
import getStream from 'get-stream';
import test from 'ava';
import m from './';

const writeStream = objectMode => {
	return new Transform({
		objectMode,
		transform(chunk, enc, cb) {
			this.push(chunk);
			cb();
		}
	});
};

test('buffer', async t => {
	const stream = writeStream();
	const buf = new Buffer(5);

	stream.write(buf);
	stream.write(buf);

	const ret = await getStream.buffer(m(stream, 5));

	t.deepEqual(ret, buf);
	t.is(ret.length, 5);
});

test('string', async t => {
	const stream = writeStream();

	stream.write('uni');
	stream.write('cor');
	stream.write('n');
	stream.write('foo');

	const ret = await getStream(m(stream, 7));

	t.deepEqual(ret, 'unicorn');
	t.is(ret.length, 7);
});

test('object', async t => {
	const stream = writeStream(true);

	stream.write({});
	stream.write({});
	stream.write({});

	const ret = await getStream.array(m.obj(stream, 2));

	t.is(ret.length, 2);
	t.deepEqual(ret, [{}, {}]);
});
