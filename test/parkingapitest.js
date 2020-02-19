'use strict';

const assert = require('chai').assert;
const ParkingService = require('./parkings-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Parking API tests', function () {

    let parkings = fixtures.parkings;
    let newParking = fixtures.newParking;
    let newUser = fixtures.newUser;

    const parkingService = new ParkingService('http://localhost:3001');

    suiteSetup(async function() {
        await parkingService.deleteAllUsers();
        const returnedUser = await parkingService.createUser(newUser);
        const response = await parkingService.authenticate(newUser);
    });

    suiteTeardown(async function() {
        await parkingService.deleteAllUsers();
        parkingService.clearAuth();
    });

    setup(async function () {
        await parkingService.deleteAllParkings();
    });

    teardown(async function () {
        await parkingService.deleteAllParkings();
    });


    test('create a parking event', async function () {
        //console.log(newParking);
        const returnedParking = await parkingService.createParking(newParking);
       // console.log(returnedParking);
        assert.equal(returnedParking.carReg, newParking.carReg);
        //assert.equal(returnedCandidate.lastName, newCandidate.lastName);
        // assert.equal(returnedCandidate.office, newCandidate.office);
        assert.isDefined(returnedParking._id);

    });

    test('get parking event', async function () {
        const c1 = await parkingService.createParking(newParking);
        const c2 = await parkingService.getParking(c1._id);
        assert.deepEqual(c1, c2);
    });

    test('get invalid parking event', async function () {
        const c1 = await parkingService.getParking('1234');
        assert.isNull(c1);
        const c2 = await parkingService.getParking('012345678901234567890123');
        assert.isNull(c2);
    });

    test('delete a parking event', async function () {
        let c = await parkingService.createParking(newParking);
        assert(c._id != null);
        //console.log(c);
        await parkingService.deleteOneParking(c._id);

        c = await parkingService.getParking(c._id);
        assert(c == null);
    });

    test('get all parking events', async function () {
        for (let c of parkings) {
            await parkingService.createParking(c);
        }

        const allParkings = await parkingService.getParkings();
        assert.equal(allParkings.length, parkings.length);
    });
});

