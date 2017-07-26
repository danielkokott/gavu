#!/usr/bin/env node
'use strict';

const fs = require('fs');
const treehash = require('treehash');
const path = require('path');

var operation = process.argv[2];

if (operation === undefined || operation === null || operation === '') {
  console.log('Missing operation.');
  process.exit();
}

// TODO: existsSync deprecated
if(!fs.existsSync(path.resolve(process.cwd(), '.gavu/config')) && operation != 'init'){
  console.log('Vault not initialized.');
  console.log(`Run 'gavu init'.`);
  process.exit();
}

// TODO: existsSync deprecated
if(!fs.existsSync(path.resolve(__dirname, operation).concat('.js'))){
  console.log('Operation ' + operation + ' not found.');
  process.exit();
}


require(path.resolve(__dirname, operation));

return;
