'use strict';

const fs = require('fs');
const path = require('path');
const config = require('./files/config');
const glacier = require('./aws-glacier');

const vault = process.argv[3];

// TODO: clone vault to local disc
module.exports.run = function() {

  vaultExists(vault, function(err) {
    if(err) {
      console.log('Vault does not exist');
      return;
    }

    console.log(`Cloning into ${vault}`);

    fs.mkdirSync(path.join(process.cwd(), vault));

  });

  return;
};


function vaultExists(vaultName, callback){
  glacier.listVaults(function(err, result){
    if (err) {
      console.error(err);
    } else {
      var exists = result.VaultList.some(function(vault) {
        return vault.VaultName === vaultName;
      });

      return callback(!exists);
    }
  });
}
