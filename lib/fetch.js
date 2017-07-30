'use strict';

const fs = require('fs');
const path = require('path');
const jobs = require('./files/jobs');
const glacier = require('./aws-glacier');

// TODO: I need to upload something before I can get the inventory

// TODO:
 // Check if there is already an inventory retrieval jobs in queue.
 // If so, return/stop


module.exports.run = function() {

  let JobId = 'Z0LeizYbKVJdkqiFgpnN2iz5J2BmbWaLGnk-RMWcK-QHfklbTnpkPukLzr9CNKxiVarFt-OrZjqWoPnCVThMFXFkC0bo';
  getInventory(JobId);

  return;


  glacier.initiateInventoryRetrievalJob((err, result) => {
    if (err) {
      if (err.code === 'ResourceNotFoundException') {
        console.error(err.message);
      } else {
        console.error(err);
      }
    } else {
      console.log('result', result);
      jobs.push(result);
    }
  });

  return;
};


function getInventory(JobId){
  var params = {
    jobId: JobId,
    range: "",
    vaultName: "TestPhotos"
  };

  glacier.getJobOutput(params, function(err, data) {
    if (err) {
      console.error(err, err.stack); // an error occurred
    } else if (data.contentType === 'application/json') {
      var temp = JSON.parse(data.body.toString());
      saveInventoryToFile(temp);
      console.log('Inventory saved');
    } else {
      console.log(`Unknown contentType ${data.contentType}`);
    }
  });
}

function saveInventoryToFile(inventory){
  fs.writeFileSync(path.join(process.cwd(), '.gavu/inventory'), JSON.stringify(inventory));
}
