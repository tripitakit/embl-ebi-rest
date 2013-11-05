/* 
 * ENABrowser
 * 
 */

var util = require('util'),
	rest = require('rest'),
	events = require('events');
	
function ENAbrowser(){
	events.EventEmitter.call(this);
	this.is_instance = true;
};

util.inherits(ENAbrowser, events.EventEmitter);

ENAbrowser.prototype.instance_of = function() {
	return "ENAbrowser";
};

/**
 * Fetch entries by ID
 * @param {string|array} ids Single or multiple comma separated, or an array of id strings
 * @param {string} display 'html'|'xml'|'text'|'fasta'|'fastq' - default to 'fasta'
 */ 

ENAbrowser.prototype.idSearch = function(ids, display) {
	if (!!ids) {

		// if called with and [id1, id2, ..] make it a comma separated ids string
		if (typeof(id) == 'object') ids = ids.join()

		// default to display fasta if not specified
		if (!display) var display = 'fasta';
		var that = this,
			base_url = 'http://www.ebi.ac.uk/ena/data/view/',
			params = ids + '&display=' + display,
			url = base_url + params;
			get(that, url);

	} else {
		throw "Null Id Error"
	}
};

ENAbrowser.prototype.taxonSearch = function(id, result, display, subtree) {
	if (!!id) {
		result = !!result ? '&portal=' + result : '';
		display = !!display ? "&display=" + display : '&display=fasta';
		subtree =  !!subtree ? '&subtree=true' : '';
		var that = this,
			base_url = 'http://www.ebi.ac.uk/ena/data/view/Taxon:' + id,
			url = base_url + result + subtree + display;
			get(this, url);

	} else {
		throw "Null Id Error"
	}
};


function get(that, url){
	rest(url).then( function(response) { 
			that.entry = response.entity;
			that.emit('stored');
		}
	);
}




module.exports = ENAbrowser;