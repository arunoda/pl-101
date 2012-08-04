var scheem = require("../lib/scheem.js");
var fs = require('fs');
var path  = require('path');

createTest("Hello Babu", "(+ 30 10)", 40);

// exports['simple execution'] = function(test) {

// 	var source = "(+ 30 10)";
// 	test.equals(scheem(source), 40);
// 	test.done();
// };

fs.readdir('examples', function(err, fileList) {

	
});

function createTest(title, source, expecation) {

	exports[title] = function(test) {

		test.equals(scheem(source), expecation);
		test.done();
	}
}



