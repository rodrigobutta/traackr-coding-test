const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const {   
  addOrIncrement,
  fullnamesPrettyPrint,
  getFullName,
  getInventedNames,  
  getModifiedNames, 
  getRanked, 
  isAlphabetic, 
} = require('./helpers'); 

const {   
  SUFFIX_SPLITTER,
  FULLNAME_SPLITTER,
} = require('./config'); 

// state
const fullNames = []; // Array of objects {first: '', last: ''}
const firstNames = {}; // Dictionary with firstname as key and ocurrences as value
const lastNames = {}; // Dictionary with lastname as key and ocurrences as value

// Init
const startFromCommand = args => {
  const params = args.slice(2);
  if(params.length > 0) 
    fetchFile(params[0]);
  else
    console.log('No file specified');
}

const fetchFile = fileName => {
  console.log('Fetching ', fileName, '..');

  const instream = fs.createReadStream(fileName);
  const outstream = new stream();
  const lineReader = readline.createInterface(instream, outstream);
  
  lineReader.on('line', line => parseLine(line));  
  lineReader.on('close', () => createReport());
}

const parseLine = line => {
  // Skip lines that don't start with letters (coding-test.txt@107)
  if(!isAlphabetic(line.charAt(0))) return;
  
  const fullName = line.split(SUFFIX_SPLITTER)[0];
  
  // Get the name parts or skip names that don't follow the structure (coding-test.txt@108)
  const nameParts = fullName.split(FULLNAME_SPLITTER);
  if(nameParts.length !== 2 
    || !isAlphabetic(nameParts[0]) 
    || !isAlphabetic(nameParts[1]))    
    return;
  const lastName = nameParts[0];
  const firstName = nameParts[1];

  // if we arrived here, the name is ok to be added into our collection
  fullNames.push(getFullName(firstName,lastName));

  // If firstname/lastname already exists, add 1 to its count, otherwise, add name with 0
  lastNames[lastName] = addOrIncrement(lastNames, lastName); 
  firstNames[firstName] = addOrIncrement(firstNames, firstName);;
  
}

const createReport = () => {
  console.log('fullNames Count:', fullNames.length);
  console.log('Firstnames Count:', Object.keys(firstNames).length);
  console.log('Lastnames Count:', Object.keys(lastNames).length);

  const lastNamesRanking = getRanked(lastNames, 10);
  console.log('lastNames Rank\n', lastNamesRanking);

  const firstNamesRanking = getRanked(firstNames, 10);
  console.log('FirstNames Rank\n', firstNamesRanking);

  const modifiedNames = getModifiedNames(fullNames, 25)
  console.log('Modified Names\n', fullnamesPrettyPrint(modifiedNames));

  const inventedNames = getInventedNames(modifiedNames);
  console.log('Invented Names\n', fullnamesPrettyPrint(inventedNames));

}


startFromCommand(process.argv);