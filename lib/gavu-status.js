'use strict';

const fs = require('fs');
const glacier = require('./aws-glacier');

const inventory = JSON.parse(fs.readFileSync('./.gavu/inventory', 'utf8'));

glacier.listVaults(function(err, result){
  console.log('Vaults', result);
});

console.log('Inventory');
console.log(inventory);
