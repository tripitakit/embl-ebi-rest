/* 
 * WSDbfetch
 * http://www.ebi.ac.uk/Tools/dbfetch/dbfetch/{db}/{id}/{format}?style={style}
 */

var util = require('util');
var rest = require('rest');
var events = require('events');
var dbValidNames = require('./dbFetchDBs.js').names;

var dbFetch = function(params) {
	
	events.EventEmitter.call(this);
	this.params = params;
	this.id = params.id;

};

util.inherits(dbFetch, events.EventEmitter);

dbFetch.prototype.get = function() {

	if (Object.keys(dbValidNames).indexOf(this.params.db) != -1) {
		
		var that = this,
			id = this.id,
			db = this.params.db,
			format = this.params.format,
			style = this.params.style,
			url = 'http://www.ebi.ac.uk/Tools/dbfetch/dbfetch/';
			
		url = url + db + "/"+ id + "/" + format + "?style=" + style;
		rest(url).then( function(response) { 
				that.entity = response.entity;
				that.emit('stored');
			}
		);
	} else {
		throw("Invalid DB error");
	};
};

module.exports = dbFetch;