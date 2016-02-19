
function readTextFile(file) {
	try{
	    var rawFile = new XMLHttpRequest(), allText;
	    rawFile.open("GET", file, false);
	    rawFile.onreadystatechange = function() {
	        if (rawFile.readyState === 4) {
	            if (rawFile.status === 200 || rawFile.status === 0) {
	                allText = rawFile.responseText;
	                // alert(allText);
	            }
	        }
	    }
	    rawFile.send(null);
	    return allText;
	}
	catch(err) {
		console.log(err);
	}
}

function csvJSON(csv){
	try{
	  var lines=csv.split("\n");
	  var result = [];
	  var headers=lines[0].split(",");
	  for(var i=0;i<lines.length;i++){
		  var obj = {};
		  var currentline=lines[i].split(",");
		  for(var j=0;j<headers.length;j++){
			  obj[j] = currentline[j];
		  }
		  result.push(obj);
	  }
	  result.reverse();
	  return result;
	}
	catch(err) {
		console.log(err);
	}
}

var path = window.location.href;
	var num = path.indexOf("?");
	num++;
	var path2 = [];
	for (var j = 0; j < path.length - num; j++) {
	    path2[j] = path[j + num];
	}
	path = null;
	path = path2.join("");

var source = csvJSON(readTextFile("data/" + path +".csv"));

function run(){

		var fill = d3.scale.category20();

		var width = window.innerWidth, height = window.innerHeight - 100;

		var svg = d3.select("body").append("svg")
		    .attr("width", width)
		    .attr("height", height);

// ************* Printing Text ***************

		var textSpace = svg
			.selectAll("text")
			.data(source)
			.enter()
			.append("text");
//(-1^Math.round(Math.random())
		var text = textSpace
			.attr("x", function(d) { return (width/2) + ((Math.random()*(width/2))*(Math.random()*2-1)); })
			.attr("y", function(d) { return (height/2) + ((Math.random()*(height/2))*(Math.random()*2-1)); })
			.text( function (d) { return d['0']; })
			.attr("font-family", "Arial Black")
			.attr("font-size", function(d){return d['1'];})
			.attr("fill", function(d, i) { return fill(i); });

// ************* Printing Text END ***************
	
		//TODO: Select <text> one by one, put it closest to center but no overlap.
		//		> Or force graph
		//		mouse events: hover(show songs involved), 
		//					  select(show texts with same song envolved)
		//		year range selector
		//		scatter plot


}

if(source === undefined){
	$('.text-center').text("Please select a year to begin.");

}else run();