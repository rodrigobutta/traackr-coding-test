const assert = require('assert');
const {   
    fullnamesPrettyPrint,
    getFullName,
    getInventedNames,  
    getModifiedNames, 
    getRanked, 
    isAlphabetic, 
  } = require('../helpers'); 

describe('Simple Math Test', () => {
    it('should return 2', () => {
        assert.strictEqual(1 + 1, 2);
    });
    it('should return 9', () => {
        assert.strictEqual(3 * 3, 9);
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

describe('Helpersss', () => {
    
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