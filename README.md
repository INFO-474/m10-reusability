# Module 10: D3 Reusability

## Overview
In this module, we'll introduce a pattern for building reusable components with D3. We'll move away from writing code for a particular dataset, towards writing generalizable software that can be repurposed across projects (and people!). Building reusable components will allow you to reuse your code, integrate your visualizations more easily into larger development projects, and create useful software for the open-source community.

More than anything else, this module is a supplement to Mike Bostock's excellent article [Towards Reusable Charts](https://bost.ocks.org/mike/chart/). The purpose is to more slowly introduce the related foundational JavaScript concepts, and provide a detailed description and example of the implementation.
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Contents**

- [Resources](#resources)
- [Functions are Objects](#functions-are-objects)
- [Getter / Setter Methods](#getter--setter-methods)
- [Method Chaining](#method-chaining)
- [Closure](#closure)
- [Reusable Charts](#reusable-charts)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Resources
Here are a few resources to help you better understand reusability patterns:

- [Towards Reusable Charts](https://bost.ocks.org/mike/chart/) _(Bostock)_
- [JavaScript Closures](http://jibbering.com/faq/notes/closures/)
- [JavaScript Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) _(MDN)_
- [Method Chaining](https://en.wikipedia.org/wiki/Method_chaining) _(wiki)_
- [Data versus Datum](http://stackoverflow.com/questions/13728402/what-is-the-difference-d3-datum-vs-data) _(stackoverflow)_
- [JavaScript This](http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/) _(blog post)_

## Functions are Objects
First things first: **functions are objects**. As described by [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function),

>The **Function constructor** creates a new Function object. In JavaScript every function is actually a Function object.

While there are many implications of this design choice, the primary lesson (for this module) is that you can define properties _**of your function-object**_. For example, if you have a `chart` function, you can assign attributes directly to it:

```javascript
// Declare a `chart` function
var chart = function() {
  // You'll do things in here later...
};

// Assign a height property to that function-object
chart.height = 600;

// Confirm you've declared the height
chart.height; // returns 600
```

While this foundational concept may seem straightforward, it is what will allow us to craft chart functions that allow method-chaining.

## Getter / Setter Methods
Let's continue by examining a pattern commonly used by D3 and jQuery for getting and setting attributes. In both libraries, the `.attr` method us used to both **get** and **set** object attributes. For example:

```javascript
// Select an svg from the DOM
var svg = d3.select('#my-svg');

// Set the height property
svg.attr('height', 600);

// Retrieve the height property
svg.attr('height'); // returns 600
```

Examining this function, it's clear that the `.attr` function takes two parameters (an **attribute** and a **value**) and sets the **attribute** to the specified **value**. However, if the value _is not_ specified, the method returns the current value of the attribute. **Before reading on**, take a moment to consider how you would write a method that has this behavior.

Got it? If not, here's an example:

```javascript
// Create a person object
var person = {
    name:"Maria",
    age:22
};

// Write a method that allows you to get or set the `age` attribute
person.ageMethod = function(value) {
  if(!arguments.length) return this.age; // if no value is set, get the age
  this.age = value; // set the age
};

// Get current age
person.ageMethod(); // returns 22

// Set person age
person.ageMethod(25); // Changes the age property

// Get updated age
person.ageMethod(); // Returns 25
```

Recall that the `this` variable refers to the context of function execution. In the section above, `this` will refer to the object itself. As put in [this](http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/) article (no pun intended):

>First, know that all functions in JavaScript have properties, just as objects have properties. And when a function executes, it gets the this property—a variable with the value of the object that invokes the function where this is used.

## Method Chaining
The above example is a decent start, but imagine we wanted a way to configure multiple properties of the `person` object (`age`, `shoeSize`). With the current method, this would require separate lines of code:

```javascript
// Define a method for updating shoeSize
person.shoeSizeMethod = function(value) {
  if(!arguments.length) return this.shoeSize;
  this.shoeSize = value;
};

// Set person age (method defined in code section above)
person.ageMethod(25); // Changes the age property

// Set the shoeSize
person.shoeSizeMethod(7.5); // Changes the shoeSize property
```

As you begin to assign multiple attributes, this becomes quite cumbersome. However, if each getter/setter method **returns the object itself** when the value is set, we're able to chain multiple (setter) methods together:

```javascript
// Define a method for updating shoeSize
person.shoeSizeMethod = function(value) {
  if(!arguments.length) return this.shoeSize;
  this.shoeSize = value;
  return this; // return the object to allow method chaining
};

// Define a method for updating age
person.ageMethod = function(value) {
  if(!arguments.length) return this.age;
  this.age = value;
  return this; // return the object to allow method chaining
};

// Set the age and the shoeSize
person.ageMethod(22) // set the age, return the object
      .shoeSizeMethod(8.5); // set the shoeSize, return the object
```

This is a good start, but there are a few unpleasant features to our approach. Most prominently, this pattern requires storing multiple **properties** on our **object** that refer to the same concept (i.e., `age` and `ageMethod`). This is confusing for implementation purposes, and doesn't capture the full strength of getter/setter approach (i.e., who cares if the method can _get_ the current value if it's exposed as another property?). To address this challenge, we'll leverage the **closure** pattern to encapsulate variables.

For some quick practice with getter/setter methods and method chaining, see [exercise-1](exercise-1).

## Closure
One of the challenges most people encounter when starting to use JavaScript is determining the **scope** of variables. Invariably, you unintentionally define an element in the wrong scope and can't access it when you want to:

```javascript
var someFunction = function(){
  // Define a variable in your function
  var internalVariable = 'only defined in here';

  // Do more things
  return true;
};

// Execute the function
someFunction();

// Try to reference the variable
internalVariable; // Uncaught ReferenceError: internalVariable is not defined
```

While this can pose an initial challenge, the outer function actually provides a distinct environment that binds together the variables. As described in [this post](http://jibbering.com/faq/notes/closures/):

> A "closure" is an expression (typically a function) that can have free variables together with an environment that binds those variables (that "closes" the expression).


Rather than thinking of this scoping challenge as a headache one wants to avoid, the **closure pattern can actually be used for good!** In combination with getter/setter methods, closures help keep variables in the proper scope, while providing a method for accessing and changing them. Let's reconsider the example above as a function:

```javascript
// Function that returns a new person object
var newPerson = function() {
    // Default values
    var name = 'No Name';
    var age = 100;

    // Define an empty person object to return
    var person = {};

    // Add an `age` property to the person object that will get/set the `age` variable
    person.age = function(value) {
      if(!arguments.length) return age; // returns current value
      age = value; // changes the value of age, only part of this function
      return person; // allows method chaining
    };

    // Add name `name` property to the person object that will get/set the `name` variable
    person.name = function(value) {
      if(!arguments.length) return name; // returns current value
      name = value; // changes the value of age, only part of this function
      return person; // allows method chaining
    };

    return person; // return the person object when the function is executed
};

// Create a new person object and set the age/name values
var person1 = newPerson() // returns our person object
                .age(22) // sets the age variable within the proper context
                .name('Maria'); // sets the name variable within the proper context

person1.age(); // returns 22, the age we set for this persno

// Create another person
var person2 = newPerson() // returns our person object
                .age(29) // sets the age variable within the proper context
                .name('Jim') // sets the name variable within the proper context

person2.name(); // returns 'Jim', doesn't change `name` for person1!
```

This pattern is **supremely powerful**, as it allows the local variables `name` and `age` to be encapsulated in their constructor function and exposed through the getter/setter methods. Moreover, changing the values of `name` or `age` for one person-object **does not affect the other object**. In this way, we're able to create multiple encapsulated instances of objects with the same properties/methods.

## Reusable Charts
Applying these methods to reusable D3 components involves a few more thoughtful configurations. First, rather than a constructor function that returns an object, we should write **a function that returns a function** that can be called. Luckily, because functions are objects, this is really no different than writing a function that returns an object. Here is the skeleton code suggested in Mike Bostock's [article](https://bost.ocks.org/mike/chart/):

```javascript
function chart() {
  var width = 720, // default width
      height = 80; // default height

  function my() {
    // generate chart here, using `width` and `height`
  }

  my.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    return my;
  };

  my.height = function(value) {
    if (!arguments.length) return height;
    height = value;
    return my;
  };

  return my;
};
```

Inside the proposed `my()` function is where you actually build the chart as you typically would (calculate scales, bind data, append axes, etc.). To understand how this would be implemented, let's take a look at the `d3.scale` and `d3.svg.axis` functions, which follow the same reusability pattern suggested in this module:

```javascript
// Append a `g` element to an svg on your DOM in which to render your axis
var axisG = d3.select('#my-svg').append('g');

// Construct a scale function that exposes getter/setter methods for domain/range
var scale = d3.scale.linear() // closure function that returns a function...
                    .domain([0, 1000]) // Set domain
                    .range([0, 100]); // Set range

// Construct a new axis function using the d3.svg.axis method that returns a function
var axis = d3.svg.axis(); // Function that returns a function using closure pattern

// Set the scale and orientation of the axis function
axis.orient('bottom')
    .scale(scale);

// Render the axis in the selected axisG
axisG.call(axis);
```

This is a pretty tricky use of D3's `.call` method. Let's think through this a bit:

`d3.svg.axis` is a **function that returns an internal function**. The function returned by `d3.svg.axis` is stored in our variable `axis`, which has getter/setter attributes (i.e., `orient` and `scale`) that allow us to set variables within the closure. The `axis` function actually _builds_ our axis, but where?

The `.call` method executes the specified function (`axis`, the function returned by `d3.svg.axis`) **in the context of the selected element** (`axisG`). This means that the `axis` function (again, returned by the `d3.svg.axis` function) needs to operate upon a **selection**. Mike Bostock suggests the following alteration to the internal `my()` function to perform the execution of the function _**on the selection that calls it**_ (edited slightly from the article):

```javascript
var chart = function() {
  // Set defaults up here

  // Internal function that gets returned
  function my(selection) {
    // For each selected element, perform the function
    selection.each(function(data, i) {
      // generate chart here; `data` is the data and `this` is the element
    });
  }
  return my;
}
```
The use of `selection.each` inside of the `my` function allows the construction of your chart within _each_ selected element (this would allow you to easily create **small-multiples**, but for a single chart, there will only be one selection). You'll be able to access the data bound to your selection using the `data` parameter, as shown above.

Wait, what data bound to the selection?

Imagine an implementation in which you're binding data to your selected element in which you want to render your chart (i.e., a wrapper `div`). This requires you to use the `datum` selection to _**bind a single piece of datum**_ to your selected chart-wrapper. Then, internal to your `my` function, your able to access the data array. Here is a skeleton of you you would execute your `chart` function:

```javascript
// An array of objects for your chart function
var dataSet = [{...}, {...}, {...}];

// Construct a new instance of the chart function
var myChart = chart() // Function that returns a funciton via closure
                .width(500) // set parameters
                .height(500); // set parameters

// Bind your dataset (datum) to a div element and call the chart function
var chartWrapper = d3.select('#my-div')
                .datum([dataSet]) // a one element array containing your data array
                .call(myChart); // call the chart function!
```
When you bind your data object to your selected `div` element, you use the `.datum` method because you want to associate the entire dataset with the selected `div`. Then, inside your internal `my` function, the `selection` is your `div` element, and the `data` parameter is your `dataSet` array.

## Updating Charts
All this effort wouldn't be worth the effort if updating the charts wasn't relatively simple. As you might imagine, you way want to update the _data_ being displayed, or a visual _property_ of the chart, such as it's `width` or `height`. If you've written a thoughtful **data-join** inside your `chart` function, updating the chart should only require updating the data or a visual property, and then calling the instantiation of your `chart` function (i.e., `myChart`)from the wrapper (`chartWrapper`).

```javascript
// Construct a new instance of the chart function
var myChart = chart() // Function that returns a funciton via closure
                .width(500) // set parameters
                .height(500); // set parameters

// Bind your dataset (datum) to a div element and call the chart function
var chartWrapper = d3.select('#my-div')
                .datum([dataSet]) // a one element array containing your data array
                .call(myChart); // call the chart function!
...

// A new array of objects for your chart function
var newDataSetdataSet = [{...}, {...}, {...}];

// Simply re-bind the data and call your `myChart` function
chartWrapper.datum([newDataSet]).call(myChart);

// If you want to change the width, change it on the `myChart` function-object
myChart.width(1000);

// The recall the function
chartWrapper.call(myChart);
```

For some initial practice working with reusable charts, see [exercise-2](exercise-2).

Here's a [complete working example of a reusable chart](http://bl.ocks.org/curran/66d926fe73211fd650ec).

## Next Steps
Whew -- that's a lot. The first step will be to develop a firm understanding of how **getter/setter methods**, **method chaining**, **closures**,  and **D3 selections** work in tandem to create a pattern of reusability. Using this pattern, you can move away from writing one-off scripts for scatter-plots, and move towards reusable charts (as promised). This skeleton code provides a _starting point_ for reusability, but does not lend guidance for many design principles for developing your reusable code. This setup lends itself to many questions:

- Which methods should be exposed?
- How do you choose chart defaults?
- Where do you handle interactivity?
- What is the best pattern for handling different data-types?

Using lessons from software architecture and user-centered design, it's up to you to develop reusable charts that you, and others, can leverage to quickly develop charts.
