# embl-ebi-rest

Client for EMBL-EBI REST Web Services.

[Unstable] [Alpha] 

* ENAbrowser: "The European Nucleotide Archive (ENA) captures and presents information relating to experimental workflows that are based around nucleotide sequencing. A typical workflow includes the isolation and preparation of material for sequencing, a run of a sequencing machine in which sequencing data are produced and a subsequent bioinformatic analysis pipeline. ENA records this information in a data model that covers input information (sample, experimental setup, machine configuration), output machine data (sequence traces, reads and quality scores) and interpreted information (assembly, mapping, functional annotation)". Get entry by organism name with taxonSearch(), or single/multiple ids with idSearch()

* Dbfetch: get() an entry or a set of entries by the entry identifier from a database specifying the required data format and result style. 

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

/****
 * Retrieval using organism names
 * [http://www.ebi.ac.uk/ena/about/browser#retrieval_organism_name]
 *
 * taxonSearch(<organism :string>)
 * Retieves entry in ENA Taxonomy XML format
 */ 
var enab = new ENAbrowser(),
	query = { id: "Panthera pardus orientalis" };
	
enab.taxonSearch(query, function(){
	console.log(enab.entry)
});


/**
 * Taxonomy Portal Options
 * [http://www.ebi.ac.uk/ena/about/browser#taxonomy_portal_options]
 *
 * taxonSearch( { <id: string>, <result: string>
 *	 			[, <display: string> --default='xml']
 *				[, <subtree: boolean> --default=false] } );
 * Retieves entry in fasta/xml format.
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
var enab = new ENAbrowser(),
	query = { id:'109974', result: 'sequence_coding', display: 'fasta'};

enab.taxonSearch(query, function(){
	console.log(enab.entry)
});



/****
* Retrieval using single identifiers
* [http://www.ebi.ac.uk/ena/about/browser#retrieval_single_identifier]
*
* idSearch (<id :string> [, <display :string> --default:'fasta'])
*/
var enab = new ENAbrowser(),
	query = { id: 'A00145' }

enab.idSearch(query, function(){
	console.log(enab.entry)
});


/**
 * Retrieval using multiple identifiers
 * [http://www.ebi.ac.uk/ena/about/browser#retrieval_multiple_identifiers]
 */
var enab = new ENAbrowser(),
query = { id: 'A00145,A00146' }

enab.idSearch(query, function(){
	console.log(enab.entry)
}); 
 

/**
 * Retrieval using an array of identifiers, display='xml'
 */
var enab = new ENAbrowser(),
query = { id: ['A00145','A00146'], display: 'xml' }

enab.idSearch(query, function(){
	console.log(enab.entry)
}); 
 
```
####  References
http://www.ebi.ac.uk/ena/about/search_and_browse

---

### Dbfetch
```javascript
/**
 * Dependencies
 */
var Dbfetch = require('embl-ebi-rest').Dbfetch;

/**
 * Create a Dbfetch instance and a query object,
 * call get() to asynchronously fetch entry in the instance's 'entry' property.
 * 
 */
var dbfetch = new Dbfetch(),
	query = { db:'uniprotkb', id:'WAP_RAT', format: 'fasta', style: 'raw' };

dbfetch.get(query, function(){
	console.log(dbfetch.entry);
});	


/**
 * The callback receives a 'self' argument referencing the Dbfetch instance object.
 * The following code produces the same results of the previous example. 
 * (It's used in nodeunit testing)
 */
dbfetch.get(query, function(self){
	console.log(self.entry);
});	



/**
 * Fetch multiple ids/accessions in raw/fasta format
 */
var dbfetch = new Dbfetch(),
	multiple_query = {
						db: 'embl',
						id: 'M10051, K00650',
						format: 'fasta',
						style: 'raw'
					 };
			
 dbfetch.get(multiple_query, function(){
 	console.log(dbfetch.entry);
 });	
 
/*
 * fasta2json();
 * Synchronous parse of raw-fasta entries into { id, accession, description, seq } objects.
 * An array of entry-objects is returned for multiple fasta records.
 * The method also stores the parsed object in the instance 'jsonEntry' property
 */
var dbfetch = new Dbfetch(),
multiple_query = { 	db: 'embl',
					id: 'M10051, K00650',
					format: 'fasta',
					style: 'raw'  };

dbfetch.get(multiple_query, function(){
	json = dbfetch.fasta2json();  
	console.log( json );
	console.log( json == dbfetch.jsonEntry ); // true;
});	
 



/********************************************************
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



