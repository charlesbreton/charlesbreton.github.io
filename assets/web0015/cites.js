var w = 1660,
    h = 1400,
    fill = d3.scale.category20();

var labelDistance = 0;

var vis = d3.select("#chart")
  .append("svg:svg")
    .attr("width", w)
    .attr("height", h);

d3.json("cites.json", function(json) {
  var force = d3.layout.force()
      .charge(-1000)
      .linkDistance(10)
      .gravity(.5)
      .linkStrength(.8)
      .nodes(json.nodes)
      .links(json.links)
      .size([w, h])
      .start();

  var link = vis.selectAll("line.link")
      .data(json.links)
    .enter().append("svg:line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); })
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  var node = vis.selectAll("g.node")
      .data(json.nodes)
    .enter().append("svg:g")
      .attr("class", "node")

  	node.append("svg:circle")
      //.attr("r", 5)
      .attr("r", function(d) { return d.nodeSize;})
      .style("fill", function(d) { return fill(d.group); })
      .style("opacity", .7)
      .call(force.drag);

  node.append("svg:text")
    .attr("class", "nodetext")
    .attr("dx", 8)
	.attr("dy", ".35em")
  .style("font-size", "11px")
	.text(function(d) { return d.name; });

  // node.append("svg:title")
  //   .text(function(d) { return d.name; });

  vis.style("opacity", 1e-6)
    .transition()
      .duration(1000)
      .style("opacity", 1);

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
    
    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
});

