# embl-ebi-rest

A client for EMBL-EBI REST Web Services.
Features:
	* dbFetch : early-alpha api for WSDbfetch



## Getting Started
Install the module with: `npm install embl-ebi-rest`

```javascript
// require dbFetch constructor
var dbFetch = require('embl-ebi-rest').dbFetch;

// prepare a query for a single id (or accession)
var wap_rat = new dbFetch({ db: 'uniprotkb',
							id:'WAP_RAT',
							format: 'fasta',
							style: 'raw' });


// the request in handled asynchronously (by rest),
// dbFetch emits a 'stored' events when receive the response object,
// add a listener for 'stored' event to handle the fetched results saved in its entity property
wap_rat.on('stored', function() { console.log(wap_rat.entity) });

// execute the query
wap_rat.get(); 

// dbFetch also handles multiple id/accession queries:
var multiple_entries = new dbFetch({ db: 'embl',
									 id: 'M10051, K00650, D87894, AJ242600',
									 format: 'fasta',
									 style: 'raw' });
									 
multiple_entries.on('stored', function() { console.log(multiple_entries.entity) });
multiple_entries.get(); 
```

#### WSDbfetch
http://www.ebi.ac.uk/Tools/webservices/services/dbfetch_rest

#### Databases
http://www.ebi.ac.uk/Tools/dbfetch/dbfetch/dbfetch.databases

## Contributing
Any help, contribution, collaboration is highly appreciated! I've so much to learn ...

Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


## License
Copyright (c) 2013 tripitakit  
Licensed under the MIT license.



