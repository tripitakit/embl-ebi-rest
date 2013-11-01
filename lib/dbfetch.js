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
				that.entry = response.entity;
				that.emit('stored');
			}
		);
	} else {
		throw("Invalid DB error");
	};
};


Dbfetch.prototype.parseRawFasta = function() {
	if (this.params.format == 'fasta' && this.params.style=='raw' && this.entry != '') {
		
		var entries = this.entry.split('>'),
			parsed_entries = [];
			
		entries.shift(); // remove first empty
		
		for (var i=0; i<entries.length; i++) {
			record = entries[i].split('\n'),
			meta_info = record.shift().split("|");
			parsed_entries.push ( {
				id : meta_info[0].replace(">", ""),
				accession : meta_info[1],
				description : meta_info[2],
				seq : record.join('')
			});	
		}
		return  (entries.length > 1) ? parsed_entries : parsed_entries[0]
	} else {
		throw("Wrong entry's format/style");
		return false
	}
}


function isValid(db_name) {
	return (Object.keys(dbValidNames).indexOf(db_name) != -1)
}

module.exports = Dbfetch;