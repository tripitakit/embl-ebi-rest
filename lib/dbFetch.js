/* 
 * WSDbfetch
 * http://www.ebi.ac.uk/Tools/dbfetch/dbfetch/{db}/{id}/{format}?style={style}
 */

var util = require('util'),
	rest = require('rest'),
	events = require('events'),
	dbValidNames = require('./dbfetch-db.js').names;

function Dbfetch(params) {
		events.EventEmitter.call(this);
		this.params = params;
		this.id = params.id;
};

util.inherits(Dbfetch, events.EventEmitter);

Dbfetch.prototype.get = function() {

	if (isValid(this.params.db)) {
		var that = this,
			id = this.id,
			db = this.params.db,
			format = this.params.format,
			style = this.params.style,
			base_url = 'http://www.ebi.ac.uk/Tools/dbfetch/dbfetch/',
			args = db + "/"+ id + "/" + format + "?style=" + style,
			url = base_url + args;
			
		rest(url).then( function(response) { 
				that.entity = response.entity;
				that.emit('stored');
			}
		);
	} else {
		throw("Invalid DB error");
	};
};

function isValid(db_name) {
	return (Object.keys(dbValidNames).indexOf(db_name) != -1)
}

module.exports = Dbfetch;