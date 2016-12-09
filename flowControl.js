setTimeout(function() {
  console.log('I executed first.');
  setTimeout(function() {
    console.log('I executed second.');
    setTimeout(function() {
      console.log('I executed third.');
    }, 100);
  }, 500);
}, 1000);
