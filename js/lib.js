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
      // .rotate(function() { return ~~(Math.random() * 2) * 90; })
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
        .text(function(d) { return d.text; })
      .on("mouseover", function(d) {
              tooltip.transition()
                .duration(0)
                .style("opacity", .9);
              tooltip.html("Word: "+d.text+"<br>Count: "+d3.round(d.size))
                .style("left", (d3.event.pageX - 105) + "px")
                .style("top", (d3.event.pageY - 58) + "px");
            })
            .on("mouseout", function(d) {
              tooltip.transition()
                .duration(0)
                .style("opacity", 0);
            });

  // add the tooltip area to the webpage
  var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("background-color","#666666")
    .style("opacity", 0);
  }
}
if(source === undefined){
  $('.text-center').text("Please select a year to begin.");

}else run();
