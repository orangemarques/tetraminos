var tetromino = {
	O: {
		matrix: [
	         [0,0,0,0],
	         [0,1,1,0],
	         [0,1,1,0],
	         [0,0,0,0]
	    ],
	    color: "#2B00C3" // blue
	},
	I: {
		matrix: [
			[0,0,0,0,0,0,1,0],
			[1,1,1,1,0,0,1,0],
			[0,0,0,0,0,0,1,0],
			[0,0,0,0,0,0,1,0]
		],
	    color: "#C00017" // red
	},
	S: {
	    matrix: [
			[0,0,0,0,0,0,1,0],
			[0,0,1,1,0,0,1,1],
			[0,1,1,0,0,0,0,1],
			[0,0,0,0,0,0,0,0]
		],
	    color: "#2FCB00" // green
	},
	Z: {
		matrix: [
 			[0,0,0,0,0,0,0,1],
 			[0,1,1,0,0,0,1,1],
 			[0,0,1,1,0,0,1,0],
 			[0,0,0,0,0,0,0,0]
 		],
	    color: "#43DFC6" // cyan
	},
	L: {
		matrix: [
			[0,0,0,0,0,0,1,0,0,0,0,1,0,1,1,0],
			[0,1,1,1,0,0,1,0,0,1,1,1,0,0,1,0],
			[0,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		],
	    color: "#FFFFFF" // white
	},
	J: {
		matrix: [
 			[0,0,0,0,0,0,1,1,0,1,0,0,0,0,1,0],
 			[0,1,1,1,0,0,1,0,0,1,1,1,0,0,1,0],
 			[0,0,0,1,0,0,1,0,0,0,0,0,0,1,1,0],
 			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
 		],
	    color: "#C200CD" // magenta
	},
	T: {
		matrix: [
			[0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0],
			[0,1,1,1,0,0,1,1,0,1,1,1,0,1,1,0],
			[0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		],
	    color: "#C6CF10" // yellow
	},
	action: {
		obj: null,
		show: function() {
			for (var i=0; i<4; i++) {
				for (var j=offset*4; j<4+(offset*4); j++) {
	    			if (this.obj.matrix[i][j]==1) {
						var obj = ((x+j)-(offset*4))+"_"+(y+i);
	    				$(obj).style.backgroundColor = this.obj.color;
						//$(obj).style.border = "1px solid #000000";
	    			}
	    		}
	    	}
	    },
	    hide: function() {
	    	for (var i=0; i<4; i++) {
	    		for (var j=offset*4; j<4+(offset*4); j++) {
	    			if (this.obj.matrix[i][j]==1) {
						var obj = ((x+j)-(offset*4))+"_"+(y+i);
	    				$(obj).style.backgroundColor = "";
	    			}
	    		}
	    	}
	    },
		down: function() {
	    	if (!this.collision('D')) {
	    		this.hide();
				y++;
				this.show();

	    	} else {
	    		if (y == 1) {
	    			gameOver();
	    			return;
	    		}

	    		clearInterval(_action);

		    	for (var i=0; i<4; i++) {
		    		for (j=offset*4; j<4+(offset*4); j++) {
		    			if (this.obj.matrix[i][j]==1){
		    				board_matrix[(i+y)][(j+x)-(offset*4)]=1;
		    			}
		    		}
		    	}

		    	$("score_value").innerHTML = eval($("score_value").innerHTML)+10;
		    	checkLine();
		    	reset();
	    		start();
	    	}
	    },
	    rotation: function() {
	    	if (!this.collision('T')) {
		    	var _offset = this.obj.matrix[0].length/4;

		    	if (offset<_offset-1) {
		    		this.hide();
		    		offset++;
		    		this.show();

		    	} else {
		    		this.hide();
		    		offset=0;
		    		this.show();
		    	}
	    	}
	    },
	    drop: function() {
	    	clearInterval(_action);
	    	SPEED_LEVEL_01=1;
	    	_action = setInterval(down,SPEED_LEVEL_01);
	    },
		left: function() {
	    	if (!this.collision('L')) {
		    	this.hide();
				x--;
				this.show();
	    	}
	    },
		right: function() {
	    	if (!this.collision('R')) {
		    	this.hide();
				x++;
				this.show();
	    	}
	    },
	    collision: function(type) {
	    	switch (type) {
			case 'L':
		    	for (var i=0; i<4; i++) {
		    		for (var j=(0+(offset*4)); j<4+(offset*4); j++) {
		    			if (board_matrix[i+y][((j+x)-1)-(offset*4)]+this.obj.matrix[i][j]==2){
		    				return true;
		    			}
		    		}
		    	}
		    	return false;
				break;

			case 'R':
		    	for (var i=0; i<4; i++) {
		    		for (var j=(0+(offset*4)); j<4+(offset*4); j++) {
		    			if (board_matrix[i+y][((j+x)+1)-(offset*4)]+this.obj.matrix[i][j]==2){
		    				return true;
		    			}
		    		}
		    	}
		    	return false;
				break;

			case 'D':
		    	for (var i=0; i<4; i++) {
		    		for (var j=(0+(offset*4)); j<4+(offset*4); j++) {
		    			if (board_matrix[(i+y)+1][(j+x)-(offset*4)]+this.obj.matrix[i][j]==2){
		    				return true;
		    			}
		    		}
		    	}
		    	return false;
				break;

			case 'T':
		    	var _offset = this.obj.matrix[0].length/4;
		    	var old_offset = offset;

		    	if (offset<_offset-1) {
		    		offset++;
		    	} else {
		    		offset=0;
		    	}

		    	for (var i=0; i<4; i++) {
		    		for (var j=(0+(offset*4)); j<4+(offset*4); j++) {
		    			if (board_matrix[(i+y)][(j+x)-(offset*4)]+this.obj.matrix[i][j]==2){
		    				offset = old_offset;
		    				return true;
		    			}
		    		}
		    	}
		    	offset = old_offset;
		    	return false;
				break;

			default:
				break;
			}
	    }
	}
};