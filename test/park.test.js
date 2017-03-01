const Park = require('../lib/models/park-schema');
const testInvalid = require('./test-invalid')(Park);


describe('validates Park schema', () => {

    it('validation passes when name and city provided', () => {
        return new Park( { name: 'Park One', city: 'Portland' } )
        .validate();
    });

    it('validation fails without name', () => {
        return testInvalid( { city: 'France' } );
    });

    it('validation fails without city', () => {
        return testInvalid( { name: 'Park One' } );
    });

    it('validation fails when amenity not in enum array', () => {
        return testInvalid({ 
            name: 'Park One',
            city: 'Portland',
            amenities: 'slide'
        });
    });

    it('validation passes when amenity in enum array', () => {
        return new Park({
            name: 'Park One',
            city: 'Portland',
            amenities: 'fountain'
        })
        .validate();
    });
});