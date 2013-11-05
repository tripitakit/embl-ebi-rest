/* 
 * WSDbfetch
 * http://www.ebi.ac.uk/Tools/dbfetch/dbfetch/{db}/{id}/{format}?style={style}
 */

var	rest = require('rest'),
	info = require('./dbfetch-info.js');
	

function Dbfetch() {
		this.entry = '';
		this.query = {};
	};

Dbfetch.prototype.get = function(query, success) {

	if (isValid(query.db)) {
		var that = this,
			
			base_url = 'http://www.ebi.ac.uk/Tools/dbfetch/dbfetch/',
			args = query.db + "/"+ query.id + "/" + query.format + "?style=" + query.style,
			url = base_url + args;
			
		rest(url).then(function(response) { 
				that.query = query;
				that.entry = response.entity;
				success(that);
			}
		);
	} else {
		throw("Invalid DB error");
	};
};


Dbfetch.prototype.fasta2json = function() {
	if (this.query.format == 'fasta' && this.query.style=='raw' && this.query != '') {

		var entries = this.entry.split('>'),
			parsed_entries = [];
			
		entries.shift(); // remove first empty
		
		for (var i=0; i<entries.length; i++) {
			
			var record = entries[i].split('\n'),
				meta_info = record.shift().split("|");
				
			parsed_entries.push ( {
				id : meta_info[0].replace(">", ""),
				accession : meta_info[1],
				description : meta_info[2],
				seq : record.join('')
			});	
		}
		this.jsonEntry = (entries.length > 1) ? parsed_entries : parsed_entries[0]
		return (entries.length > 1) ? parsed_entries : parsed_entries[0]
	} else {
		throw("Wrong entry's format/style");
	}
};

function isValid(db_name) {
	return (info.db().indexOf(db_name) != -1)
}

module.exports = Dbfetch;