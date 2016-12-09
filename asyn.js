function asyncFunction(callback) {
  setTimeout(callback, 200);
}

var color = 'blue';

asyncFunction(function() {
  console.log('The color is ' + color);
});
color = 'green';

// Preserver a global variable's value using closure
function asyncFunctionByClosure(callback) {
  setTimeout(callback, 200);
}
var gender = 'male';

(function(gender) {
  asyncFunctionByClosure(function() {
    console.log('The gender is ' + gender);
  });
})(gender);

gender = 'female';
