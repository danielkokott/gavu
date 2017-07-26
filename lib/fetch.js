'use strict';

const fs = require('fs');
const glacier = require('./aws-glacier');

// TODO: I need to upload something before I can get the inventory

// TODO:
 // Check if there is already an inventory retrieval jobs in queue.
 // If so, return/stop

glacier.initiateInventoryRetrievalJob((err, result) => {
  if (err) {
    if (err.code === 'ResourceNotFoundException') {
      console.error(err.message);
    } else {
      console.error(err);
    }
  } else {
    console.log('result', result);
    fs.writeFileSync('./.gavu/jobs/'.concat(result.jobId), JSON.stringify(result));
  }
});

return;
