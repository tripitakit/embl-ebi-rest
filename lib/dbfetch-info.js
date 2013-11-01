'use strict';

var meta_info = require('./dbfetch-metadata.js').meta_info;

exports.db = function(name) {
	if (!name) {
		return Object.keys(meta_info);
	} else if (!!meta_info[name]) {
		return meta_info[name]
	} else {
		throw("Unknown database error");
	}
};

exports.formats = function(db_metainfo_obj) {
	if (!!meta_info[db_metainfo_obj.name]) {
		return db_metainfo_obj.formatInfoList
	} else {
		throw("Not a meta-info object error");
	}
};

exports.format = function(db_metainfo_obj, name) {
	var format,
		format_infos = db_metainfo_obj.formatInfoList;
				
	for (var i=0; i<format_infos.length; i++) {
		if (format_infos[i].name == name) {
			format=format_infos[i];
		}
	};
	
	if (format) {
		return format;
	} else {
		throw("Unknown format error");
	}
};


exports.styles = function(format_obj) {
	return format_obj.styleInfoList
};