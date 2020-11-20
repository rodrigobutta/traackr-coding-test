const REGEX_ONLY_ALPHABETIC = /^[a-zA-Z'`ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç]+$/i; //^[a-zA-Z]+$/i

const isAlphabetic = string => REGEX_ONLY_ALPHABETIC.test(string);

// Assuming a dictionary {label->value} where the item would be the key (firstname, lastname)
// and the value is the count of ocurrencies
const getRanked = (dict, count) => 
    Object.entries(dict).sort((a, b) => 
        b[1]-a[1]).slice(0, count);

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

// Because I know there wont be firstNames and lastNames dups, I can offset 1 key of first or last and it will do the job
const getInventedNames = array => 
    array.map((item, index) => (
        {
        last: item.last, 
        first: index === 0 ? 
            array[array.length-1].first : 
            array[index-1].first
    }
));

module.exports = { 
    isAlphabetic,
    getRanked,
    getModifiedNames,
    getInventedNames,
}; 