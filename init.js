const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const { 
  isAlphabetic, 
  getRanked, 
  getModifiedNames, 
  getInventedNames,
} = require('./helpers'); 

// Some config definitions
const SUFFIX_SPLITTER = ' -- ';
const FULLNAME_SPLITTER = ', ';
const RANKING_COUNT = 10;

const fullNames = []; // Array of objects {first: '', last: ''}
const firstNames = {}; // Dictionary with firstname as key and ocurrences as value
const lastNames = {}; // Dictionary with lastname as key and ocurrences as value

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
  const nameParts = fullName.split(FULLNAME_SPLITTER);

  // Skip names that don't follow the structure (coding-test.txt@108)
  if(nameParts.length !== 2 
    || !isAlphabetic(nameParts[0]) 
    || !isAlphabetic(nameParts[1]))    
    return;

  const lastName = nameParts[0];
  const firstName = nameParts[1];

  fullNames.push({last: lastName, first: firstName});

  if(lastName in lastNames)
    lastNames[lastName]++;
  else
    lastNames[lastName] = 0;

  if(firstName in firstNames)
    firstNames[firstName]++;
  else
    firstNames[firstName] = 0;
}

const createReport = () => {
  console.log('fullNames Count', fullNames.length);
  console.log('Firstnames Count ', Object.keys(firstNames).length);
  console.log('Lastnames Count ', Object.keys(lastNames).length);

  const lastNamesRanking = getRanked(lastNames, RANKING_COUNT);
  console.log('lastNames Rank ', lastNamesRanking);

  const firstNamesRanking = getRanked(firstNames, RANKING_COUNT);
  console.log('FirstNames Rank ', firstNamesRanking);

  const modifiedNames = getModifiedNames(fullNames, 25)
  console.log('Modified Names ', modifiedNames);

  console.log('Invented Names ', getInventedNames(modifiedNames));

}



startFromCommand(process.argv);