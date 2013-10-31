/* 
 * WSDbfetch
 * http://www.ebi.ac.uk/Tools/dbfetch/dbfetch/{db}/{id}/{format}?style={style}
 */


var rest = require('rest');
var events = require('events');
var dbValidNames = require('./dbFetchDBs.js').names;

var dbFetch = function(params) {
	
	events.EventEmitter.call(this);
	this.params = params;
	this.id = params.id;

};

dbFetch.prototype.__proto__ = events.EventEmitter.prototype;

dbFetch.prototype.get = function() {

	if (Object.keys(dbValidNames).indexOf(this.params.db) != -1) {
		var id = this.params.id
		var db = this.params.db;
		var	format = this.params.format,
		style = this.params.style;
		var that = this;
		var url = 'http://www.ebi.ac.uk/Tools/dbfetch/dbfetch/';
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