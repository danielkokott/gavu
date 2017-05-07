'use strict';

const glacier = require('./aws-glacier');

glacier.listJobs(function(err, result){
  console.log('listJobs', err, result);
});
