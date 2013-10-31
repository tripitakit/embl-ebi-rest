'use strict';

var dbFetch = require('../lib/embl-ebi-rest.js').dbFetch;

exports['test'] = {
  setUp: function(done) {
  	var sample = {db:"uniprotkb", id:"WAP_RAT", format:"fasta", style:"raw"}
  	this.dbf = new dbFetch(sample);
    done();
  },
    
  'dbFetch.get': function(test) {
    test.expect(1);

	this.dbf.on('stored', function(){
			test.equal(this.entity.slice(0,18), ">sp|P01174|WAP_RAT");
  		    test.done();
		}
	);
	this.dbf.get();
  },
  
};
