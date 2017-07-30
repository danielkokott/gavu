'use strict';

const glacier = require('./aws-glacier');

module.exports.run = function() {
  glacier.listVaults(function(err, result){
    if (err) {
      console.error(err);
    } else {
      // console.log(result);
      result.VaultList.forEach(function(vault){
        console.log(
        `Name: ${vault.VaultName}
          CreationDate: ${vault.CreationDate}
          NumberOfArchives: ${vault.NumberOfArchives}
          SizeInBytes ${vault.SizeInBytes}`);
      });
    }
  });

  return;
};
