'use strict';

const fs = require('fs');
const path = require('path');
const jobsFilePath = path.resolve(process.cwd(), '.gavu/jobs');

let jobs = [];
loadJobsFromFile();

module.exports = {
  push: function(filename) {
    jobs.push(filename);
    saveJobsToFile();
  },
  pop: function(){
    var job = jobs.pop();
    saveJobsToFile();
    return job;
  },
  jobAlreadyStarted: function(job){
    //TODO
    return false;
  },
  forEach: function(callback){
    jobs.forEach(callback)
  },
  length: function() {
    return jobs.length;
  }
};

function saveJobsToFile(){
  fs.writeFileSync(jobsFilePath, JSON.stringify(jobs));
}


function loadJobsFromFile(){
  try {
    fs.accessSync(jobsFilePath);
    jobs = JSON.parse(fs.readFileSync(jobsFilePath, 'utf8'));
  } catch (e) {
    console.error('Error when reading jobs files');
  }
}
