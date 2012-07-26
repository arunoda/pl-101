var peg = require('pegjs');
var fs = require('fs');
var path = require('path');

var compilar = require('../lib/mus-compilar');

exports['simple list'] = function (test) {

	var pegParse = getPegParser();
	test.deepEqual(pegParse("(one two 345)"), ["one", "two", '345']);
	test.done();	
};

exports['expression within expression'] = function (test) {

	var pegParse = getPegParser();
	test.deepEqual(pegParse("(one two (e5 two))"), ["one", "two", ['e5', 'two']]);
	test.done();	
};

exports['expression within 2 expression'] = function (test) {

	var pegParse = getPegParser();
	test.deepEqual(pegParse("(one (e6 3) (e 4))"), ["one", ['e6', '3'], ['e', '4']]);
	test.done();	
};

exports['expression with inner inner'] = function (test) {

	var pegParse = getPegParser();
	test.deepEqual(pegParse("(one (a (b c)))"), ["one", ["a", ["b", "c"]]]);
	test.done();	
};

exports['expression with whitespaces and newline + tabs '] = function (test) {

	var pegParse = getPegParser();
	test.deepEqual(pegParse("(one       (a (b\n\t c)))"), ["one", ["a", ["b", "c"]]]);
	test.done();	
};

exports['expression with (\'atom) '] = function (test) {

	var pegParse = getPegParser();
	test.deepEqual(pegParse("(one 'two)"), ["one", ["quote", ["two"]]]);
	test.done();	
};

exports['expression with (\'expression) '] = function (test) {

	var pegParse = getPegParser();
	test.deepEqual(pegParse("(one '(10 20))"), ["one", ["quote", ["10", "20"]]]);
	test.done();	
};

exports['expression with both (\'atom) and (\'expression) '] = function (test) {

	var pegParse = getPegParser();
	test.deepEqual(pegParse("(one '(10 20) \'30)"), ["one", ["quote", ["10", "20"]], ["quote", ["30"]]]);
	test.done();	
};

var parse = null;
function getPegParser() {

	if(!parse) {
		pegContent = fs.readFileSync(path.resolve(__dirname, "..") + '/lib/scheem.peg', 'utf-8');
		parse = peg.buildParser(pegContent).parse;
	}

	return parse;
}