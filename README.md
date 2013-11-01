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
  Dfetch is an asynchronous events.EventEmitter: the 'stored' event 
  is emitted when an entry is fetched and assigned to the instance's .entry property.
  Add a listener for it with a callback function to access and handle the entry data.
 */
wap_rat.on('stored', function() { console.log(wap_rat.entry) });

/*
 * Execute the query
 */
wap_rat.get(); 


/* 
 * Multiple id/accession query
 */
var multiple_ids = new Dbfetch({ db: 'embl',
									 id: 'M10051, K00650, D87894, AJ242600',
									 format: 'fasta',
									 style: 'raw' });
									 
multiple_ids.on('stored', function() { console.log(multiple_ids.entry) });
multiple_ids.get();

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



