'use strict';

const fs = require('fs');
const Path = require('path');
const Readline = require('readline');
const EventEmitter = require('events');

// TODO:
 // Make a comparison of the files on the disc, the inventory of the Vaults
 // And show what is:
 // 1) "added"/"pending upload"
 // 2) Not added and not uploaded
 // 3) Jobs status
 // 4) Already uploaded ????


// const inventory = JSON.parse(fs.readFileSync('./.gavu/inventory', 'utf8'));
// console.log('Inventory');
// console.log(inventory);



console.log(`   Adding:`);
const rl = Readline.createInterface({
  input: fs.createReadStream('./.gavu/added', {encoding: 'utf8'})
});
rl.on('line', (input) => {
  // TODO: Remove line from .gavu/added with file does not exist
  var adding = input.replace(process.cwd(), '');
  if (adding.startsWith('/')) {
    adding = adding.slice(1);
  }
  console.log(`      ${adding}`);
});


return;


// console.log(`   Adding:`);
// getAddedFiles().on('file', (adding) => {
//   console.log(`      ${adding}`);
// });
//
// function getAddedFiles () {
//
//   const myEmitter = new EventEmitter();
//
//   const rl = Readline.createInterface({
//     input: fs.createReadStream('./.gavu/added', {encoding: 'utf8'})
//   });
//
//   rl.on('line', (input) => {
//     // TODO: Remove line from .gavu/added with file does not exist
//     var adding = input.replace(process.cwd(), '');
//     if (adding.startsWith('/')) {
//       adding = adding.slice(1);
//     }
//     myEmitter.emit('file', adding);
//   });
//
//   return myEmitter;
// }
// module.exports.getAddedFiles = getAddedFiles;


function traverseDir(pathName){
  var items = fs.readdirSync(pathName);

  items.forEach(inspect);

  function inspect(f){
    var completeFilename = Path.join(pathName, f);
    console.log('completeFilename', completeFilename);
    var stats = fs.statSync(completeFilename);
    if (stats.isDirectory()){
      traverseDir(completeFilename);
    } else if(stats.isFile()){
      uploadFile(completeFilename);
    }
  }
}
