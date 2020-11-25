const {
  SUFFIX_SPLITTER,
  FULLNAME_SPLITTER,
} = require('./config');

const {
  addOrIncrement,
  getFullName,
  isAlphabetic,
} = require('./helpers');

const parseLine = (fullNames, firstNames, lastNames, line) => {
  // Skip lines that don't start with letters (coding-test.txt@107)
  if (!isAlphabetic(line.charAt(0))) return;

  const fullName = line.split(SUFFIX_SPLITTER)[0];

  // Get the name parts or skip names
  // that don't follow the structure (coding-test.txt@108)
  const nameParts = fullName.split(FULLNAME_SPLITTER);
  if (nameParts.length !== 2 ||
    !isAlphabetic(nameParts[0]) ||
    !isAlphabetic(nameParts[1])) {
    return;
  }
  const lastName = nameParts[0];
  const firstName = nameParts[1];

  // if we arrived here, the name is ok to be added into our collection
  fullNames.push(getFullName(firstName, lastName));

  // If firstname/lastname already exists,
  // add 1 to its count, otherwise, add name with 0
  lastNames[lastName] = addOrIncrement(lastNames, lastName);
  firstNames[firstName] = addOrIncrement(firstNames, firstName); ;
};

module.exports = {
  parseLine,
};
