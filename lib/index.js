#!/usr/bin/env node
'use strict';

const fs = require('fs');
const treehash = require('treehash');
const path = require('path');
const program = require('commander');


program
.version('0.0.1')
.command('init','Initialize vault')
.command('fetch','Download vault inventory')
.command('status','Compare with vault inventory')
.command('add','Add files to upload')
.command('push','Upload added files to vault')
.command('clone','Download files from vault')
.command('jobs','View active jobs')
.parse(process.argv);









var pathName = '/Volumes/WD15TB/Photos/';

// traverseDir(pathName);

function traverseDir(pathName){
  var items = fs.readdirSync(pathName);

  items.forEach(inspect);

  function inspect(f){
    var completeFilename = path.join(pathName, f);
    console.log('completeFilename', completeFilename);
    var stats = fs.statSync(completeFilename);
    if (stats.isDirectory()){
      traverseDir(completeFilename);
    } else if(stats.isFile()){
      uploadFile(completeFilename);
    }
  }
}

function uploadFile(completeFilename) {
  var file = fs.readFileSync(completeFilename);
  var fileChecksum = treehash.getTreeHashFromBuffer(file);
  var archiveDescription = getArchiveDescription(completeFilename);
  console.log(archiveDescription);
}
