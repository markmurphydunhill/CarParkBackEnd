'use strict';

const assert = require('chai').assert;
const ParkingService = require('./parkings-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('User API tests', function() {
    let users = fixtures.users;
    let newUser = fixtures.newUser;

    const parkingService = new ParkingService(fixtures.parkingService);

    suiteSetup(async function() {
        await parkingService.deleteAllUsers();
        const returnedUser = await parkingService.createUser(newUser);
        const response = await parkingService.authenticate(newUser);
    });

    suiteTeardown(async function() {
        await parkingService.deleteAllUsers();
        parkingService.clearAuth();
    });

    test('create a user', async function() {
        const returnedUser = await parkingService.createUser(newUser);
        assert(_.some([returnedUser], newUser), 'returnedUser must be a superset of newUser');
        assert.isDefined(returnedUser._id);
    });

    test('get user', async function() {
        const u1 = await parkingService.createUser(newUser);
        const u2 = await parkingService.getUser(u1._id);
        assert.deepEqual(u1, u2);
    });

    test('get invalid user', async function() {
        const u1 = await parkingService.getUser('1234');
        assert.isNull(u1);
        const u2 = await parkingService.getUser('012345678901234567890123');
        assert.isNull(u2);
    });

    test('delete a user', async function() {
        let u = await parkingService.createUser(newUser);
        assert(u._id != null);
        await parkingService.deleteOneUser(u._id);
        u = await parkingService.getUser(u._id);
        assert(u == null);
    });

    test('get all users', async function() {
        await parkingService.deleteAllUsers();
        await parkingService.createUser(newUser);
        await parkingService.authenticate(newUser);
        for (let u of users) {
            await parkingService.createUser(u);
        }

        const allUsers = await parkingService.getUsers();
        assert.equal(allUsers.length, users.length + 1);
    });

    test('get users detail', async function() {
        await parkingService.deleteAllUsers();
        const user = await parkingService.createUser(newUser);
        await parkingService.authenticate(newUser);
        for (let u of users) {
            await parkingService.createUser(u);
        }

        const testUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        };
        users.unshift(testUser);
        const allUsers = await parkingService.getUsers();
        for (var i = 0; i < users.length; i++) {
            assert(_.some([allUsers[i]], users[i]), 'returnedUser must be a superset of newUser');
        }
    });

    test('get all users empty', async function() {
        await parkingService.deleteAllUsers();
        const user = await parkingService.createUser(newUser);
        await parkingService.authenticate(newUser);
        const allUsers = await parkingService.getUsers();
        assert.equal(allUsers.length, 1);
    });
});