const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const { 
  isAlphabetic, 
  getRanked, 
  getModifiedNames, 
  getInventedNames,
} = require('../src/helpers'); 

// Some config definitions
const SUFFIX_SPLITTER = ' -- ';
const FULLNAME_SPLITTER = ', ';
const RANKING_COUNT = 10;

const startFromCommand = args => {
  const params = args.slice(2);
  if(params.length > 0) {

    const state = {
      fullNames: [],
      firstNames: {},
      lastNames: {},
    }
    fetchFile(state, params[0]);

  }
  else {
    console.log('No file specified');
  }
}

const fetchFile = (state, fileName) => {
  console.log('Fetching ', fileName, '..');

  const instream = fs.createReadStream(fileName);
  const outstream = new stream();
  const lineReader = readline.createInterface(instream, outstream);
  
  lineReader.on('line', line => (state = parseLine(state, line)));  
  lineReader.on('close', () => createReport(state));
}

const parseLine = (state, line) => {
  // Skip lines that don't start with letters (coding-test.txt@107)
  if(!isAlphabetic(line.charAt(0))) return state;
  
  const fullName = line.split(SUFFIX_SPLITTER)[0];
  const nameParts = fullName.split(FULLNAME_SPLITTER);

  // Skip names that don't follow the structure (coding-test.txt@108)
  if(nameParts.length !== 2 
    || !isAlphabetic(nameParts[0]) 
    || !isAlphabetic(nameParts[1]))    
    return state;

  const lastName = nameParts[0];
  const firstName = nameParts[1];

  return {
    ...state,
    fullNames: 
      [...state.fullNames, 
        {
          last: lastName, 
          first: firstName
        }
      ],    
    firstNames: (
      firstName in state.firstNames ?
        {...state.firstNames,
          [firstName]:  state.firstNames[firstName] + 1
        } 
        :
        {...state.firstNames,
          [firstName]:  0
        }
    ),
    lastNames: (
      lastName in state.lastNames ?
        {...state.lastNames,
          [lastName]:  state.lastNames[lastName] + 1
        } 
        :
        {...state.lastNames,
          [lastName]:  0
        }
    ),
    };
}

const createReport = state => {
  console.log('fullNames Count', state.fullNames.length);
  console.log('Firstnames Count ', Object.keys(state.firstNames).length);
  console.log('Lastnames Count ', Object.keys(state.lastNames).length);

  const lastNamesRanking = getRanked(state.lastNames, 10);
  console.log('lastNames Rank ', lastNamesRanking);

  const firstNamesRanking = getRanked(state.firstNames, 10);
  console.log('FirstNames Rank ', firstNamesRanking);

  const modifiedNames = getModifiedNames(state.fullNames, 25)
  console.log('Modified Names ', modifiedNames);

  console.log('Invented Names ', getInventedNames(modifiedNames));

}



startFromCommand(process.argv);