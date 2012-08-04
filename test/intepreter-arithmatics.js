var evalScheem = require('../lib/scheem-intepreter');

exports["+"] = function(assert) {

	var scheem  = ['+', 1, 2];
	assert.deepEqual(evalScheem(scheem), 3);
	scheem  = ['+', 1, ['+', 1, 5]];
	assert.deepEqual(evalScheem(scheem), 7);
	assert.done();
};

exports["-"] = function(assert) {

	var scheem  = ['-', 2, 1];
	assert.deepEqual(evalScheem(scheem), 1);
	assert.done();
};

exports["*"] = function(assert) {

	var scheem  = ['*', 2, 7];
	assert.deepEqual(evalScheem(scheem), 14);
	assert.done();
};

exports["/"] = function(assert) {

	var scheem  = ['/', 8, 2];
	assert.deepEqual(evalScheem(scheem), 4);
	assert.done();
};

exports["mix"] = function(assert) {

	var scheem  = ['+', ['/', ["*", 4, 2], 2], 4];
	assert.deepEqual(evalScheem(scheem), 8);
	assert.done();
};