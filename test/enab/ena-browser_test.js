'use strict';

var ENAb = require('../../lib/embl-ebi-rest.js').ENAbrowser;

exports['test ENAbrowser'] = {

	setUp: function(done) {
		this.enab = new ENAb();
		done();
	},
  
	'Single id search (null display default to fasta)': function(test){
		test.expect(1);
		var enab = new ENAb(),
			query = {id: 'A00145'}
		enab.idSearch(query, function(self){
			test.equal(self.entry.slice(0,4), ">ENA");
			test.done();
		});
	},
	
	'Query for multiple ids as string with display:fasta': function(test){
		test.expect(1);
		var enab = new ENAb(),
			query = {id: 'A00145,A00146', display: 'fasta'}
		enab.idSearch(query, function(self){
			test.equal(self.entry.split('>').length - 1 , 2); // this split create a '' at index 0
			test.done();
		});

	},
	
	'Query for multiple ids as array  (display default=fasta)': function(test){
		test.expect(1);
		var enab = new ENAb(),
			query = { id: ['A00145','A00146'] };
		
		enab.idSearch(query, function(self){
			test.equal(self.entry.split('>').length - 1 , 2);
			test.done();
		});
	},
	
	'Taxon search': function(test){
		test.expect(1);
		var enab = new ENAb(),
			query = { id : "Panthera pardus orientalis" };

		enab.taxonSearch(query, function(self){
			console.log(self.entry);
			test.ok(!!self.entry);
			test.done();
		});
	},
	
	'Taxon search with taxonomy portal options (display default xml, subtree false)': function(test){
		test.expect(1);
		var enab = new ENAb(),
			query = { id:'109974', result: 'sequence_coding'};
			
		enab.taxonSearch(query, function(self){
			console.log(self.entry);
			test.ok(!!self.entry);
			test.done();
		});
	},
	
	'Taxon search with taxonomy portal options, display fasta, subtree false)': function(test){
		test.expect(1);
		var enab = new ENAb(),
			query = { id:'109974', result: 'sequence_coding', display: 'fasta'};
			
		enab.taxonSearch(query, function(self){
			console.log(self.entry);
			test.ok(!!self.entry);
			test.done();
		});
	},
	  
};

