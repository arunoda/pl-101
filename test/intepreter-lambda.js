var evalScheem = require('../lib/scheem-intepreter');

exports["executing functions in the env"] = function(assert) {

	var env = { bindings: { add: function(x, y) { return x+y; } } };
	var scheem = ['begin', 
		['add', 100, 200]
	];
	assert.equals(evalScheem(scheem, env), 300);
	assert.done();
};

exports["creating functions"] = function(assert) {

	var env = { bindings: {} };
	var scheem = ['begin', 
		['define', 'add', ['lambda', ['x', 'y'], ['+', 'x', 'y']]]
	];

	evalScheem(scheem, env);
	assert.equals(env.bindings.add(100, 200), 300);
	assert.equals(evalScheem._lookup(env, 'add')(100, 200), 300);

	assert.done();
};

exports["creating functions and executing"] = function(assert) {

	var env = { bindings: {} };
	var scheem = ['begin', 
		['define', 'add', ['lambda', ['x', 'y'], ['+', 'x', 'y']]],
		['add', 100, 200]
	];
	
	assert.equals(evalScheem(scheem, env), 300);

	assert.done();
};

exports["error-check: lambda invalid no of arguments"] = function(assert) {

	var env = { bindings: {} };
	var scheem = ['begin', 
		['define', 'add', ['lambda', ['x', 'y']]]
	];

	assert.throws(function() {
		evalScheem(scheem, env);
	});
	assert.done();
};

exports["error-check: lambda invalid arguments list"] = function(assert) {

	var env = { bindings: {} };
	var scheem = ['begin', 
		['define', 'add', ['lambda', 10, ['+', 10, 'x']]]
	];

	assert.throws(function() {
		evalScheem(scheem, env);
	});
	assert.done();
};

