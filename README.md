# embl-ebi-rest

Client for EMBL-EBI REST Web Services.

(Prototype) early alpha api for:

* Dbfetch : get an entry or a set of entries by the entry identifier from a database specifying the required data format and result style.
* (more to be added here)

## Installation
```
$ npm install embl-ebi-rest
```

## Examples
```javascript
/**
 * Dependencies
 */
var Dbfetch = require('embl-ebi-rest').Dbfetch;

/**
 * Create a Dbfetch instance with a query parameters object
 */
var wap_rat = new Dbfetch({ db: 'uniprotkb',
							id:'WAP_RAT',
							format: 'fasta',
							style: 'raw' });

/** 
  Dbfetch works as an asynchronous event emitter: the 'stored' event 
  is emitted when the entry is fetched and assigned to the instance's .entry property.
  Add a listener for 'store' to your Dbfetch instance, with a function to handle the entry.
 */
wap_rat.on('stored', function(){
	console.log(wap_rat.entry);
});

/*
 * Execute the query
 */
wap_rat.get(); 


/* 
 * Fetch multiple ids/accessions in raw/fasta format,
 * access the entries with method parseRawFasta().
 * It parses raw/fasta only entry into object { id, accession, description, seq },
 * an array of entry-objects is returned for multiple fasta records.
 */
var multiple_ids = new Dbfetch({ db: 'embl',
								 id: 'M10051, K00650, D87894, AJ242600',
								 format: 'fasta',
								 style: 'raw' });
									 
multiple_ids.on('stored', function() {
	var entries = this.parseRawFasta();
	console.log(entries);
});

multiple_ids.get();

```

## Documentation

#### WSDbfetch
http://www.ebi.ac.uk/Tools/webservices/services/dbfetch_rest

#### Databases
http://www.ebi.ac.uk/Tools/dbfetch/dbfetch/dbfetch.databases

## Contributing
Any help, contribution, collaboration is highly appreciated! There's so much to learn.

Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


## License
Copyright (c) 2013 tripitakit  
Licensed under the MIT license.



