var evalScheem = require('../lib/scheem-intepreter');

// Lookup
exports["lookup first level"] = function(assert) {

	var env = { bindings: {x: 20} };
	assert.equals(evalScheem._lookup(env, 'x'), 20);
	assert.done();
};

exports["lookup second level"] = function(assert) {

	var env = { bindings: {x: 20} };
	var env2 = { bindings: {y: 20}, outer: env};
	assert.equals(evalScheem._lookup(env2, 'x'), 20);
	assert.done();
};

exports["lookup third level"] = function(assert) {

	var env = { bindings: {x: 201} };
	var env2 = { bindings: {y: 20}, outer: env};
	var env3 = { bindings: {y: 20}, outer: env2};
	assert.equals(evalScheem._lookup(env3, 'x'), 201);
	assert.done();
};

exports["lookup third level, but first"] = function(assert) {

	var env = { bindings: {x: 201} };
	var env2 = { bindings: {y: 20}, outer: env};
	var env3 = { bindings: {x: 40}, outer: env2};
	assert.equals(evalScheem._lookup(env3, 'x'), 40);
	assert.done();
};

//SET
exports["set first level"] = function(assert) {

	var env = { bindings: {x: 20} };
	evalScheem._set(env, 'x', 30)
	assert.equals(env.bindings['x'], 30);
	assert.done();
};

exports["set second level"] = function(assert) {

	var env = { bindings: {x: 20} };
	var env2 = { bindings: {y: 20}, outer: env};
	evalScheem._set(env2, 'x', 70);
	assert.equals(env.bindings['x'], 70);
	assert.done();
};

exports["set third level"] = function(assert) {

	var env = { bindings: {x: 201} };
	var env2 = { bindings: {y: 20}, outer: env};
	var env3 = { bindings: {y: 20}, outer: env2};
	
	evalScheem._set(env3, 'x', 70);
	assert.equals(env.bindings['x'], 70);
	assert.done();
};

exports["set third level, but first"] = function(assert) {

	var env = { bindings: {x: 201} };
	var env2 = { bindings: {y: 20}, outer: env};
	var env3 = { bindings: {x: 40}, outer: env2};
	
	evalScheem._set(env3, 'x', 70);
	assert.equals(env3.bindings['x'], 70);
	assert.equals(env.bindings['x'], 201);

	assert.done();
};

exports["define"] = function(assert) {

	var env = { bindings: {x: 201} };
	
	evalScheem._define(env, 'y', 70);
	assert.equals(env.bindings['y'], 70);

	assert.done();
};