

'use strict';

const assert = require('chai').assert;
const ParkingService = require('./parkings-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Parking API tests', function () {

    let parkings = fixtures.parkings;
    let newParking = fixtures.newParking;

    const parkingService = new ParkingService('http://localhost:3001');



    setup(async function () {
        await parkingService.deleteAllParkings();
    });

    teardown(async function () {
        await parkingService.deleteAllParkings();
    });

    test('create a parking event', async function () {
        //console.log(newParking);
        const returnedParking = await parkingService.createParking(newParking);
        //console.log(returnedParking);
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

/*

suite('Parking API tests', function () {

    test('get all parking events', async function () {
        const response = await axios.get('http://localhost:3001/api/parkings');
        const parkings = response.data;
        assert.equal(4, parkings.length);

        assert.equal(parkings[0].carReg, '08w2207');
        assert.equal(parkings[0].status, false);

        assert.equal(parkings[1].carReg, '08c24454');
        assert.equal(parkings[1].status, false);
    });

    test('get one parking event', async function () {
        let response = await axios.get('http://localhost:3001/api/parkings');
        const parkings = response.data;
        assert.equal(4, parkings.length);

        const oneParkingUrl = 'http://localhost:3001/api/carHistory/' + parkings[0].carReg

        response = await axios.get(oneParkingUrl);

       const oneParking = response.data;
        console.log(oneParking);

        assert.equal(oneParking[0].carReg, '08w2207');
        assert.equal(oneParking[0].status, false);

    });

    test('create a parking event', async function () {
        const parkingUrl = 'http://localhost:3001/api/carEntry';
        const newParking = {
            "carReg": "08g87678",
            "status": false,
            "carEnterDate": "",
            "carExitDate": ""
        };

        const response = await axios.post(parkingUrl, newParking);
        const returnedParking = response.data;
        assert.equal(201, response.status);

        assert.equal(returnedParking.carReg, '08g87678');
        assert.equal(returnedParking.status, true);
    });

});*/