'use strict';

const glacier = require('./aws-glacier');
glacier.listVaults(function(err, result){
  console.log('listVaults', err, result);
});
