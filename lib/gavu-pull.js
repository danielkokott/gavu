'use strict';

const fs = require('fs');
const treehash = require('treehash');
const glacier = require('./aws-glacier');


console.log('pull');
console.log(process.argv);

// ArchiveId: 'scGlBBfgo08FgerK387BWpIe_SQ4y0sEk2q9y6aSnZbM3MthdvnUkHTHhSuRjgtigesiEnMYWM7pyIq5-WmqwKOcG4wVM-jWvGhBZGQypWinIzK27e8hMi9H9HO_y1WKSnDbo31ZOQ',
// ArchiveDescription: '2006-10/DSCF3481.JPG',

var jobParameters = {
  Type: "archive-retrieval",
  ArchiveId: 'scGlBBfgo08FgerK387BWpIe_SQ4y0sEk2q9y6aSnZbM3MthdvnUkHTHhSuRjgtigesiEnMYWM7pyIq5-WmqwKOcG4wVM-jWvGhBZGQypWinIzK27e8hMi9H9HO_y1WKSnDbo31ZOQ',
  Description: 'Downloading one archive'
  // RetrievalByteRange: String,
  // SNSTopic: String,
  // Tier: String
};

// glacier.initiateJob(jobParameters, function(err, result){
//   console.log('initiateJob archive-retrieval', err, result);
//   fs.writeFileSync('./.gavu/jobs/'.concat(result.jobId), JSON.stringify(result));
// })


glacier.getJobOutput({ jobId: 'lByYxgp0ljTt2TOktWMVd0XOKNcuyT0g_gUzsNA4nBbZwLHgv2HlcpBsZMFdnEqOdknbTsDqCqCF53ihfAJ0iYMEjh1F'}, function(err, result){
  console.log('Archive downloaded', err, result);
  if (result.contentType === 'application/octet-stream'){
    fs.writeFileSync(result.archiveDescription, result.body);
    // TODO: validate result.checksum with fileChecksum
    // var file = fs.readFileSync(filename);
    // var fileChecksum = treehash.getTreeHashFromBuffer(file);
  }
});
