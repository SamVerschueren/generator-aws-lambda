import path from 'path';
import fs from 'fs';
import test from 'ava';
import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import pify from 'pify';
import tempfile from 'tempfile';

const fsP = pify(fs);

test.beforeEach(async t => {
	t.context.dir = tempfile();
	await pify(helpers.testDirectory)(t.context.dir);
	t.context.generator = helpers.createGenerator('aws-lambda', [path.join(__dirname, '/app')], null, {skipInstall: true});
});

test.serial('generates expected files', async t => {
	const {generator} = t.context;

	helpers.mockPrompt(generator, {
		functionName: 'test',
		functionDescription: 'test description',
		keywords: ['foo', 'bar', 'baz'],
		githubUsername: 'test',
		typescript: false,
		invoke: true,
		docs: false,
		features: []
	});

	await pify(generator.run.bind(generator))();

	assert.file([
		'.editorconfig',
		'.gitattributes',
		'.gitignore',
		'.travis.yml',
		'index.js',
		'package.json',
		'readme.md',
		'config.json',
		'lib/error-handler.js',
		'lib/controllers/hello.js',
		'test/test.js',
		'test/fixtures/bootstrap.js',
		'test/fixtures/env.js'
	]);

	t.pass();
});

test.serial('generates typescript project', async t => {
	const {generator} = t.context;

	helpers.mockPrompt(generator, {
		functionName: 'test',
		functionDescription: 'test description',
		keywords: ['foo', 'bar', 'baz'],
		githubUsername: 'test',
		typescript: true,
		invoke: true,
		docs: false,
		features: []
	});

	await pify(generator.run.bind(generator))();

	assert.file([
		'.editorconfig',
		'.gitattributes',
		'.gitignore',
		'.travis.yml',
		'package.json',
		'readme.md',
		'src/index.ts',
		'src/config.json',
		'src/lib/error-handler.ts',
		'src/lib/controllers/hello.ts',
		'src/test/test.ts',
		'src/test/fixtures/bootstrap.ts',
		'src/test/fixtures/env.ts'
	]);

	t.pass();
});

test.serial('generates expected package.json', async t => {
	const {generator} = t.context;

	helpers.mockPrompt(generator, {
		functionName: 'foo',
		functionDescription: 'bar',
		keywords: ['foo', 'bar', 'baz'],
		githubUsername: 'test',
		invoke: true,
		docs: false,
		features: ['dynongo']
	});

	await pify(generator.run.bind(generator))();

	const pkg = JSON.parse(await fsP.readFile(path.join(t.context.dir, 'package.json'), 'utf8'));

	t.is(pkg.name, 'foo');
	t.is(pkg.description, 'bar');
	t.deepEqual(pkg.keywords, ['foo', 'bar', 'baz']);
	t.deepEqual(pkg.dependencies, {
		bragg: '^1.0.0',
		'bragg-router': '^1.0.1',
		'bragg-env': '^2.0.0',
		'bragg-route-invoke': '^1.0.2',
		dynongo: '^0.14.1'
	});
});
