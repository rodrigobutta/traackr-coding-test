const {   
    getInventedNames,  
    getModifiedNames, 
    getRanked, 
} = require('./reports'); 
const {       
    fullnamesPrettyPrint,
} = require('./helpers'); 


const createResume = (fullNames, firstNames, lastNames) => {
    console.log('Names Count:', fullNames.length);
    console.log('First Names Count:', Object.keys(firstNames).length);
    console.log('Last Names Count:', Object.keys(lastNames).length);

    const lastNamesRanking = getRanked(lastNames, 10);
    console.log('Last Names Rank\n', lastNamesRanking);

    const firstNamesRanking = getRanked(firstNames, 10);
    console.log('First Names Rank\n', firstNamesRanking);

    const modifiedNames = getModifiedNames(fullNames, 25)
    console.log('Modified Names\n', fullnamesPrettyPrint(modifiedNames));

    const inventedNames = getInventedNames(modifiedNames);
    console.log('Invented Names\n', fullnamesPrettyPrint(inventedNames));
} 

module.exports = {
    createResume,
}; 