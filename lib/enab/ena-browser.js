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
	
	// if called with and [id1, id2, ..] make it a comma separated ids string
	if (typeof(id) == 'object') ids = ids.join()

	// default to display fasta if not specified
	if (!display) var display = 'fasta';
	
	var that = this,
		base_url = 'http://www.ebi.ac.uk/ena/data/view/',
		params = ids + '&display=' + display,
		url = base_url + params;
		
	rest(url).then( function(response) { 
			that.entry = response.entity;
			that.emit('stored');
		}
	);
	
};

ENAbrowser.prototype.taxonSearch = function() {
	
};

ENAbrowser.prototype.freeTextSearch = function() {
	
};





module.exports = ENAbrowser;