var compilar = require('../lib/compilar');

exports['testing seq'] = function (test) {

	var mus = { 
		tag: 'seq',
		left: { tag: 'note', pitch: 'a3', dur: 250 },
		right: { 
			tag: 'seq',
			left: { tag: 'note', pitch: 'b3', dur: 250 },
			right: { tag: 'note', pitch: 'c4', dur: 500 } 
		}
 	};

 	var notes = [
		{ tag: 'note', pitch: 'a3', start: 0, dur: 250 },
		{ tag: 'note', pitch: 'b3', start: 250, dur: 250 },
		{ tag: 'note', pitch: 'c4', start: 500, dur: 500 }
	]; 

	test.deepEqual(notes, compilar(mus));
	test.done();	
};

exports['testing par'] = function (test) {

	var mus = { 
		tag: 'seq',
		left: { tag: 'note', pitch: 'a3', dur: 250 },
		right: { 
			tag: 'par',
  			left: { tag: 'note', pitch: 'c4', dur: 250 },
  			right: {
  				tag: 'par',
     			left: { tag: 'note', pitch: 'e4', dur: 250 },
     			right: { tag: 'note', pitch: 'g4', dur: 500 } 
     		} 
     	}
 	};

 	var notes = [
		{ tag: 'note', pitch: 'a3', start: 0, dur: 250 },
		{ tag: 'note', pitch: 'c4', start: 250, dur: 250 },
		{ tag: 'note', pitch: 'e4', start: 250, dur: 250 },
		{ tag: 'note', pitch: 'g4', start: 250, dur: 500 }
	]; 

	test.deepEqual(notes, compilar(mus));
	test.done();	
};

exports['testing rest'] = function (test) {

	var mus = { 
		tag: 'seq',
		left: { tag: 'note', pitch: 'a3', dur: 250 },
		right: { 
			tag: 'seq',
			left: { tag: 'rest', dur: 300 },
			right: { tag: 'note', pitch: 'c4', dur: 500 } 
		}
 	};

 	var notes = [
		{ tag: 'note', pitch: 'a3', start: 0, dur: 250 },
		{ tag: 'note', pitch: 'c4', start: 550, dur: 500 }
	]; 

	test.deepEqual(notes, compilar(mus));
	test.done();	
};

exports['testing repeat'] = function (test) {

	var mus = { 
		tag: 'seq',
		left: {
			tag: 'repeat',
			section: { tag: 'note', pitch: 'a3', dur: 250 },
			count: 3
		},
		right: { 
			tag: 'seq',
			left: { tag: 'rest', dur: 300 },
			right: { tag: 'note', pitch: 'c4', dur: 500 } 
		}
 	};

 	var notes = [
		{ tag: 'note', pitch: 'a3', start: 0, dur: 250 },
		{ tag: 'note', pitch: 'a3', start: 250, dur: 250 },
		{ tag: 'note', pitch: 'a3', start: 500, dur: 250 },
		{ tag: 'note', pitch: 'c4', start: 1050, dur: 500 }
	]; 

	test.deepEqual(notes, compilar(mus));
	test.done();	
};


