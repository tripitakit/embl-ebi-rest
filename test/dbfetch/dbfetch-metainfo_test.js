'use strict';

var info = require('../../lib/dbfetch/dbfetch-info.js');

exports['test'] = {

	setUp: function(done) {
		done();
	},

	'dbfetch.db() list databases': function(test) {
		test.expect(1);
		test.ok(info.db().length > 0);
		test.done();
	},
	
	'dbfetch.db(<valid db_name>) succeds!': function(test) {
		test.expect(1);
		test.equal(info.db('embl').displayName, 'EMBL-Bank');
		test.done();
	},
	
	'dbfetch.db(<invalid db_name>) fails!': function(test) {
		test.expect(1);
		test.throws(function(){info.db('invalid-db-name')});
		test.done();
	},
	
	'dbfetch.formats(<meta-info-obj>) succeds!': function(test) {
		test.expect(1);
		var embl_metainfo = info.db('embl');
		test.equal((info.formats(embl_metainfo)[0]).name, 'default');
		test.done();
	},
	
	'dbfetch.formats(<not a meta-info obj>) fails!': function(test) {
		test.expect(1);
		test.throws(function(){info.formats('embl')});
		test.done();
	},
	
	'dbfetch.format(<meta-info-obj>, <valid-format>) succeds!': function(test) {
		test.expect(1);
		var embl_metainfo = info.db('embl');
		test.equal(info.format(embl_metainfo, 'fasta').name, 'fasta');
		test.done();
	},
	
	'dbfetch.format(<meta-info-obj>, <invalid-format>) fails!': function(test) {
		test.expect(1);
		var embl_metainfo = info.db('embl');
		test.throws(function(){info.format(embl_metainfo, 'invalid-format')});
		test.done();
	},
	
	'dbfetch.styles(<meta-info-obj>) succeds!': function(test) {
		test.expect(1);
		var embl_metainfo = info.db('embl');
		var embl_fasta = info.format(embl_metainfo, 'fasta');
		test.equal(info.styles(embl_fasta).length, 3);
		test.done();
	},
	
}