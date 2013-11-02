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

turkey.taxonSearch('turkey');


/**
 * Taxonomy portal search
 */
var meleagris_cds = new ENAbrowser();
meleagris_cds.on('stored', print);

meleagris_cds.taxonomyPortalSearch('9103', 'sequence_coding', false);



/**
* Single id search, (display default='fasta')
*/
var enab1 = new ENAbrowser();
enab1.on('stored', print);

enab1.idSearch('A00145');


/**
 * Query for multiple ids as string, (display default='fasta')
 */
var enab2 = new ENAbrowser();
enab2.on('stored', print);

enab2.idSearch('A00145,A00146');


/**
 * Query for multiple ids as an array, explicit display 'xml'
 */
var enab3 = new ENAbrowser();
enab3.on('stored', print);

enab3.idSearch(['A00145','A00146'], 'xml');


