const {   
    DEFAULT_MODIFIED_NAMES_COUNT,
    DEFAULT_RANKING_COUNT,
} = require('./config'); 
const {   
    getFullName,
  } = require('./helpers'); 

// Assuming a dictionary {label->value} where the item would be the key (firstname, lastname)
// and the value is the count of ocurrencies
const getRanked = (dict, max = DEFAULT_RANKING_COUNT) => 
    Object.entries(dict).sort((a, b) => 
        b[1]-a[1]).slice(0, max);

// Take the first N names from the array where first and last are unique for that property
const getModifiedNames = (array, max = DEFAULT_MODIFIED_NAMES_COUNT) => {
  // I would have used a reduce here, but reduce cannot be early breaked so if I already found the N modified names that I want,
  // I'd rather stop looping a huge array 
    const acc = [];
    for (let i = 0; i < array.length; i++) {
        if (!acc.some(acc => acc.first === array[i].first) 
            && !acc.some(acc => acc.last === array[i].last)) {
            acc.push(getFullName(array[i].first, array[i].last));
            if(acc.length === max) break;
        }
    }
    return acc;
}

// Because I know there wont be firstNames and lastNames dups, I can offset 1 key of first or last and it will do the job
const getInventedNames = (array = []) => 
    array.length >= 2
    ? array.map((item, index) => 
        getFullName(
            index === 0 
                ? array[array.length-1].first
                : array[index-1].first,
            item.last
        ))
    : [];

module.exports = {
    getModifiedNames,
    getRanked,
    getInventedNames,
}; 