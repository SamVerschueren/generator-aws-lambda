import test from 'ava';
import {bootstrap} from './fixtures/bootstrap';

bootstrap(test, 'get', 'hello');

test('result', async t => {
	t.is(await t.context.fn(), 'world');
});
