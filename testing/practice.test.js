const practice = require('./practice')

test('capitalize', () => {
   expect(practice.capital('tobi')).toBe('Tobi')
})

test('reverse', () => {
    expect(practice.reverse('priscilla')).toBe('allicsirp')
})

describe('calculator', () => {
    test('add', () => {
        expect(practice.calculate.add(1,1)).toBe(2)
    });

    test('subtract', () => {
        expect(practice.calculate.subtract(2,1)).toBe(1)
    });

    test('divide', () => {
        expect(practice.calculate.divide(4,2)).toBe(2)
    });
    
    test('multiply', () => {
        expect(practice.calculate.multiply(1,1)).toBe(1)
    });
})

describe('check array', () => {
    test('avg', () => {
        expect(practice.analyze([1,2,3])).toEqual({
            avg: 2,
            min: 1,
            max: 3,
            length: 3
        })
    })
})