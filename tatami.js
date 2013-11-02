var ENAbrowser = require('./').ENAbrowser;

/**
* Single id search, (display default='fasta')
 */
var enab1 = new ENAbrowser();

enab1.on('stored', function(){
	console.log(this.entry);
});

enab1.idSearch('A00145');


/**
 * Query for multiple ids as string, (display default='fasta')
 */
var enab2 = new ENAbrowser();

enab2.on('stored', function(){
	console.log(this.entry);
});

enab2.idSearch('A00145,A00146');

/**
 * Query for multiple ids as an array, explicit display 'xml'
 */
var enab3 = new ENAbrowser();

enab3.on('stored', function(){
	console.log(this.entry);
});

enab3.idSearch(['A00145','A00146'], 'xml');