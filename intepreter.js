// A half-baked implementation of evalScheem
var env = {};
var evalScheem = function (expr) {

	// Numbers evaluate to themselves
	if (typeof expr === 'number') {
		return expr;
	} else if(expr == '#f' || expr == '#t') {
		return expr;
	}else if(typeof expr === 'string') {
		return env[expr] || null;
	}

	// Look at head of list for operation
	switch (expr[0]) {

		//Arithmatics
		case '+':
			if(expr.length != 3) throw new Error("Need exactly two operands!");  
			return evalScheem(expr[1]) + evalScheem(expr[2]);
		case '-':
			if(expr.length != 3) throw new Error("Need exactly  two operands!");
			return evalScheem(expr[1]) - evalScheem(expr[2]);
		case '/':
			if(expr.length != 3) throw new Error("Need exactly  two operands!");
			return evalScheem(expr[1]) / evalScheem(expr[2]);
		case '*':
			if(expr.length != 3) throw new Error("Need exactly  two operands!");
			return evalScheem(expr[1]) * evalScheem(expr[2]);

		//Variables
		case 'define':
		case 'set!':
			if(expr.length != 3) throw new Error("Need variable and the value!");
			env[expr[1]] = evalScheem(expr[2]);
			return env[expr[1]];

		//Begin
		case 'begin':
			if(expr.length < 2) throw new Error("Need atleast one operand!");
			var lastValue = null;
			for(var lc=1; lc<expr.length; lc++) {
				lastValue = evalScheem(expr[lc]);
			}
			return lastValue;

		//Quote
		case 'quote':
			if(expr.length != 2) throw new Error("Need exactly one operand!");
			return expr[1];

		//Logical Operators ('#t' for true , '#f' for false)
		case '=':
			if(expr.length != 3) throw new Error("Need exactly  two operands!");
			return (evalScheem(expr[1]) === evalScheem(expr[2]))? "#t" : "#f";
		case '>':
			if(expr.length != 3) throw new Error("Need exactly  two operands!");
			return (evalScheem(expr[1]) > evalScheem(expr[2]))? "#t" : "#f";
		case '<':
			if(expr.length != 3) throw new Error("Need exactly  two operands!");
			return (evalScheem(expr[1]) < evalScheem(expr[2]))? "#t" : "#f";
		case '!':
			if(expr.length != 2) throw new Error("Need exactly one operands!");
			return (evalScheem(expr[1]) == '#t')? "#f" : "#t";


		//List Operations (these operations are mutable)
		case 'cons':
			if(expr.length != 3) throw new Error("Need exactly  two operands!");
			var cons_1 = evalScheem(expr[1]);
			var cons_2 = evalScheem(expr[2]);
			cons_2.unshift(cons_1);
			return cons_2;

		case 'car':
			if(expr.length != 2) throw new Error("Need exactly one operands!");
			var car_1 = evalScheem(expr[1]);
			return car_1[0];

		case 'cdr':
			if(expr.length != 2) throw new Error("Need exactly one operands!");
			var cdr_1 = evalScheem(expr[1]);
			cdr_1.shift();
			return cdr_1;

		//String handling
		case "$":
			if(expr.length != 2) throw new Error("Need exactly one operands!");
			return expr[1];

		//Control Structures
		case 'if':
			if(expr.length < 3) throw new Error("Need atleast condition and the true clause!");
			var condition = evalScheem(expr[1]);
			if(condition == '#t') {
				return evalScheem(expr[2]);
			} else if(expr[3]) {
				//if there is an else section
				return evalScheem(expr[3]);
			} else {
				return null;
			}


	}
};

//added env to refer it later
evalScheem.env = env;

evalScheemString = function(scheemStr) {

	var ast = scheemParser.parse(scheemStr);
	return evalScheem(ast);
}

evalScheemString.env = env;
