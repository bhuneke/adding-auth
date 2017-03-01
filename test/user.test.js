const User = require('../lib/models/user');
const testInvalid = require('./test-invalid');
const assert = require('chai').assert;

describe('user model', () => {

    it('invalid without username', () => {
        return testInvalid({password: 'asdf'});
    });

    it('invalid without password', () => {
        return testInvalid({username: 'name'});
    });

    it('valid with username and password', () => {
        return new User({username: 'name', password: 'asdf'}).validate();
    });

    it('sets hash from password and correctly compares', () => {
        const data = {username: 'name', password: 'asdf'};
        const user = new User(data);

        assert.isUndefined(user.password);
        assert.notEqual(user.hash, data.password);
        assert.isTrue(user.comparePassword('asdf'));
        assert.isFalse(user.comparePassword('wrong'));
    });

});
