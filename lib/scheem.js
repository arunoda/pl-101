var peg = require('pegjs');
var fs = require('fs');
var intepreter = require('./scheem-intepreter');

function scheem(source, env) {

	var parse = getPegParser();
	var parsedList = parse(source);

	return intepreter(parsedList, env);
}

module.exports = scheem;

// PRIVATE FUNCTIONS

var parse;
function getPegParser() {

	if(!parse) {
		pegContent = fs.readFileSync(__dirname + '/scheem.peg', 'utf-8');
		parse = peg.buildParser(pegContent).parse;
	}

	return parse;
}