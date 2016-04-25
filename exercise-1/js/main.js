/* Create a treemap of country level measures. Inspiration drawn from https://bl.ocks.org/mbostock/4063582.
*/
var course;
$(function() {
	// Object that describes a course at a university
	course = {
		title:'Interactive Information Visualization',
		code:'INFO-474'
	};

	// Write a property of `course` that allows you to get/set its attributes
	// The method should allow method chaining.
	course.attr = function(attr, value) {
		if(!arguments.length) return this // return the object if no attr is provided
  	if(arguments.length < 2) return this[attr]; // return the value if its not provided
  	this[attr] = value; // Set the attribute to the value
  	return this; // return the object to allow method chaining
	};

	// Set 3 new attributes of the course (instructor, credits, department)
	course.attr('instructor', 'Freeman')
				.attr('credits', 5)
				.attr('department', 'The Information School');

	// Confirm that you've properly set the methods in the console
	console.log(course.attr('department'));

});
