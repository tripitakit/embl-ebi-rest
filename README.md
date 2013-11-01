# embl-ebi-rest

Client for EMBL-EBI REST Web Services.

(Prototype) early alpha api for:

* Dbfetch : get an entry or a set of entries by the entry identifier from a database,
			specifying the required data format and result style.
* (more to be added here)

## Getting Started
Install the module with: `npm install embl-ebi-rest`

```javascript
/* 
 * Start requiring the Dbfetch constructor
 */
var Dbfetch = require('embl-ebi-rest').Dbfetch;

/*
 * Create a Dbfetch instance with a parameters object to query
 */
var wap_rat = new Dbfetch({ db: 'uniprotkb',
							id:'WAP_RAT',
							format: 'fasta',
							style: 'raw' });

/* 
  The request in handled asynchronously.
  When the requested entry is fully received
  Dbfetch instances emit a 'stored' event and  
  store the fetched entry in a <instance>.entity property
  Add a listener for 'stored' event to instance 
  with a function to access and handle the entry at <instance>.entity 
 */
wap_rat.on('stored', function() { console.log(wap_rat.entity) });

/*
 * Execute the query
 */
wap_rat.get(); 


/* 
 * Dbfetch also handles multiple id/accession queries
 */
var multiple_entries = new Dbfetch({ db: 'embl',
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



