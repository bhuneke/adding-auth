const assert = require('chai').assert;
const mongoose = require('mongoose');
const Park = require('../lib/models/park-schema');

mongoose.Promise = Promise;

describe('validates Park schema', () => {

    it('validation passes when name and city provided', () => {
        return new Park( { name: 'Park One', city: 'Portland' } )
        .validate()
    });

    it('validation fails without name', () => {
        return new Park( { city: 'France' } )
        .validate()
        .then(
            () => { throw new Error('validation not expected without name')},
            err => assert.isNotNull(err)
        );
    });

    it('validation fails without city', () => {
        return new Park( { name: 'Park One' } )
        .validate()
        .then(
            () => { throw new Error('validation not expected without city')},
            err => assert.isNotNull(err)
        );
    });

    it('validation fails when amenity not in enum array', () => {
        return new Park({ 
            name: 'Park One',
            city: 'Portland',
            amenities: 'slide'
        })
        .validate()
        .then(
            () => { throw new Error('validation not expected without city')},
            err => assert.isNotNull(err)
        );
    });

    it('validation passes when amenity in enum array', () => {
        return new Park({
            name: 'Park One',
            city: 'Portland',
            amenities: 'fountain'
        })
        .validate()
    });
});