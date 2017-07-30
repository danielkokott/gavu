'use strict';

const fs = require('fs');
const path = require('path');
// const Readline = require('readline');
const treehash = require('treehash');
const glacier = require('./aws-glacier');
const EventEmitter = require('events');

const added = require('./files/added');

module.exports.run = function() {
  let fileToUpload = added.pop();
  if (fileToUpload !== undefined){
    uploadFile(fileToUpload, function(err, result){
      if(err) {
        console.error(`Error when uploading ${fileToUpload}`, err);
      }
      // Take the next
      module.exports.run();
    });
  }

  return;
};


// const rl = Readline.createInterface({
//   input: fs.createReadStream('./.gavu/added', {encoding: 'utf8'})
// });
//
// rl.on('line', (input) => {
//   console.log('line', input);
//   rl.pause();
//   // rl.close();
//   // myEmitter.emit('file' input);
//   getNextAddedFile(input);
// });


// function getNextAddedFile(file) {
//   console.log('getNextAddedFile', file);
//   setTimeout(function () {
//     rl.resume();
//   }, 1000)
//   // uploadFile(file, function(err, result){
//   //   console.log('uploadArchive', err, result);
//   // })
// }



function uploadFileFake(filename, callback) {

  console.log('filename', filename);
  console.log('params', generateParams(filename));
  setTimeout(callback, 1000)
}

function uploadFile(filename, callback) {
  let params = generateParams(filename);
  glacier.uploadArchive(params, callback);
}


function generateParams(filename) {
  // var filename = '/Volumes/WD15TB/Photos/2006/2006-10/DSCF3481.JPG';
  var file = fs.readFileSync(filename);
  var fileChecksum = treehash.getTreeHashFromBuffer(file);

  return {
    archiveDescription: getArchiveDescription(filename),
    body: file,
    checksum: fileChecksum
  };
}



/*
 e.g. /Volumes/WD15TB/Photos/2007/2007-03/IMG_2241.JPG
      returns 2007-03/IMG_2241.JPG
      if /Volumes/WD15TB/Photos is current working directory
*/
function getArchiveDescription(filename) {
  // Making sure it's an abolute path
  filename = path.resolve(filename);

  var stats = fs.statSync(filename);

  if(!stats.isFile()){
    return null;
  }

  var temp = path.parse(filename);
  if (temp.dir === '/'){
    return temp.base;
  } else {
    var vv = temp.dir.replace(process.cwd(), '');
    if (vv.startsWith('/')){
      vv = vv.substring(1);
    }
    return vv.concat(temp.base);

    // var sp = temp.dir.split('/');
    // if (sp.length === 1){
    //   return sp[0].concat('/', temp.base);
    // } else {
    //   return sp.slice(sp.length - 1).concat(temp.base).join('/');
    // }
  }
}
