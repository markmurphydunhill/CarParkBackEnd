'use strict';

const Parking = require('./app/controllers/parkingRecord');
const Accounts = require('./app/controllers/accounts');

module.exports = [

        { method: 'GET', path: '/', config: Accounts.index },
        { method: 'GET', path: '/signup', config: Accounts.showSignup },
        { method: 'GET', path: '/login', config: Accounts.showLogin },
        { method: 'GET', path: '/logout', config: Accounts.logout },
        { method: 'POST', path: '/signup', config: Accounts.signup },
        { method: 'POST', path: '/login', config: Accounts.login },

        { method: 'GET', path: '/home', config: Parking.home },
        { method: 'GET', path: '/report', config: Parking.report },

        { method: 'POST', path: '/enterCar', config: Parking.carExit},
         {method: 'GET', path: '/{param*}',
        handler: {
            directory: {
                path: './public'
            }
            },
        options: {auth:false}
    }
];