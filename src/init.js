const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

const {   
  parseLine,
} = require('./process'); 
const {   
  createResume,
} = require('./output'); 

// Init
const startFromCommand = args => {
  const params = args.slice(2);
  if(params.length > 0) 
    processFile(params[0]);
  else
    console.log('No file specified');
}

const processFile = fileName => {
  console.log('Fetching ', fileName, '..');

  const instream = fs.createReadStream(fileName);
  const outstream = new stream();
  const lineReader = readline.createInterface(instream, outstream);

  // state
  const fullNames = []; // Array of objects {first: '', last: ''}
  const firstNames = {}; // Dictionary with firstname as key and ocurrences as value
  const lastNames = {}; // Dictionary with lastname as key and ocurrences as value
  
  lineReader.on('line', line => parseLine(fullNames, firstNames, lastNames, line));  
  lineReader.on('close', () => createResume(fullNames, firstNames, lastNames));
}

startFromCommand(process.argv);