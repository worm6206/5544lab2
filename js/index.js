
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
	try{

		var fill = d3.scale.category20();

		var width = window.innerWidth, height = window.innerHeight - 100;

		var svg = d3.select("body").append("svg")
		    .attr("width", width)
		    .attr("height", height);

		var textSpace = svg
			.selectAll("text")
			.data(source)
			.enter()
			.append("text");

		var text = textSpace
			.attr("x", function(d) { return 100 + ((width-300) * Math.random()); })
			.attr("y", function(d) { return 100 + ((height-200) * Math.random()) ; })
			.text( function (d) { return d['0']; })
			.attr("font-family", "sans-serif")
			.attr("font-size", function(d){return d['1'];})
			.attr("fill", function(d, i) { return fill(i); });
	}
	catch(err) {
		console.log(err);
	}
}

if(source === undefined){
	$('.text-center').text("Please select a year to begin.");

}else run();