'use strict';

var Dbfetch = require('../../lib/embl-ebi-rest.js').Dbfetch;

exports['test'] = {

	setUp: function(done) {
		this.dbfetch = new Dbfetch();
		done();
	},
   
	'async get() fasta raw with valid params': function(test) {
		test.expect(1);
		var sample = {db:"uniprotkb", id:"WAP_RAT", format:"fasta", style:"raw"}

		this.dbfetch.get(sample, function(self){
			test.equal(self.entry.slice(0,18), ">sp|P01174|WAP_RAT");
			test.done();
		});

	},
  
	 'async get() fails with invalid db-name and throws error': function(test) {
	    test.expect(1);
	  	var sample = {db:"invalid-db-name", id:"WAP_RAT", format:"fasta", style:"raw"}
		test.throws(function() { this.dbfetch.get(sample, false) });
		test.done();
	},
  
  	'async get() fasta raw with multiple ids' : function(test) {
  		test.expect(1);
		var sample = {db:"embl", id:"M10051, K00650, D87894, AJ242600", format:"fasta", style:"raw"}
		this.dbfetch.get(sample, function(self){
			test.equal(self.entry.length, 16415);
			test.done();
		});
  	},
	
	'sync fasta2json() returns an json obj of the entry with id, accession, description, seq properties' : function(test) {
		test.expect(4);
		var sample = {db:"embl", id:"J00231", format:"fasta", style:"raw"};
		this.dbfetch.get(sample, function(self) {
			var parsedObj = self.fasta2json();
			test.equal(parsedObj.id, 'ENA');
			test.equal(parsedObj.accession, 'J00231');
			test.equal(parsedObj.description, 'J00231.1 Human Ig gamma3 heavy chain disease OMM protein mRNA.');
			test.equal(parsedObj.seq.length, 1089);
		    test.done();
		});
	},
	
	'sync fasta2json() stores jsonEntry property with id, accession, description, seq properties' : function(test) {
		test.expect(4);
		var sample = {db:"embl", id:"J00231", format:"fasta", style:"raw"};
		this.dbfetch.get(sample, function(self) {
			self.fasta2json();
			var jsonEntry = self.jsonEntry;
			test.equal(jsonEntry.id, 'ENA');
			test.equal(jsonEntry.accession, 'J00231');
			test.equal(jsonEntry.description, 'J00231.1 Human Ig gamma3 heavy chain disease OMM protein mRNA.');
			test.equal(jsonEntry.seq.length, 1089);
		    test.done();
		});
	},
	
	'sync fasta2json() on multple ids get() returns an array of entry objects' : function(test) {
  		test.expect(3);
		var sample = {db:"embl", id:"M10051, K00650", format:"fasta", style:"raw"}
		this.dbfetch.get(sample, function(self){
			var parsedArrayObj = self.fasta2json();
			test.equal(typeof parsedArrayObj, 'object');
			test.equal(parsedArrayObj.length, 2);
			test.equal(Object.keys(parsedArrayObj[0]).join(), 'id,accession,description,seq');
			test.done();
		});
	}

};
