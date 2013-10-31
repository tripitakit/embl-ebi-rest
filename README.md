# embl-ebi-rest

A client for EMBL-EBI REST Web Services.

Early-alpha, starting with Dbfetch.


## Getting Started
Install the module with: `npm install embl-ebi-rest`

```javascript

var dbFetch = require('embl-ebi-rest').dbFetch;

var sample_query = { db:"uniprotkb", id:"WAP_RAT", format:"fasta", style:"raw" }

var wap_rat = new dbFetch(sample_query);

wap_rat.on('stored', function() { console.log(wap_rat.entity) } );

wap_rat.get(); 

```

#### WSDbfetch
http://www.ebi.ac.uk/Tools/webservices/services/dbfetch_rest

#### Databases
http://www.ebi.ac.uk/Tools/dbfetch/dbfetch/dbfetch.databases#edam

## Contributing
Any help, contribution, collaboration is highly appreciated! I've so much to learn ...

Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


## License
Copyright (c) 2013 tripitakit  
Licensed under the MIT license.



