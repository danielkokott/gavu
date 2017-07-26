'use strict';

const fs = require('fs');
const Path = require('path');
const os = require('os');
const Readline = require('readline');

const fileArgument = process.argv[3];
const filePath = Path.resolve(process.cwd(), fileArgument);

// TODO: existsSync deprecated
if(!fs.existsSync(filePath)){
  console.log('File not found.');
  process.exit();
}

var fileAlreadyAdded = false;

// Read the whole file
const rl = Readline.createInterface({
  input: fs.createReadStream('./.gavu/added', {encoding: 'utf8'})
});

// We check if the file is already added
rl.on('line', (input) => {
  if (input === filePath) {
    fileAlreadyAdded = true;
    rl.close();
  }
});

// If the file has not been added previously, we append it now
rl.on('close', (input) => {
  if (!fileAlreadyAdded) {
    fs.appendFileSync('./.gavu/added', filePath.concat(os.EOL));
  }
});

return;
