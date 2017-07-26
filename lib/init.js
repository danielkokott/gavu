'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

console.log(`Initializing gavu repository in ${process.cwd()}`);

try {
  fs.lstatSync('./.gavu');
  fs.lstatSync('./.gavu/config');
  fs.lstatSync('./.gavu/jobs');
  console.log('Directory already configured.');
  process.exit();
} catch (ex){
  // Do nothing
}


createDirectoryIfNotExists('./.gavu');
createDirectoryIfNotExists('./.gavu/jobs');


var config = {
  vaultName: path.basename(path.resolve('./')),
  options: {}
};

askQuestion('Access key ID?:', (answer) => {
  config.options['accessKeyId'] = answer;

  askQuestion('Secret access key?:', (answer) => {
    config.options['secretAccessKey'] = answer

    askQuestion('Region?:', (answer) => {
      config.options['region'] = answer;

      askQuestion('Account ID?:', (answer) => {
        config['accountId'] = answer;

        askQuestion(`Vault name? [${config.vaultName}]:`, (answer) => {
          if (answer) {
            config['vaultName'] = answer;
          }

          saveConfigToFile(config);

          const glacier = require('./aws-glacier');
          glacier.createVault((err, result) => {
            if (err) {
              console.error(err);
            } else {
              config = Object.assign(config, result);
              saveConfigToFile(config);
              console.log(`Initialized gavu repository in ${process.cwd()}`);
            }
          });
        });
      });
    });
  });
});


return;


function askQuestion(question, callback){
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(question.concat(' '), (answer) => {
    rl.close();
    callback(answer);
  });
}


function saveConfigToFile(){
  fs.writeFileSync('./.gavu/config', JSON.stringify(config));
}


function loadConfigFromFile(){
  config = JSON.parse(fs.readFileSync('./.gavu/config', 'utf8'));
}


function createDirectoryIfNotExists(path){
  // TODO: existsSync deprecated
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
