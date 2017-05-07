'use strict';

const fs = require('fs');
const glacier = require('./aws-glacier');


// glacier.initiateInventoryRetrievalJob(function(err, result){
//   console.log('initiateInventoryRetrievalJob', err, result);
//   fs.writeFileSync('./.gavu/jobs/'.concat(result.jobId), JSON.stringify(result));
// });

// glacier.describeJob({ jobId: 'r3zaiU54d_p0izvDbQh1PnnIuCXpu9tZr3Ka1BqUmsfgb99NyoAWQfK3WntFQQPgTfVjAzUNHSd4WMEC5b9oOv41crdq'}, function(err, result){
//   console.log('describeJob', err, result);
// });

glacier.getJobOutput({ jobId: 'r3zaiU54d_p0izvDbQh1PnnIuCXpu9tZr3Ka1BqUmsfgb99NyoAWQfK3WntFQQPgTfVjAzUNHSd4WMEC5b9oOv41crdq'}, function(err, result){
  if (result.contentType === 'application/json'){
    fs.writeFileSync('./.gavu/inventory', result.body);
    console.log('Inventory downloaded');
  }
});
