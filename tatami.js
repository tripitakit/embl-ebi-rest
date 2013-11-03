var ENAbrowser = require('./').ENAbrowser;

// callback to inspect fetched entries 
var print = function(){
	console.log(this.entry);
};

/**
 * Taxon search 
 */ 
var turkey = new ENAbrowser();
turkey.on('stored', print);

turkey.taxonSearch('Meleagris gallopavo mexicana');


/**
 * Taxonomy portal search
 */
var meleagris_cds = new ENAbrowser();
meleagris_cds.on('stored', print);

meleagris_cds.taxonSearch('109974', 'sequence_coding', false);


