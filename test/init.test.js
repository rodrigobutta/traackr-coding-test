const assert = require('assert');
const {       
    fullnamesPrettyPrint,
    getFullName,
    isAlphabetic, 
} = require('../src/helpers'); 
const {       
    getInventedNames,  
    getModifiedNames, 
    getRanked, 
} = require('../src/reports'); 

describe('Alphabetic', () => {

    it('String has only letters', () => {
        assert.strictEqual(
            isAlphabetic('Rodrigo'),
            true
        );
    });

    it('String has numbers', () => {
        assert.strictEqual(
            isAlphabetic('Rodrigo1983'),
            false
        );
    });

    it('String has some weird chars', () => {
        assert.strictEqual(
            isAlphabetic('Rodrigo"·$"·'),
            false
        );
    });

    it('String is empty', () => {
        assert.strictEqual(
            isAlphabetic(''),
            false
        );
    });

});

describe('FullName object creation', () => {
    
    it('With correct params', () => {
        assert.deepStrictEqual(
            getFullName('Rodrigo','Butta'), 
            {
                first: 'Rodrigo',
                last: 'Butta'
            }
        );
    });

    it('With missing params', () => {
        assert.deepStrictEqual(
            getFullName('Rodrigo'), 
            {
                first: 'Rodrigo',
                last: ''
            }
        );
    });

});

describe('Fullname pretty printing', () => {
    
    it('FullName pretty print with multiple names', () => {
        assert.deepStrictEqual(
            fullnamesPrettyPrint([{
                first: 'Rodrigo',
                last: 'Butta'
            }, {
                first: 'Eduardo',
                last: 'Butta'
            }]), 
            ['Butta, Rodrigo', 'Butta, Eduardo']
        );
    });

    it('FullName pretty print with one name', () => {
        assert.deepStrictEqual(
            fullnamesPrettyPrint([{
                first: 'Rodrigo',
                last: 'Butta'
            }]), 
            ['Butta, Rodrigo']
        );
    });

    it('FullName pretty print with no names', () => {
        assert.deepStrictEqual(
            fullnamesPrettyPrint([]), 
            []
        );
    });


    it('FullName pretty print with no param', () => {
        assert.deepStrictEqual(
            fullnamesPrettyPrint(), 
            []
        );
    });
    
});

describe('Inventing names', () => {
    
    it('More than one elements', () => {
        assert.deepStrictEqual(
            getInventedNames([{
                first: 'NameOne',
                last: 'LastnameOne',
            }, {
                first: 'NameTwo',
                last: 'LastNameTwo',
            }]), 
            [{
                first: 'NameTwo',
                last: 'LastnameOne',
            }, {
                first: 'NameOne',
                last: 'LastNameTwo',
            }]
        );
    });

    it('With 1 element it should return empty because couldnt invent', () => {
        assert.deepStrictEqual(
            getInventedNames([{
                first: 'NameOne',
                last: 'LastnameOne'
            }]), 
            []
        );
    });

    it('With no element it should return empty because has nothing to process', () => {
        assert.deepStrictEqual(
            getInventedNames([]), 
            []
        );
    });
    
});

describe('Ranking', () => {
    
    it('Normal use case', () => {
        assert.deepStrictEqual(
            getRanked({Rodrigo: 1, Eduardo: 5, Butta: 2})
            , [['Eduardo',5],['Butta',2],['Rodrigo',1]]
        );
    });

    it('Limit to the TOP 3', () => {
        assert.deepStrictEqual(
            getRanked({Rodrigo: 10, Eduardo: 5, Butta: 2, Winner: 15, Looser: 2}, 3)
            , [['Winner',15],['Rodrigo',10],['Eduardo',5]]
        );
    });

});

describe('Modified Names', () => {
    
    it('Real definition data', () => {
        assert.deepStrictEqual(
            getModifiedNames([{
                first: 'Joan',
                last: 'Smith',
            }, {
                first: 'John',
                last: 'Smith',
            }, {
                first: 'Sam',
                last: 'Smith',
            }, {
                first: 'Joan',
                last: 'Thomas',
            }, {
                first: 'Joan',
                last: 'Upton',
            }, {
                first: 'Tom',
                last: 'Upton',
            }, {
                first: 'Cesar',
                last: 'Vazquez',
            }])
            , [
                {
                    "first": "Joan",
                    "last": "Smith",
                },
                {
                    "first": "Tom",
                    "last": "Upton",
                },
                {
                    "first": "Cesar",
                    "last": "Vazquez",
                }
            ]
        );
    });

});