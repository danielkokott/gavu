'use strict';

const glacier = require('./aws-glacier');

glacier.listVaults(function(err, result){
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});

return;
