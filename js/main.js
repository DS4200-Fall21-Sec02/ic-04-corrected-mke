
// write your javascript code here.
// feel free to change the pre-set attributes as you see fit

let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35
  },
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

//SVG that will hold the visualization 
let svg1 = d3.select('#d3-container')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '60%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', 'white') 
  .style('border', 'solid')
  .attr('viewBox', [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))



d3.csv("data/data.csv").then( function(data) {

const groups = data.map(d => d.X)

var xScale = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.5])

const yScale = d3.scaleLinear()
    .domain([0, 50])
    .range([ height, 0 ]);

var g = svg1.append("g")
               .attr("transform",`translate(${margin.left},${margin.top})`);

       
xScale.domain(data.map(function(d) { return d.X; }));
yScale.domain([0, d3.max(data, function(d) { return d.Y; })]);

g.append("g")
         .attr("transform", `translate(0, ${height})`)
         .call(d3.axisBottom(xScale).tickSize(0));

g.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return d;
         }).ticks(10))
         .append("text")
         .attr("y", 6)
         .attr("dy", "0.71em")
         .attr("text-anchor", "end")
         .text("value");

g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.X); })
         .attr("y", function(d) { return yScale(d.Y); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height - yScale(d.Y); });


});