'use strict';

var ENAb = require('../../lib/embl-ebi-rest.js').ENAbrowser;

exports['test ENAbrowser'] = {

	setUp: function(done) {
		this.enab = new ENAb();
		done();
	},
  
	'Double check a test property and method of ENAbrowser instance': function(test){
		test.expect(2);
		test.ok(this.enab.is_instance);
		test.equal(this.enab.instance_of(), "ENAbrowser")
		test.done();
	},
	
	'Single id search (display default=fasta)': function(test){
		test.expect(1);
		var enab = new ENAb();
		enab.on('stored', function(){
			test.equal(this.entry.slice(0,4), ">ENA");
			test.done();
		});
		enab.idSearch('A00145');
	},
	
	'Query for multiple ids as string (display default=fasta)': function(test){
		test.expect(1);
		var enab = new ENAb();
		enab.on('stored', function(){
			test.equal(this.entry.split('>').length - 1 , 2); // this split create a '' at index 0
			test.done();
		});
		enab.idSearch('A00145,A00146');
	},
	
	'Query for multiple ids as array  (display default=fasta)': function(test){
		test.expect(1);
		var enab = new ENAb();
		enab.on('stored', function(){
			test.equal(this.entry.split('>').length - 1 , 2);
			test.done();
		});
		enab.idSearch(['A00145','A00146']);
	},
	
	'Taxon search': function(test){
		test.expect(1);
		var enab = new ENAb();
		enab.on('stored', function(){
			console.log(this.entry);
			test.ok(!!this.entry);
			test.done();
		});
		enab.taxonSearch('Meleagris gallopavo silvestris');
	},
	
	'Taxon search with taxonomy portal options': function(test){
		test.expect(1);
		var enab = new ENAb();
		enab.on('stored', function(){
			console.log(this.entry);
			test.ok(!!this.entry);
			test.done();
		});
		enab.taxonSearch('109974', 'sequence_coding', false);
	}
	
	



  
};
