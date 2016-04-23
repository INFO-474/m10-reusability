/* Create a treemap of country level measures. Inspiration drawn from https://bl.ocks.org/mbostock/4063582.
*/
$(function() {
	// Read in your data. On success, run the rest of your code
	d3.csv('data/prepped_data.csv', function(error, data){
		// Setting defaults
		var margin = {top: 40, right: 10, bottom: 10, left: 10},
		    width = 960 - margin.left - margin.right,
		    height = 500 - margin.top - margin.bottom;

		// variable to visualize
		var measure = 'fertility_rate';
		var color = d3.scale.category10();

		// Wrapper div for the chart
		var div = d3.select('#vis')
								.append("div")
								.attr('height', 600)
								.attr('width', 600)
								.style("left", margin.left + "px")
								.style("top", margin.top + "px");

		// Function to arrange divs (will be called seperately for entering and updating)
		var position = function() {
			// Set the position of each div using the properties computed from the treemap function
			this.style("left", function(d,i) {return d.x + "px"; })
					.style("top", function(d) { return d.y + "px"; })
					.style('width', function(d){return d.dx + 'px'})
					.style("height", function(d) { return d.dy + "px"; })
					.style("background", function(d) {return !d.values ? color(d.region) : null; })
		}

		// Construct a nest function using `d3.nest`, and create a variable with your nested data

		// Construct a treemap function that sizes elements based on the current `measure`, and
		// Make sure to specify how to retrieve the `children` from each element


		// Write your `draw` function to bind data, and position elements


		// Call your draw function


		// Listen to change events on the input elements
		$("input").on('change', function() {

			
		});

	});
});
