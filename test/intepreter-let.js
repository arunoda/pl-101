var evalScheem = require('../lib/scheem-intepreter');

exports["simple let"] = function(assert) {

	var scheem = ['let', [['x', 20], ['y', 30]], ['+', 'x', 'y']];
	assert.equals(evalScheem(scheem), 50);
	assert.done();
};

exports["simple let with some expr"] = function(assert) {

	var scheem = ['let', [['x', 20], ['y', ['*', 10, 2]]], ['+', 'x', 'y']];
	assert.equals(evalScheem(scheem), 40);
	assert.done();
};

exports["nested let"] = function(assert) {

	var part1 = ['let', [['x', 20], ['y', 30]], ['+', 'x', 'y']];
	var part2 = ['let', [['i', 50], ['x', part1]], ['+', 'x', 'i']];
	assert.equals(evalScheem(part2), 100);
	assert.done();
};

exports["error-check: let invalid syntax"] = function(assert) {

	var scheem = ['let'];
	assert.throws(function() {
		evalScheem(scheem);
	});
	assert.done();
};

exports["error-check: let with invalid var list"] = function(assert) {

	var scheem = ['let', 30, ['+', 10, 29]];
	assert.throws(function() {
		evalScheem(scheem);
	});
	assert.done();
};

exports["error-check: improper pairs"] = function(assert) {

	var scheem = ['let', [['x', 10], []], ['+', 10, 29]];
	assert.throws(function() {
		evalScheem(scheem);
	});
	assert.done();
};

