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
        archiveDescription: '2006-10/DSCF3481.JPG',
        body: file,
        checksum: fileChecksum
      }
    );

    glacier.uploadArchive(params, callback);

    // === OUTPUT
    // Archive ID
      // {
      //   location: '/622824714146/vaults/TestPhotos/archives/scGlBBfgo08FgerK387BWpIe_SQ4y0sEk2q9y6aSnZbM3MthdvnUkHTHhSuRjgtigesiEnMYWM7pyIq5-WmqwKOcG4wVM-jWvGhBZGQypWinIzK27e8hMi9H9HO_y1WKSnDbo31ZOQ',
      //   checksum: '34eb791ca2c85793319a11896a790003c9278ce363efc39dcae7e5983ef55694',
      //   archiveId: 'scGlBBfgo08FgerK387BWpIe_SQ4y0sEk2q9y6aSnZbM3MthdvnUkHTHhSuRjgtigesiEnMYWM7pyIq5-WmqwKOcG4wVM-jWvGhBZGQypWinIzK27e8hMi9H9HO_y1WKSnDbo31ZOQ'
      // }
  }
};

// glacier.abortMultipartUpload(params, function (err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });
