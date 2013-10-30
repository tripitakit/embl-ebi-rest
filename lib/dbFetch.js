/* 
 * WSDbfetch
 * http://www.ebi.ac.uk/Tools/dbfetch/dbfetch/{db}/{id}/{format}?style={style}
 */

var http = require('http');

exports.get = function(args){

	if (!args) args = {
		db: "UniProtKB", 
		id: "WAP_RAT",
		format: "fasta",
		style: "raw"
	};
	
	var options = {
	  host: 'www.ebi.ac.uk',
	  path: '/Tools/dbfetch/dbfetch/' + args.db + "/" + args.id + "/" + args.format + "?style=" + args.style
	};
	
	request(options);
}

function request(options){
	var callback = function(response) {
	  var str = '';
 	  response.on('data', function (chunk) {
	    str += chunk;
	  });
	  response.on('end', function () {
	    console.log(str);
	  });
	}
	http.request(options, callback).end();
}