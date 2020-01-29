
'use strict';

const Parking = require('../models/parking');


const ParkingRecord = {
    home: {
        handler: function(request, h) {
            return h.view('home', { title: 'Car Enters' });
        }
    },
   /* report: {
        handler: function(request, h) {
            return h.view('report', {
                title: 'Cars Entered',
                parking: this.parking
            });
        }
    },*/

    report: {
        handler: async function(request, h) {
            const parking = await Parking.find()
            console.log(parking);

            return h.view('report', {
                title: 'Cars Entered',
                parking: parking
            });
        }
    },
  /*  donate: {
        handler: async function(request, h) {
            const data = request.payload;
            const newDonation = new Donation({
                amount: data.amount,
                method: data.method
            });
            await newDonation.save();
            return h.redirect('/report');
        }
    }
};*/

    carEnter: {
        handler: async function(request, h) {
            const data = request.payload;
            const enterDate  = new Date();
            const parkingStatus = true;

           // const enterDate = getDate();
            const newParking = new Parking({
                carReg: data.carReg,
                carEnterDate: enterDate,
                status: parkingStatus
            });
            //const status = true;
            // cars.status = status;
            await newParking.save();
            return h.redirect('/report');
        }
    },

    carExit: {
        handler: async function(request, h) {
            const carLeaving = request.payload.carReg;
            console.log(carLeaving);

            const exitDate  = new Date();
            const parkingStatus = false;

            const car = await Parking.findOne({carReg: carLeaving});
            console.log(car);

            car.carExitDate = exitDate;
            car.status = parkingStatus;
            await car.save();
            return h.redirect('/report');
        }

    }
};


module.exports = ParkingRecord;