'use strict';

/**
 * Test suite for <%= functionDescription %>
 * 
 * @author <%= name %>      <<%= email %>>
 * @since  <%= date %>
 */

// module dependencies
var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    context = require('aws-lambda-mock-context');

// Use should flavour for Mocha
chai.should();
chai.use(sinonChai);

var index = require('../');

describe('<%= functionName %>', function() {
    
    it('Should call the succeed method', function(done) {
        index.handler({hello: 'world'}, context());

        context.Promise
            .then(function() {
                // succeed() called
                done();
            })
            .catch(function(err) {
                // fail() called
                done(err);
            });
    });
});