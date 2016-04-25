// Create a function ParagraphChart that will be your reusable function
var ParagraphChart = function() {
  // Create variables within the function scope to track your color and fontSize
  var color, fontSize;

  // Write your chart function that will be returned by the ParagraphChart function.
  // It should take in a parameter that represents your selection
  var chart = function(selection) {
    // Loop through selections using the .each method
    selection.each(function(data) {

      // Select `this` as the element in which you want to render your chart
      var div = d3.select(this);

      // Select all of the p elements inside of your div and bind your data
      var strings = div.selectAll('p').data(data);

      // Enter new p elements
      strings.enter()
             .append("p")
             .text(function(d){return d.text});

      // Exit elements
      strings.exit().remove();

      // Update elements
      strings.transition()
             .duration(1000)
             .style('color', color)
             .style('font-size', fontSize + 'px');

    })
  };

  // Write a method to update the color
  chart.color = function(value) {
    if(!arguments.length) return color; // return the current color if not provided
    color = value; // set the color
    return this; // return the object to allow method chaining
  };

  // Write a method to update the font-size
  chart.fontSize = function(value) {
    if(!arguments.length) return fontSize; // return the current color if not provided
    fontSize = value; // set the color
    return this; // return the object to allow method chaining
  };

  // Return the chart object
  return chart;
}
