/*
 * embl-ebi-rest
 * https://github.com/patrick/embl-ebi-rest
 *
 * Copyright (c) 2013 Patrick De Marta
 * Licensed under the MIT license.
 */

'use strict';

var EmblEbiRest = {
	Dbfetch: require('./dbfetch/dbfetch.js'),
	DbfetchInfo: require('./dbfetch/dbfetch-info.js'),
	ENAbrowser: require('./enab/ena-browser.js')
};

module.exports = EmblEbiRest;
