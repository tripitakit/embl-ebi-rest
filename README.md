# embl-ebi-rest

Client for EMBL-EBI REST Web Services.

[Unstable] [Alpha] 

* ENAbrowser: "The European Nucleotide Archive (ENA) captures and presents information relating to experimental workflows that are based around nucleotide sequencing. A typical workflow includes the isolation and preparation of material for sequencing, a run of a sequencing machine in which sequencing data are produced and a subsequent bioinformatic analysis pipeline. ENA records this information in a data model that covers input information (sample, experimental setup, machine configuration), output machine data (sequence traces, reads and quality scores) and interpreted information (assembly, mapping, functional annotation)". Get entry by organism name with taxonSearch(), or single/multiple ids with idSearch()

* Dbfetch: get an entry or a set of entries by the entry identifier from a database specifying the required data format and result style. get() 

* DbfetchInfo: introspection of Dbfetch database meta-informations. db(), formats(), format(), styles()



(more to be added here!)

## Installation
```
$ npm install embl-ebi-rest
```

##Examples

### ENAbrowser
```javascript
var ENAbrowser = require('embl-ebi-rest').ENAbrowser;

// callback to inspect fetched entries 
var print = function(){
	console.log(this.entry);
};

/****
 * Retrieval using organism names
 * http://www.ebi.ac.uk/ena/about/browser#retrieval_organism_name
 
 * taxonSearch(<organism :string>)
 * Retieves entry in xml format.
 */ 
var mexicanTurkey = new ENAbrowser();

mexicanTurkey.on('stored', print);
mexicanTurkey.taxonSearch('Meleagris gallopavo mexicana');


/**
 * Taxonomy Portal Options
 * http://www.ebi.ac.uk/ena/about/browser#taxonomy_portal_options
 *
 * taxonSearch(<id :string>, <result :string> [, <subtree :boolean> --default=false]);
 * Retieves entry in xml format.
 *
 * valid options for results:
 * --------------------------
 * sequence_release	: Nucleotide Sequences (EMBL-Bank Release)
 * sequence_update	: Nucleotide Sequences (EMBL-Bank Update)
 * sequence_coding	: Protein-coding sequences in EMBL-Bank
 * sample			: Samples in ENA
 * study			: Studies
 * analysis			: Nucleotide sequence analyses in SRA
 * analysis_study	: Nucleotide sequence analyses in SRA (grouped by study)
 * read_run			: Raw reads in SRA
 * read_experiment	: Raw reads in SRA (grouped by experiment)
 * read_study		: Raw reads in SRA (grouped by study)
 * read_trace		: Capillary Traces in Trace Archive
 */
var mexicanTurkeyCDS = new ENAbrowser();

mexicanTurkeyCDS.on('stored', print);
mexicanTurkeyCDS.taxonSearch('109974', 'sequence_coding', false);



/****
* Retrieval using single identifiers
* http://www.ebi.ac.uk/ena/about/browser#retrieval_single_identifier
* idSearch (<id :string> [, <display :string> --default:'fasta'])
*/
var single = new ENAbrowser();
single.on('stored', print);

single.idSearch('A00145');


/**
 * Retrieval using multiple identifiers
 * http://www.ebi.ac.uk/ena/about/browser#retrieval_multiple_identifiers
 */
var multiple = new ENAbrowser();
multiple.on('stored', print);

multiple.idSearch('A00145,A00146');


/**
 * Retrieval using an array of identifiers, with explicit display='xml'
 */
var arrayMultiple = new ENAbrowser();
arrayMultiple.on('stored', print);

arrayMultiple.idSearch(['A00145','A00146'], 'xml');


```
####  References
http://www.ebi.ac.uk/ena/about/search_and_browse



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

/* 
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


/**
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



/****
 * DbfetchInfo
 * introspection of databases meta-informations
 */

var info = require('embl-ebi-rest').DbfetchInfo;
 
/**
 * Get a list of database names
 */
var db_list = info.db()
  
/**
 * Get the db-meta-info object for a named database
 */
var embl = info.db('embl');
   
/**
 * Get the infoFormatList meta-infos for a given db-meta-info object
 */
var embl_formats = info.formats(embl)

/*
 * Get the format-meta-info-obj for a given db-meta-info-obj and a format-name
 */
var embl_fasta = info.format(embl, 'fasta');

/**
 * Get the style-meta-info-obj for a given format-meta-info-obj
 */
 var embl_fasta_styles = info.styles(embl_fasta);

```
#### References

##### WSDbfetch
http://www.ebi.ac.uk/Tools/webservices/services/dbfetch_rest

##### Databases
http://www.ebi.ac.uk/Tools/dbfetch/dbfetch/dbfetch.databases




## Contributing
Any help, contribution, collaboration is highly appreciated! There's so much to learn.

Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


## License
Copyright (c) 2013 tripitakit  
Licensed under the MIT license.



