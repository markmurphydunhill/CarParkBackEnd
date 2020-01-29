'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;


const parkingSchema = new Schema({

    carReg: String,
    status: Boolean,
    carEnterDate: Date,
    carExitDate: Date
});

module.exports = Mongoose.model('Parking', parkingSchema);