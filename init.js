var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var now = require('performance-now');

const SUFFIX_SPLITTER = ' -- ';
const FULLNAME_SPLITTER = ', ';
const RANKING_COUNT = 10;
const REGEX_ONLY_ALPHABETIC = /^[a-zA-Z'`ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç]+$/i; //^[a-zA-Z]+$/i

const fullNames = [];
const firsts = {};
const lasts = {};

const args = process.argv.slice(2);
if(args.length===0) {
  console.log('No file specified');
  return false;
}

var fileName = args[0];
console.log('File: ', fileName);

var instream = fs.createReadStream(fileName);
var outstream = new stream();
var lineReader = readline.createInterface(instream, outstream);

lineReader.on('line', line => {  
  // Skip lines that don't start with letters (coding-test.txt@107)
  if(!isAlphabetic(line.charAt(0))){
    return;
  }

  var fullName = line.split(SUFFIX_SPLITTER)[0];

  var nameParts = fullName.split(FULLNAME_SPLITTER);
  
  // Skip names that don't follow the structure (coding-test.txt@108)
  if(nameParts.length !== 2 || !isAlphabetic(nameParts[0]) || !isAlphabetic(nameParts[1]))
    {
      console.log('Name format fail:',fullName);
    return;
  }

  const lastName = nameParts[0];
  const firstName = nameParts[1];
  
  fullNames.push({last: lastName, first: firstName});

  if(lastName in lasts)
    lasts[lastName]++;
  else
    lasts[lastName] = 0;
  
  if(firstName in firsts)
    firsts[firstName]++;
  else
    firsts[firstName] = 0;

});

lineReader.on('close', () => {
  
  console.log('fullNames Count', fullNames.length);
  console.log('Firstnames Count ', Object.keys(firsts).length);
  console.log('Lastnames Count ', Object.keys(lasts).length);

  const lastsRanking = getRanked(lasts, RANKING_COUNT);
  console.log('Lasts Rank ', lastsRanking);

  const firstsRanking = getRanked(firsts, RANKING_COUNT);
  console.log('Firsts Rank ', firstsRanking);

  const modifiedNames = getModifiedNames(fullNames, 25)
  console.log('Modified Names ', modifiedNames);

  console.log('Invented Names ', getInventedNames(modifiedNames));

});


const isAlphabetic = string => REGEX_ONLY_ALPHABETIC.test(string);

// Assuming a dictionary {label->value} where the value is the count of ocurrencies
const getRanked = (items, count) => Object.entries(items).sort((a, b) => b[1]-a[1]).slice(0, count);

// Take the first N names from the array where first and last are unique for that property
const getModifiedNames = (array, count) => {

  // I would have used a reduce here, but reduce cannot be early breaked so if I already found the N modified names that I want,
  // I'd rather stop looping a huge array
  const acc = [];
  for (let i = 0; i < array.length; i++) {
    if (!acc.some(acc => acc.first === array[i].first) 
      && !acc.some(acc => acc.last === array[i].last)) {
      acc.push({last: array[i].last, first: array[i].first});
      if(acc.length === count) break;
    }
  }

  return acc;
}

// Because I know there wont be firsts and lasts dups, I can offset 1 key of first or last and it will do the job
const getInventedNames = array => 
  array.map((item, index) => (
    {
      last: item.last, 
      first: index === 0 ? 
        array[array.length-1].first : 
        array[index-1].first
    }
  ));