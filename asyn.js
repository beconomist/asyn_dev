
// Function declaration of a asynschronous function
function asyncFunction(callback) {
  // callback will be called after 200ms
  // color is still 'blue'
  console.log('The color is ' + color);
  // So, the program just keeps going for the next line at 16
  // On 200ms, callback is executed.
  // Now, color became 'green'
  setTimeout(callback, 200);
}

// var color is declared with the string value of 'blue'
var color = 'blue';

// Invoking the asynschronous function
asyncFunction(function() {
  console.log('The color is ' + color);
});

// While waiting for 200ms, the color changed to 'green'
color = 'green';


// Preserver a global variable's value using closure
// function asyncFunctionByClosure(callback) {
//   setTimeout(callback, 200);
// }
// var gender = 'male';
//
// (function(gender) {
//   asyncFunctionByClosure(function() {
//     console.log('The gender is ' + gender);
//   });
// })(gender);
//
// gender = 'female';
