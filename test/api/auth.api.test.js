const chai =require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;

const app = require('../../lib/app');
const mongoose = require('mongoose');

describe('auth', () => {

    before(() => mongoose.connection.dropDatabase());

    const user = {
        username: 'user',
        password: 'asdf'
    };

    const request = chai.request(app);

    describe('user management', () => {

        const badRequest = (url, data, error) =>
            request
                .post(url)
                .send(data)
                .then(
                    () => { throw new Error('status should not be ok'); },
                    res => {
                        assert.deepEqual(res.status, 400);
                        assert.equal(res.response.body.error, error);
                    }
                );
        
        it('signup requires username', () => {
            badRequest('/auth/signup', {password: 'asdf'}, 'username and password must be provided')
        })
    })

})