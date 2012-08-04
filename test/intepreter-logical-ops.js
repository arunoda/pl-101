var evalScheem = require('../lib/scheem-intepreter');

exports["="] = function(assert) {
	var scheem = ["=", 10, 10];
	assert.deepEqual(evalScheem(scheem), "#t");
	assert.done();
};

exports["negate ="] = function(assert) {
	var scheem = ["=", 20, 10];
	assert.deepEqual(evalScheem(scheem), "#f");
	assert.done();
};

exports[">"] = function(assert) {
	var scheem = [">", 20, 10];
	assert.deepEqual(evalScheem(scheem), "#t");
	assert.done();
};

exports["negate >"] = function(assert) {
	var scheem = [">", 1, 10];
	assert.deepEqual(evalScheem(scheem), "#f");
	assert.done();
};

exports["<"] = function(assert) {
	var scheem = ["<", 10, 20];
	assert.deepEqual(evalScheem(scheem), "#t");
	assert.done();
};

exports["negate <"] = function(assert) {
	var scheem = ["<", 20, 10];
	assert.deepEqual(evalScheem(scheem), "#f");
	assert.done();
};

exports["! with #t"] = function(assert) {
	var scheem = ["!", "#t"];
	assert.deepEqual(evalScheem(scheem), "#f");
	assert.done();
};

exports["! with #f"] = function(assert) {
	var scheem = ["!", "#f"];
	assert.deepEqual(evalScheem(scheem), "#t");
	assert.done();
};

exports["! with mix"] = function(assert) {
	var scheem = ["!", ['=', 20, 30]];
	assert.deepEqual(evalScheem(scheem), "#t");
	assert.done();
};
