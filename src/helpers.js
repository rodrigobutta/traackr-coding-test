const {   
    REGEX_ONLY_ALPHABETIC,
} = require('./config'); 

const isAlphabetic = string => REGEX_ONLY_ALPHABETIC.test(string);

const getFullName = (firstName = '', lastName = '') => ({
    last: lastName, 
    first: firstName
});

const addOrIncrement = (names = {}, name) => name in names 
? names[name]+1 
: 0;

const fullnamesPrettyPrint = (array = []) => 
    array.map(fn => `${fn.last}, ${fn.first}`);

module.exports = {
    addOrIncrement,  
    getFullName,    
    isAlphabetic,
    fullnamesPrettyPrint
}; 