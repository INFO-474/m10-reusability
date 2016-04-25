// Main JavaScript File

// After page load
$(function() {
  // Data to visualize (shoe sizes along the horizontal)
  var data = [
    {text:'Paragraph 1'},
    {text:'Paragraph 2'},
    {text:'Paragraph 3'},
    {text:'Paragraph 4'}
  ];

  // Instantiate your ParagraphChart, setting the color to blue
  var myChart = ParagraphChart().color('blue');

  // Select the container div, bind the data, and call the chart
  var chartWrapper = d3.select('#my-div')
      .datum(data)
      .call(myChart);

  // Assign event handler to form
  $('form').submit(function(event){

    // Get the color and font sizes from your form
    var color = $('#color').val();
    var fontSize = $('#font-size').val();

    // Reset the color and fontSize of your chart function
    myChart.color(color)
           .fontSize(fontSize);

    // Re-call your chart function
    chartWrapper.call(myChart);

    return false; // don't reload the page
  })
});
