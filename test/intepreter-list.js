var evalScheem = require('../lib/scheem-intepreter');

exports["cons"] = function(assert) {

	var scheem = ["cons", 10, ["quote", [20, 30]]];
	assert.deepEqual(evalScheem(scheem), [10, 20, 30]);
	assert.done();
};

exports["car"] = function(assert) {

	var scheem = ["car", ["quote", [20, 30]]];
	assert.deepEqual(evalScheem(scheem), 20);
	assert.done();
};

exports["cdr"] = function(assert) {

	var scheem = ["cdr", ["quote", [10, 20, 30]]];
	assert.deepEqual(evalScheem(scheem), [20, 30]);
	assert.done();
};