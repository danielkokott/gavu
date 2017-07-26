'use strict';

const glacier = require('./aws-glacier');

glacier.listJobs(function(err, result){
  console.log('listJobs', err, result);
});


// glacier.describeJob({ jobId: 'r3zaiU54d_p0izvDbQh1PnnIuCXpu9tZr3Ka1BqUmsfgb99NyoAWQfK3WntFQQPgTfVjAzUNHSd4WMEC5b9oOv41crdq'}, function(err, result){
//   console.log('describeJob', err, result);
// });

// glacier.getJobOutput({ jobId: 'r3zaiU54d_p0izvDbQh1PnnIuCXpu9tZr3Ka1BqUmsfgb99NyoAWQfK3WntFQQPgTfVjAzUNHSd4WMEC5b9oOv41crdq'}, function(err, result){
//   if (result.contentType === 'application/json'){
//     fs.writeFileSync('./.gavu/inventory', result.body);
//     console.log('Inventory downloaded');
//   }
// });

return;
