/* 
 * ENABrowser
 * 
 */

var util = require('util'),
	rest = require('rest'),
	events = require('events');
	
function ENAbrowser(){};

/**
 * Fetch entries by ID
 * @param {string|array} ids Single or multiple comma separated, or an array of id strings
 * @param {string} display 'html'|'xml'|'text'|'fasta'|'fastq' - default to 'fasta'
 */ 

ENAbrowser.prototype.idSearch = function(options, success) {

	var id = options.id,
		display = options.display;
		
	if (!!id) {

		// if called with and [id1, id2, ..] make it a comma separated ids string
		if (typeof(id) == 'object') id = id.join()

		// default to display fasta if not specified
		if (!display) var display = 'fasta';
		
		var base_url = 'http://www.ebi.ac.uk/ena/data/view/',
			params = id + '&display=' + display,
			url = base_url + params;
		
		get(this, url, success);

	} else {
		throw "Null Id Error"
	}
};

ENAbrowser.prototype.taxonSearch = function(options, success) {
	var id = options.id,
		result = options.result,
		display = options.display,
		subtree = options.subtree;
		
	if (!!id) {
		
		result = !!result ? '&portal=' + result : '';
		display = !!display ? "&display=" + display : '&display=xml';
		subtree =  !!subtree ? '&subtree=true' : '';
		
		var base_url = 'http://www.ebi.ac.uk/ena/data/view/Taxon:' + id,
			url = base_url + result + subtree + display;
		
		get(this, url, success);

	} else {
		throw "Null Id Error"
	}
};


function get(that, url, success){
	rest(url).then( function(response) { 
			that.entry = response.entity;
			success(that);
		}
	);
}




module.exports = ENAbrowser;