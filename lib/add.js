'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const Readline = require('readline');

const added = require('./files/added');

const fileArgument = process.argv[3];

// TODO: If the fileArgument === '.' OR ends with *

const filePath = path.resolve(process.cwd(), fileArgument);

module.exports.run = function() {
  try {
    fs.accessSync(filePath);
  } catch (e) {
    console.log('File not found.');
    process.exit();
  }

  if(!added.fileAlreadyAdded(filePath)){
    added.push(filePath);
  }

  return;
};

// return;
//
// var fileAlreadyAdded = false;
//
// // Read the whole file
// const rl = Readline.createInterface({
//   input: fs.createReadStream('./.gavu/added', {encoding: 'utf8'})
// });
//
// // We check if the file is already added
// rl.on('line', (input) => {
//   if (input === filePath) {
//     fileAlreadyAdded = true;
//     rl.close();
//   }
// });
//
// // If the file has not been added previously, we append it now
// rl.on('close', (input) => {
//   if (!fileAlreadyAdded) {
//     fs.appendFileSync('./.gavu/added', filePath.concat(os.EOL));
//   }
// });
//
// return;
