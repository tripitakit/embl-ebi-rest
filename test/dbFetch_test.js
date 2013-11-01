'use strict';

var Dbfetch = require('../lib/embl-ebi-rest.js').Dbfetch;

exports['test'] = {

	setUp: function(done) {
		done();
	},
   
	'dbFetch.get succeds with valid params': function(test) {
		test.expect(1);
		var sample = {db:"uniprotkb", id:"WAP_RAT", format:"fasta", style:"raw"}
		var dbfetch = new Dbfetch(sample);
		dbfetch.on('stored', function(){
				test.equal(this.entry.slice(0,18), ">sp|P01174|WAP_RAT");
			    test.done();
			}
		);
		dbfetch.get();
	},
  
	 'dbFetch.get with invalid db-name throws error': function(test) {
	    test.expect(1);
	  	var sample = {db:"invalid-db-name", id:"WAP_RAT", format:"fasta", style:"raw"}
	  	var dbfetch = new Dbfetch(sample);
		test.throws(function() { dbfetch.get() } );
		test.done();
	},
  
  	'dbfetch.get with multiple id as string' : function(test) {
  		test.expect(1);
		var sample = {db:"embl", id:"M10051, K00650, D87894, AJ242600", format:"fasta", style:"raw"}
		var dbfetch = new Dbfetch(sample);
		dbfetch.on('stored', function(){
				test.equal(this.entry.length, 16415);
			    test.done();
			}
		);
		dbfetch.get();
  	}
  
};
