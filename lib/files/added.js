'use strict';

const fs = require('fs');
const path = require('path');
const addedFilePath = path.resolve(process.cwd(), '.gavu/added');

let added = [];
loadAddedFromFile();

module.exports = {
  push: function(filename) {
    added.push(filename);
    saveAddedToFile();
  },
  pop: function(){
    var file = added.pop();
    saveAddedToFile();
    return file;
  },
  fileAlreadyAdded: function(filename){
    return added.some(function(file){
      return filename === file;
    });
  },
  forEach: function(callback){
    added.forEach(callback)
  },
  length: function() {
    return added.length;
  },
  hasFiles: function() {
    return added.length > 0;
  }
};

function saveAddedToFile(){
  fs.writeFileSync(addedFilePath, JSON.stringify(added));
}


function loadAddedFromFile(){
  try {
    fs.accessSync(addedFilePath);
    added = JSON.parse(fs.readFileSync(addedFilePath, 'utf8'));
  } catch (e) {
    console.error('Error when reading added files');
  }
}
