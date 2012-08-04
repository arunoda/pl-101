var evalScheem = require('../lib/scheem-intepreter');

exports["define"] = function(assert) {

	var env = { bindings: {} };
	var scheem  = ['define', 'x', ['+', 10, 20]];
	assert.equals(evalScheem(scheem, env), 30);
	assert.equals(env.bindings['x'], 30);
	assert.done();
};

exports["set!"] = function(assert) {

	var env = { bindings: {x: 10} };
	var scheem  = ['set!', 'x', ['+', 10, 40]];
	assert.deepEqual(evalScheem(scheem, env), 50);
	assert.deepEqual(env.bindings['x'], 50);
	assert.done();
};

exports["using variables"] = function(assert) {

	var env = { bindings: { x: 100} };
	var scheem  = ['+', 'x', 40];
	assert.deepEqual(evalScheem(scheem, env), 140);
	assert.done();
};

exports["begin"] = function(assert) {

	var scheem = ["begin", 
		["define", "x", 100],
		["define", "y", ["+", "x", 200]],
		["+", "y", 200]
	];
	assert.deepEqual(evalScheem(scheem), 500);
	assert.done();
};

exports["quote"] = function(assert) {

	var env = { bindings: {x: 10} };
	var scheem = ["set!", "x", ["quote", ["1", "2"]]];
	assert.deepEqual(evalScheem(scheem, env), ["1", "2"]);
	assert.done();
};