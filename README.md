# embl-ebi-rest

Client for EMBL-EBI REST Web Services.

(Prototype) early alpha stage.

* Dbfetch : get an entry or a set of entries by the entry identifier from a database specifying the required data format and result style.
* DbfetchInfo : introspection of Dbfetch database meta-informations.

* ENAbrowser : The European Nucleotide Archive (ENA) captures and presents information relating to experimental workflows that are based around nucleotide sequencing. A typical workflow includes the isolation and preparation of material for sequencing, a run of a sequencing machine in which sequencing data are produced and a subsequent bioinformatic analysis pipeline. ENA records this information in a data model that covers input information (sample, experimental setup, machine configuration), output machine data (sequence traces, reads and quality scores) and interpreted information (assembly, mapping, functional annotation).

(more to be added here!)

## Installation
```
$ npm install embl-ebi-rest
```

## Examples
### Dbfetch
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



/**
 * DbfetchInfo
 * introspection of databases meta-informations
 */

var info = require('embl-ebi-rest').DbfetchInfo;
 
/*
 * Get a list of database names
 */
var db_list = info.db()
  
/*
 * Get the db-meta-info object for a named database
 */
var embl = info.db('embl');
   
/*
 * Get the infoFormatList meta-infos for a given db-meta-info object
 */
var embl_formats = info.formats(embl)

/*
 * Get the format-meta-info-obj for a given db-meta-info-obj and a format-name
 */
var embl_fasta = info.format(embl, 'fasta');

/*
 * Get the style-meta-info-obj for a given format-meta-info-obj
 */
 var embl_fasta_styles = info.styles(embl_fasta);

```
#### Documentation

##### WSDbfetch
http://www.ebi.ac.uk/Tools/webservices/services/dbfetch_rest

##### Databases
http://www.ebi.ac.uk/Tools/dbfetch/dbfetch/dbfetch.databases



### ENAbrowser
```javascript
var ENAbrowser = require('embl-ebi-rest').ENAbrowser;

/**
* Single id search, (display default='fasta')
*/
var enab1 = new ENAbrowser();

enab1.on('stored', function(){
	console.log(this.entry);
});

enab1.idSearch('A00145');


/**
 * Query for multiple ids as string, (display default='fasta')
 */
var enab2 = new ENAbrowser();

enab2.on('stored', function(){
	console.log(this.entry);
});

enab2.idSearch('A00145,A00146');


/**
 * Query for multiple ids as an array, explicit display 'xml'
 */
var enab3 = new ENAbrowser();

enab3.on('stored', function(){
	console.log(this.entry);
});

enab3.idSearch(['A00145','A00146'], 'xml');

```
#### Documentation
http://www.ebi.ac.uk/ena/about/search_and_browse


## Contributing
Any help, contribution, collaboration is highly appreciated! There's so much to learn.

Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


## License
Copyright (c) 2013 tripitakit  
Licensed under the MIT license.



