'use strict';

const fs = require('fs');
const util = require('util');
var config = {};

console.log('init');

try {
  fs.lstatSync('./.gavu');
  fs.lstatSync('./.gavu/config');
  fs.lstatSync('./.gavu/refs');
  fs.lstatSync('./.gavu/jobs');
  console.log('Directory already configured.');
  process.exit(0);
} catch (ex){
}


createDirectoryIfNotExists('./.gavu');
createDirectoryIfNotExists('./.gavu/refs');
createDirectoryIfNotExists('./.gavu/jobs');
var configCreatedFromEnv = createConfigFromEnv();

console.log(`Initialized gavu repository in ${process.cwd()}`);

// function getUserInput(label, field, data){
//
// }

// process.stdin.resume();
// process.stdin.setEncoding('utf8');
//
// process.stdin.on('data', function (text) {
//   console.log('received data:', util.inspect(text));
//   if (text === 'quit\n') {
//     done();
//   }
// });
//
//
// function done() {
//   console.log('Now that process.stdin is paused, there is nothing more to do.');
//   process.exit();
// }

function createConfigFromEnv(){
  if(process.env.AWS_ACCESS_KEY_ID){
    config.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
  }

  if(process.env.AWS_SECRET_ACCESS_KEY){
    config.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
  }

  if(process.env.AWS_REGION){
    config.AWS_REGION = process.env.AWS_REGION;
  }

  if(process.env.AWS_ACCOUNT_ID){
    config.AWS_ACCOUNT_ID = process.env.AWS_ACCOUNT_ID;
  }

  if(process.env.AWS_VAULT_NAME){
    config.AWS_VAULT_NAME = process.env.AWS_VAULT_NAME;
  }

  if(configObjectIsComplete()){
    saveConfigToFile();
  } else {
    console.log('ENV missing to create config');
  }
}


function saveConfigToFile(){
  fs.writeFileSync('./.gavu/config', JSON.stringify(config));
}


function loadConfigFromFile(){
  config = JSON.parse(fs.readFileSync('./.gavu/config', 'utf8'));
}


function configObjectIsComplete(){
  var keys = Object.keys(config);

  if(keys.length !== 5){
    return false;
  }

  if(keys.indexOf('AWS_ACCESS_KEY_ID') === -1 && config.AWS_ACCESS_KEY_ID){
    return false;
  }

  if(keys.indexOf('AWS_SECRET_ACCESS_KEY') === -1 && config.AWS_SECRET_ACCESS_KEY){
    return false;
  }

  if(keys.indexOf('AWS_REGION') === -1 && config.AWS_REGION){
    return false;
  }

  if(keys.indexOf('AWS_ACCOUNT_ID') === -1 && config.AWS_ACCOUNT_ID){
    return false;
  }

  if(keys.indexOf('AWS_VAULT_NAME') === -1 && config.AWS_VAULT_NAME){
    return false;
  }

  return true;
}


function createDirectoryIfNotExists(path){
  if(fs.existsSync(path)){
    if(fs.lstatSync(path).isDirectory()){
      // OK
    } else {
      console.log('Directory ' + path + ' could not be created.');
      process.exit();
    }
  } else {
    fs.mkdirSync(path);
  }
}
