

$(document).ready(function(){
    $(document).ajaxStart(function(){
        $("#load").show();
    });
    $(document).ajaxComplete(function(){
        $("#load").hide();
    });
});

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

var width = window.innerWidth, height = window.innerHeight - 100;
function run(){
  var fill = d3.scale.category20();
  var temp = [], temp2 = [], i=0;
  source.forEach(function(d) {
    temp.push(d['0']);
    temp2.push(d['1']);
  });

  d3.layout.cloud().size([width, height])
      .words(temp.map(function(d) {
            return {text: d, size: temp2[i++]};
          }))
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();

  function draw(words) {
    d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate("+ width/2 +","+ height/2 +")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }
}

function change(){
	$('svg').remove();
	var slider = $( "#slider-range" ).slider( "option", "values" );
	console.log(slider[0]+","+slider[1]);
	source = [];
	var start = slider[0] , end = slider[1] , rawdata="";
	if(start === end) {
		rawdata = readTextFile("data/" + start +".csv");
	}else{
		while(start<=end){
			rawdata += readTextFile("./data/"+start+".csv");
			start++;
		}
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
	
        $("#load").hide();

}else {
	run();
}