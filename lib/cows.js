var path = require("path");
var replacer = require("./replacer");

var cowdefs = require("./cow-definitions").cowdefs;

var textCache = {};

exports.get = function (cow) {
	var text = cowdefs[cow];

	if (!text) {
		text = cowdefs['default'];
	}

	return function (options) {
		return replacer(text, options);
	};
}

exports.list = function (callback) {

	var cows = [];

	for (var cow in cowdefs) {
	  cows.push(cow)
	}

	callback(null, cows);
}
