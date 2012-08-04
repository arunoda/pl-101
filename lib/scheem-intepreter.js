function evalScheem(expr, env) {

	if(!env) {
		env = {bindings: {}, outer: null};
	}

	// Numbers evaluate to themselves
	if (typeof expr === 'number') {
		return expr;
	} else if(expr == '#f' || expr == '#t') {
		return expr;
	}else if(typeof expr === 'string') {
		return lookup(env, expr);
	}

	// Look at head of list for operation
	switch (expr[0]) {

		//Arithmatics
		case '+':
			if(expr.length != 3) throw new Error("Need exactly two operands!");  
			return evalScheem(expr[1], env) + evalScheem(expr[2], env);
		case '-':
			if(expr.length != 3) throw new Error("Need exactly  two operands!");
			return evalScheem(expr[1], env) - evalScheem(expr[2], env);
		case '/':
			if(expr.length != 3) throw new Error("Need exactly  two operands!");
			return evalScheem(expr[1], env) / evalScheem(expr[2], env);
		case '*':
			if(expr.length != 3) throw new Error("Need exactly  two operands!");
			return evalScheem(expr[1], env) * evalScheem(expr[2], env);

		//Variables
		case 'define':
			if(expr.length != 3) throw new Error("Need variable and the value!");

			var value = evalScheem(expr[2], env);
			define(env, expr[1], value);
			return lookup(env, expr[1]);

		case 'set!':
			if(expr.length != 3) throw new Error("Need variable and the value!");

			var value = evalScheem(expr[2], env);
			set(env, expr[1], value);
			return lookup(env, expr[1]);

		//Begin
		case 'begin':
			if(expr.length < 2) throw new Error("Need atleast one operand!");
			var lastValue = null;
			for(var lc=1; lc<expr.length; lc++) {
				lastValue = evalScheem(expr[lc], env);
			}
			return lastValue;

		//Quote
		case 'quote':
			if(expr.length != 2) throw new Error("Need exactly one operand!");
			console.log(expr[1]);
			return expr[1];

		//Logical Operators ('#t' for true , '#f' for false)
		case '=':
			if(expr.length != 3) throw new Error("Need exactly  two operands!");
			return (evalScheem(expr[1], env) === evalScheem(expr[2], env))? "#t" : "#f";
		case '>':
			if(expr.length != 3) throw new Error("Need exactly  two operands!");
			return (evalScheem(expr[1], env) > evalScheem(expr[2], env))? "#t" : "#f";
		case '<':
			if(expr.length != 3) throw new Error("Need exactly  two operands!");
			return (evalScheem(expr[1], env) < evalScheem(expr[2], env))? "#t" : "#f";
		case '!':
			if(expr.length != 2) throw new Error("Need exactly one operands!");
			return (evalScheem(expr[1], env) == '#t')? "#f" : "#t";


		//List Operations (these operations are mutable)
		case 'cons':
			if(expr.length != 3) throw new Error("Need exactly  two operands!");
			var cons_1 = evalScheem(expr[1], env);
			var cons_2 = evalScheem(expr[2], env);
			cons_2.unshift(cons_1);
			return cons_2;

		case 'car':
			if(expr.length != 2) throw new Error("Need exactly one operands!");
			var car_1 = evalScheem(expr[1], env);
			return car_1[0];

		case 'cdr':
			if(expr.length != 2) throw new Error("Need exactly one operands!");
			var cdr_1 = evalScheem(expr[1], env);
			cdr_1.shift();
			return cdr_1;

		//String handling
		case "$":
			if(expr.length != 2) throw new Error("Need exactly one operands!");
			return expr[1];

		//Control Structures
		case 'if':
			if(expr.length < 3) throw new Error("Need atleast condition and the true clause!");
			var condition = evalScheem(expr[1], env);
			if(condition == '#t') {
				return evalScheem(expr[2], env);
			} else if(expr[3]) {
				//if there is an else section
				return evalScheem(expr[3], env);
			} else {
				return null;
			}

		//let ['let', [['x', 20], ['y', 40]], ['+', 'x', 'y']]
		case 'let':

			if(expr.length != 3) throw new Error("Need exactly 3 clauses");
			var newEnv = { bindings: {}, outer: env };
			
			if(!expr[1].forEach) throw new Error("Need the list of variables with values");
			expr[1].forEach(function(pair) {

				if(pair.length != 2) throw new Error("Need a pair with variable name and the value");
				newEnv.bindings[pair[0]] = evalScheem(pair[1], env);
			});

			return evalScheem(expr[2], newEnv);

		//lambda ['lambda', ['x', 'y'], ['+', 'x', 'y']]
		case 'lambda':

			if(expr.length != 3) throw new Error("Need exactly 3 clauses for lambda");
			if(!expr[1].forEach) throw new Error("lambda should be followed by a list of arguments names");
			var newEnv = { bindings:{}, outer: env };

			return function() {

				for(var index in expr[1]) {

					newEnv.bindings[expr[1][index]] = arguments[index];
				}
				return evalScheem(expr[2], newEnv);
			};

		default: 
			//handling functions
			var func = evalScheem(expr[0], env);
			if(typeof(func) == 'function') {

				var args = [];
				for(var lc = 1; lc<expr.length; lc++) {
					args.push(expr[lc]);
				}
				return func.apply({}, args);
			} else {
				//handling single element inside the list
				return evalScheem(expr[0]);
			}
	}
}

module.exports = evalScheem;

// PRIVATE METHODS
function lookup(env, varName) {

	var e = env;
	while(e && e.bindings) {

		var value = e.bindings[varName];
		if(value != undefined) {
			return value;
		}
		e = e.outer;
	}

	return null;

}
module.exports._lookup = lookup;


function set(env, varName, value) {

	var e = env;
	while(e && e.bindings) {

		if(e.bindings[varName] != undefined) {
			e.bindings[varName] = value;
			return; 
		}
		e = e.outer;
	}

}
module.exports._set = set;

function define (env, varName, value) {
	
	env.bindings[varName] = value;
}
module.exports._define = define;

