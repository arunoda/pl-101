module.exports = function (expr) {
	
	//stores the total amount
	var total = 0;
	//flag to specify par mode
	var parmode = 0;

	//flag to specify repeat mode
	var repeatmode = 0;
	var repeatnotes = [];

	//contains the notes lang
	var arr = [];
	
	//recursive function
	function rec(node) {
		
		if(node.tag == 'note') {
			
			handleNote(node);
		} else if(node.tag == 'seq') {
			
			handleSeq(node);			
		} else if(node.tag == 'rest') {

			total+= node.dur;
		} else if(node.tag == "repeat") {

			handleRepeat(node);
		} else {

			handlePar(node);
		}
	}

	function handleRepeat(node) {

		repeatmode++;
		rec(node.section);
		for(i=0; i<node.count; i++) {

			repeatnotes.forEach(function(n) {
				arr.push(convertToNote(n, total));
				total += n.dur;
			});
		}
		repeatnotes = [];
		repeatmode--;
	}

	function handleNote (node) {

		if(parmode) {

			arr.push(convertToNote(node, total));
			return node.dur;
		} else if(repeatmode) {

			repeatnotes.push(node);
		} else {

			arr.push(convertToNote(node, total));
			total += node.dur;
			return 0;
		}
	}

	function handleSeq (node) {
		
		var time = 0;
		if(node.left) {
			time+= rec(node.left);
		}
		
		if(node.right) {
			time+= rec(node.right);
		}
		
		if(parmode) {
			return time;
		}
	}

	function handlePar(node) {

		parmode++;
			
		var max = 0;
		var t = 0;
		
		if(node.left) {
			t = rec(node.left);
			if(t>max) max = t;
		}
		
		if(node.right) {
			t = rec(node.right);
			if(t>max) max = t;
		}
		
		parmode--;
		
		if(parmode) {
			return max;
		} else {
			total += max;
		}
	}
	
	rec(expr);
	
	return arr;
};

function convertToNote(node, startTime) {
	return {tag: 'note', pitch: node.pitch, start: startTime, dur: node.dur};
}