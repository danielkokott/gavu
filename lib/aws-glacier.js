'use strict';

const fs = require('fs');
const AWS = require('aws-sdk');

const config = JSON.parse(fs.readFileSync('./.gavu/config', 'utf8'));

const options = {
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION
};

var glacier = new AWS.Glacier(options);

module.exports = {

  listVaults: function(callback){
    var params = {
      accountId: config.AWS_ACCOUNT_ID
    };
    glacier.listVaults(params, callback);
  },

  uploadArchive: function(params, callback){
    // == UPLOAD A SINGLE FILE
    // var filename = '/Volumes/WD15TB/Photos/2006/2006-10/DSCF3481.JPG';
    // var file = fs.readFileSync(filename);
    // var fileChecksum = treehash.getTreeHashFromBuffer(file);
    //
    Object.assign(
      params,
      {
        accountId: config.AWS_ACCOUNT_ID,
        vaultName: config.AWS_VAULT_NAME
      }
    );

    glacier.uploadArchive(params, callback);
  },

  initiateInventoryRetrievalJob: function(callback){
    var params = {
      accountId: config.AWS_ACCOUNT_ID,
      vaultName: config.AWS_VAULT_NAME,
      jobParameters: {
        // ArchiveId: 'STRING_VALUE',
        Description: 'Retrieving the inventory',
        Format: 'JSON',
        // InventoryRetrievalParameters: {
        //   EndDate: 'STRING_VALUE',
        //   Limit: 'STRING_VALUE',
        //   Marker: 'STRING_VALUE',
        //   StartDate: 'STRING_VALUE'
        // },
        // RetrievalByteRange: 'STRING_VALUE',
        // SNSTopic: 'STRING_VALUE',
        // Tier: 'STRING_VALUE',
        Type: 'inventory-retrieval'
      }
    };

    glacier.initiateJob(params, callback);
  },

  describeJob: function(params, callback){
    if (callback === undefined && typeof params === 'function'){
        callback = params;
        params = {};
    }

    Object.assign(
      params,
      {
        accountId: config.AWS_ACCOUNT_ID,
        vaultName: config.AWS_VAULT_NAME
      }
    );

    glacier.describeJob(params, callback);
  },


  listJobs: function(params, callback){
    if (callback === undefined && typeof params === 'function'){
        callback = params;
        params = {};
    }

    Object.assign(
      params,
      {
        accountId: config.AWS_ACCOUNT_ID,
        vaultName: config.AWS_VAULT_NAME
      }
    );

    glacier.listJobs(params, callback);
  },


  getJobOutput: function(params, callback){
    Object.assign(
      params,
      {
        accountId: config.AWS_ACCOUNT_ID,
        vaultName: config.AWS_VAULT_NAME
      }
    );

    glacier.getJobOutput(params, callback);
  }

  // glacier.abortMultipartUpload(params, function (err, data) {
  //   if (err) console.log(err, err.stack); // an error occurred
  //   else     console.log(data);           // successful response
  // });
};
