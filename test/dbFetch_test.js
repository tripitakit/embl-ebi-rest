'use strict';

var Dbfetch = require('../lib/embl-ebi-rest.js').Dbfetch;

exports['test'] = {

	setUp: function(done) {
		done();
	},
   
	'dbfetch.get succeds with valid params': function(test) {
		test.expect(1);
		var sample = {db:"uniprotkb", id:"WAP_RAT", format:"fasta", style:"raw"}
		var dbfetch = new Dbfetch(sample);
		dbfetch.on('stored', function(){
			test.equal(this.entry.slice(0,18), ">sp|P01174|WAP_RAT");
			test.done();
		});
		dbfetch.get();
	},
  
	 'dbfetch.get() fails with invalid db-name and throws error': function(test) {
	    test.expect(1);
	  	var sample = {db:"invalid-db-name", id:"WAP_RAT", format:"fasta", style:"raw"}
	  	var dbfetch = new Dbfetch(sample);
		test.throws(function() { dbfetch.get() });
		test.done();
	},
  
  	'dbfetch.get() succeds with multiple ids' : function(test) {
  		test.expect(1);
		var sample = {db:"embl", id:"M10051, K00650, D87894, AJ242600", format:"fasta", style:"raw"}
		var dbfetch = new Dbfetch(sample);
		dbfetch.on('stored', function(){
			test.equal(this.entry.length, 16415);
			test.done();
		});
		dbfetch.get();
  	},
	
	'dbfetch.parseRawFasta() returns an entry object with id, accession, description, seq properties' : function(test) {
		test.expect(4);
		var sample = {db:"embl", id:"J00231", format:"fasta", style:"raw"};
		var dbfetch = new Dbfetch(sample);
		dbfetch.on('stored', function(){
			var parsed = this.parseRawFasta();
			test.equal(parsed.id, 'ENA');
			test.equal(parsed.accession, 'J00231');
			test.equal(parsed.description, 'J00231.1 Human Ig gamma3 heavy chain disease OMM protein mRNA.');
			test.equal(parsed.seq.length, 1089);
		    test.done();
		});
		dbfetch.get();
	},
	
	'dbfetch.parseRawFasta() with multple ids query returns an array of entry objects' : function(test) {
  		test.expect(3);
		var sample = {db:"embl", id:"M10051, K00650, D87894, AJ242600", format:"fasta", style:"raw"}
		var dbfetch = new Dbfetch(sample);
		dbfetch.on('stored', function(){
			var parsed = this.parseRawFasta();
			test.equal(typeof parsed, 'object');
			test.equal(parsed.length, 4);
			test.equal(Object.keys(parsed[0]).join(), 'id,accession,description,seq');
			test.done();
		});
		dbfetch.get();
	}
  
};
