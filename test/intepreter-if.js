var evalScheem = require('../lib/scheem-intepreter');

exports["evaluated to #t"] = function(assert) {

	var scheem = ["if", ['>', 10, 5], 30, 40];
	assert.deepEqual(evalScheem(scheem), 30);
	assert.done();
};

exports["evaluated to #f"] = function(assert) {

	var scheem = ["if", ['=', 10, 5], 30, 40];
	assert.deepEqual(evalScheem(scheem), 40);
	assert.done();
};

exports["no false block"] = function(assert) {

	var scheem = ["if", ['=', 10, 5], 30];
	assert.deepEqual(evalScheem(scheem), null);
	assert.done();
};