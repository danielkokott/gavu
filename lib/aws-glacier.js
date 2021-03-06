'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const AWS = require('aws-sdk');

// AWS SDK for JavaScript documentation:
// http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/index.html

const config_file_name = '.gavu/config';

const global_config_location = path.join(os.homedir(), config_file_name);
let global_config;

const local_config_location = path.join(process.cwd(), config_file_name);
let local_config;

try {
  fs.accessSync(global_config_location);
  global_config = JSON.parse(fs.readFileSync(global_config_location, 'utf8'));
} catch (e) {
  global_config = {};
}

try {
  fs.accessSync(local_config_location);
  local_config = JSON.parse(fs.readFileSync(local_config_location, 'utf8'));
} catch (e) {
  local_config = {};
}

const config = Object.assign({}, global_config, local_config)

var glacier = new AWS.Glacier(config.options);

module.exports = {

  createVault: function(callback){
    var params = {
      accountId: config.accountId,
      vaultName: config.vaultName
    };
    glacier.createVault(params, callback);
  },

  listVaults: function(callback){
    var params = {
      accountId: config.accountId
    };
    glacier.listVaults(params, callback);
  },


  initiateJob: function(jobParameters, callback){
    var params = {
      accountId: config.accountId,
      vaultName: config.vaultName,
      jobParameters: jobParameters
    };

    glacier.initiateJob(params, callback);
  },


  initiateInventoryRetrievalJob: function(callback){
    var params = {
      accountId: config.accountId,
      vaultName: config.vaultName,
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


  listJobs: function(params, callback){
    if (callback === undefined && typeof params === 'function'){
        callback = params;
        params = {};
    }

    Object.assign(
      params,
      {
        accountId: config.accountId,
        vaultName: config.vaultName
      }
    );

    glacier.listJobs(params, callback);
  },


  describeJob: function(params, callback){
    if (callback === undefined && typeof params === 'function'){
        callback = params;
        params = {};
    }

    Object.assign(
      params,
      {
        accountId: config.accountId,
        vaultName: config.vaultName
      }
    );

    glacier.describeJob(params, callback);
  },


  getJobOutput: function(params, callback){
    Object.assign(
      params,
      {
        accountId: config.accountId,
        vaultName: config.vaultName
      }
    );

    glacier.getJobOutput(params, callback);
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
        accountId: config.accountId,
        vaultName: config.vaultName
      }
    );

    glacier.uploadArchive(params, callback);
  }


  // glacier.abortMultipartUpload(params, function (err, data) {
  //   if (err) console.log(err, err.stack); // an error occurred
  //   else     console.log(data);           // successful response
  // });
};
