const Parkings = require('./app/api/parkings');
const Users = require ('./app/api/users')

module.exports = [
    { method: 'GET', path: '/api/parkings', config: Parkings.find },
    { method: 'GET', path: '/api/parkingPresent', config: Parkings.findPresent },
    { method: 'GET', path: '/api/carHistory/{id}', config: Parkings.findCar },
    { method: 'POST', path: '/api/carEntry', config: Parkings.carEnter },
    { method: 'POST', path: '/api/carExit', config: Parkings.carExit },
    { method: 'DELETE', path: '/api/deleteParking/{id}', config: Parkings.deleteOneParking },

    { method: 'GET', path: '/api/users', config: Users.find },
    { method: 'GET', path: '/api/users/{id}', config: Users.findOne },
    { method: 'POST', path: '/api/createuser', config: Users.createUser },
    { method: 'DELETE', path: '/api/deleteuser/{id}', config: Users.deleteOne },
    { method: 'DELETE', path: '/api/deleteusers', config: Users.deleteAll },
    { method: 'POST', path: '/api/users/authenticate', config: Users.authenticate }

];