'use strict';

var dbFetch = require('../lib/embl-ebi-rest.js').dbFetch;

exports['test'] = {
  setUp: function(done) {
    done();
  },
  'dbFetch': function(test) {
    test.expect(1);
    test.doesNotThrow(function(){dbFetch.get()});
    test.done();
  },
};




/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/
