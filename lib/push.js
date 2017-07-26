'use strict';

const fs = require('fs');
const Path = require('path');
const Readline = require('readline');
const Treehash = require('treehash');
const glacier = require('./aws-glacier');
const EventEmitter = require('events');

const rl = Readline.createInterface({
  input: fs.createReadStream('./.gavu/added', {encoding: 'utf8'})
});

rl.on('line', (input) => {
  console.log('line', input);
  rl.pause();
  // rl.close();
  // myEmitter.emit('file' input);
  getNextAddedFile(input);
});


function getNextAddedFile(file) {
  console.log('getNextAddedFile', file);
  setTimeout(function () {
    rl.resume();
  }, 1000)
  // uploadFile(file, function(err, result){
  //   console.log('uploadArchive', err, result);
  // })
}


function removeLineFromAdded(callback){
  // TODO
}


function uploadFile(filename, callback) {
  // var filename = '/Volumes/WD15TB/Photos/2006/2006-10/DSCF3481.JPG';
  var file = fs.readFileSync(filename);
  var fileChecksum = Treehash.getTreeHashFromBuffer(file);

  var params = {
    archiveDescription: getArchiveDescription(filename),
    body: file,
    checksum: fileChecksum
  };

  glacier.uploadArchive(params, callback);
}



/*
 e.g. /Volumes/WD15TB/Photos/2007/2007-03/IMG_2241.JPG
      returns 2007-03/IMG_2241.JPG
      if /Volumes/WD15TB/Photos is current working directory
*/
function getArchiveDescription(filename) {
  // Making sure it's an abolute path
  filename = Path.resolve(filename);

  var stats = fs.statSync(filename);

  if(!stats.isFile()){
    return null;
  }

  var temp = Path.parse(filename);
  if (temp.dir === '/'){
    return temp.base;
  } else {
    var vv = temp.dir.replace(process.cwd(), '');
    if (vv.startsWith('/')){
      vv = vv.substring(1);
    }
    return vv;

    // var sp = temp.dir.split('/');
    // if (sp.length === 1){
    //   return sp[0].concat('/', temp.base);
    // } else {
    //   return sp.slice(sp.length - 1).concat(temp.base).join('/');
    // }
  }
}
