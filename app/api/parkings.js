'use strict';

const Parking = require('../models/parking');
const Boom = require('boom');

const Parkings
    = {

    find: {
        auth: {
                strategy: 'jwt',
            },
        handler: async function(request, h) {
            const parkings = await Parking.find();
            return parkings;
        }
    },

    findOneParking: {
        auth: {
            strategy: 'jwt',
        },
        handler: async function(request, h) {
            try {
                const parking = await Parking.findOne({ _id: request.params.id });
                if (!parking) {
                    return Boom.notFound('No Parking Event with this id');
                }
                return parking;
            } catch (err) {
                return Boom.notFound('No Event with this id');
            }
        }
    },

    findPresent:  {
        auth: {
            strategy: 'jwt',
        },
        handler: async function(request, h) {
            const parkings = await Parking.find({ status: true });

            return parkings;
        }
    },

    findNumberPresent:  {
        auth: {
            strategy: 'jwt',
        },
        handler: async function(request, h) {
            const parkings = await Parking.find({ status: true });
            const number = parkings.length;

            return number;
        }
    },

     findCar: {
         auth: {
             strategy: 'jwt',
         },
        handler: async function(request, h) {
            try {
                const parkings = await Parking.find({ carReg: request.params.id });
                if (!parkings) {
                    return Boom.notFound('No User with this id');
                }
                return parkings;
            } catch (err) {
                return Boom.notFound('No User with this id');
            }
        }
    },

    carEnter: {
        auth: {
            strategy: 'jwt',
        },
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
            if (newParking) {
                return h.response(newParking).code(201);
            }
            return Boom.badImplementation('error creating parking event');
        }
    },

    carExit: {
        auth: {
            strategy: 'jwt',
        },

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
            if (carLeaving) {
                return h.response(carLeaving).code(201);
            }
            return Boom.badImplementation('error creating parking event');
        }
    },

    deleteOneParking: {
        auth: false,
        //auth: {
          //  strategy: 'jwt',
        //},
        handler: async function(request, h) {
            const response = await Parking.deleteOne({ _id: request.params.id });
            if (response.deletedCount == 1) {
                return { success: true };
            }
            return Boom.notFound('Island not found');
        }
    },

    deleteAllParkings: {
        auth: false,
        //auth: {
         //   strategy: 'jwt',
       // },
        handler: async function(request, h) {
            await Parking.deleteMany({});
            return { success: true };
        }
    },

};

module.exports = Parkings;