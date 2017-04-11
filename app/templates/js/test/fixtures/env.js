'use strict';
const pkg = require('../../package.json');

process.env.TZ = 'UTC';
process.env.NODE_ENV = 'test';
process.env.AWS_LAMBDA_FUNCTION_NAME = `test_${pkg.name}`;
process.env.AWS_REGION = 'eu-west-1';
process.env.AWS_ACCESS_KEY_ID = 'FRMLIAIKRNG5AKBZ8WTZ';
process.env.AWS_SECRET_ACCESS_KEY = 'lrat4piGuIbafl5VBkzlb81uZQhntGLBaJoCr01w';
