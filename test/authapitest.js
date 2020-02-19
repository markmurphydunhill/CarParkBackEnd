'use strict';

const assert = require('chai').assert;
const ParkingService = require('./parkings-service');
const fixtures = require('./fixtures.json');
const utils = require('../app/api/utils.js');

suite('Parking API tests', function () {

    let users = fixtures.users;
    let newUser = fixtures.newUser;


    const parkingService = new ParkingService(fixtures.parkingService);

    //console.log(newUser);

    setup(async function () {
        await parkingService.deleteAllUsers();
    });


    test('authenticate', async function () {
    });

    test('authenticates', async function () {
        const returnedUser = await parkingService.createUser(newUser);
        const response = await parkingService.authenticate(newUser);
        console.log(response);
        assert(response.success);
        assert.isDefined(response.token);
    });

    test('verify Token', async function () {
        const returnedUser = await parkingService.createUser(newUser);
        const response = await parkingService.authenticate(newUser);

        const userInfo = utils.decodeToken(response.token);
        assert.equal(userInfo.email, returnedUser.email);
        assert.equal(userInfo.userId, returnedUser._id);
    });
});