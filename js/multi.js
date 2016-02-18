  $(function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 1951,
      max: 2015,
      change: function(event, ui){
        change();
      },
      values: [ 1990, 2010 ],
      slide: function( event, ui ) {
        $( "#amount" ).text( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).text(  $( "#slider-range" ).slider( "values", 0 ) +
      " - " + $( "#slider-range" ).slider( "values", 1 ) );
  });

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

var source;
// var source = csvJSON(readTextFile("data/" + path +".csv"));

function run(){
	try{

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

		var text = textSpace
			.attr("x", function(d) { return 100 + ((width-300) * Math.random()); })
			.attr("y", function(d) { return 100 + ((height-200) * Math.random()) ; })
			.text( function (d) { return d['0']; })
			.attr("font-family", "sans-serif")
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
	catch(err) {
		console.log(err);
	}

}

function change(){
	$('svg').remove();
	var slider = $( "#slider-range" ).slider( "option", "values" );
	// console.log(slider[0]+","+slider[1]);
	source = [];
	var start = slider[0] , end = slider[1] , rawdata="";
	while(start<=end){
		rawdata += readTextFile("./data/"+start+".csv");
		start++;
	}

	source = csvJSON(rawdata);
	run();
}

function f1950s(){
	var temp = [1951,1959];
	$( "#slider-range" ).slider( "values", temp);
	    $( "#amount" ).text(  $( "#slider-range" ).slider( "values", 0 ) +
	    	" - " + $( "#slider-range" ).slider( "values", 1 ) );
}

function f1960s(){
	var temp = [1960,1969];
	$( "#slider-range" ).slider( "values", temp);
	    $( "#amount" ).text(  $( "#slider-range" ).slider( "values", 0 ) +
	    	" - " + $( "#slider-range" ).slider( "values", 1 ) );
}

function f1970s(){
	var temp = [1970,1979];
	$( "#slider-range" ).slider( "values", temp);
	    $( "#amount" ).text(  $( "#slider-range" ).slider( "values", 0 ) +
	    	" - " + $( "#slider-range" ).slider( "values", 1 ) );
}

function f1980s(){
	var temp = [1980,1989];
	$( "#slider-range" ).slider( "values", temp);
	    $( "#amount" ).text(  $( "#slider-range" ).slider( "values", 0 ) +
	    	" - " + $( "#slider-range" ).slider( "values", 1 ) );
}

function f1990s(){
	var temp = [1990,1999];
	$( "#slider-range" ).slider( "values", temp);
	    $( "#amount" ).text(  $( "#slider-range" ).slider( "values", 0 ) +
	    	" - " + $( "#slider-range" ).slider( "values", 1 ) );
}

function f2000s(){
	var temp = [2000,2009];
	$( "#slider-range" ).slider( "values", temp);
	    $( "#amount" ).text(  $( "#slider-range" ).slider( "values", 0 ) +
	    	" - " + $( "#slider-range" ).slider( "values", 1 ) );
}

function f2010s(){
	var temp = [2010,2015];
	$( "#slider-range" ).slider( "values", temp);
	    $( "#amount" ).text(  $( "#slider-range" ).slider( "values", 0 ) +
	    	" - " + $( "#slider-range" ).slider( "values", 1 ) );
}

if(source === undefined){
	$('.text-center').text("Please select a year to begin.");

}else run();