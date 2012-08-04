var scheem = require("../lib/scheem.js");
var fs = require('fs');
var path  = require('path');

//Iterate over examples folder and run them as tests
var folder = path.resolve(__dirname, "../examples");

var fileList = fs.readdirSync(folder);
fileList.forEach(function(file) {
	var source = fs.readFileSync(path.resolve(folder, file), "utf8");
	createTest(file, source);
});

function createTest(title, source) {

	exports[title] = function(test) {

		var env = { bindings: {} };
		var rtn = scheem(source, env);
		test.deepEqual(rtn, env.bindings.expect);
		test.done();
	}
}



