const chai = require('chai');
const assert = chai.assert;
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const app = require('../lib/app');

mongoose.Promise = Promise;
chai.use(chaiHttp);

const request = chai.request(app);

process.env.MONGODB_URI = 'mongodb://localhost:27017/addingAuth-test';
require('../lib/connection');

function savePark(resource) {
    return request.post('/parks')
        .send(resource)
        .then(res => res.body);
}

describe('api tests', () => {
    before(() => mongoose.connection.dropDatabase());

    let parkOne = {
        name: 'Park One',
        city: 'Portland',
        amenities: 'fountain'
    };

    let parkTwo = {
        name: 'Park Two',
        city: 'Portland',
        amenities: 'trails'
    };

    let parkThree = {
        name: 'Park Three',
        city: 'Paris',
        amenities: 'dog-friendly'
    };

    it('GET empty array', () => {
        return request.get('/parks')
            .then(req => req.body)
            .then(res => {
                assert.deepEqual(res, []);
            });
    });

    it('POST new park', () => {
        return savePark(parkOne)
            .then(savedPark => {
                parkOne._id = savedPark._id;
                parkOne.__v = savedPark.__v;
                assert.deepEqual(savedPark, parkOne);
            });
    });

    it('GET park by id', () => {
        return request.get(`/parks/${parkOne._id}`)
            .then(res => {
                assert.deepEqual(res.body, parkOne);
            });
    });

    it('GET all parks', () => {
        return Promise
            .all([
                savePark(parkTwo),
                savePark(parkThree)
            ])
            .then(savedParks => {
                parkTwo = savedParks[0],
                parkThree = savedParks[1];
            })
            .then(() => request.get('/parks'))
            .then(parks => {
                assert.deepEqual(parks.body, [parkOne, parkTwo, parkThree]);
            });
    });
});

