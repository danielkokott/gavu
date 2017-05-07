'use strict';

const fs = require('fs');
const path = require('path');
const treehash = require('treehash');
const glacier = require('./aws-glacier');


function uploadfile(filename){
  // var filename = '/Volumes/WD15TB/Photos/2006/2006-10/DSCF3481.JPG';
  var file = fs.readFileSync(filename);
  var fileChecksum = treehash.getTreeHashFromBuffer(file);

  var params = {
    archiveDescription: getArchiveDescription(filename),
    body: file,
    checksum: fileChecksum
  };

  glacier.uploadArchive(params, function(err, result){
    console.log('uploadArchive', err, result);
  });
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
    return vv;

    // var sp = temp.dir.split('/');
    // if (sp.length === 1){
    //   return sp[0].concat('/', temp.base);
    // } else {
    //   return sp.slice(sp.length - 1).concat(temp.base).join('/');
    // }
  }
}
