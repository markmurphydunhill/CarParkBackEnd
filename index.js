'use strict';

const Hapi = require('hapi');

const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    console.log(result.error.message);
    process.exit(1);
}

const server = Hapi.server({
    port: 3001,
    host: 'localhost'
});

require('./app/models/db');


async function init() {
    await server.register(require('inert'));
    await server.register(require('vision'));
    await server.register(require('hapi-auth-cookie'));

    server.views({
        engines: {
            hbs: require('handlebars'),
        },
        relativeTo: __dirname,
        path: './app/views',
        layoutPath: './app/views/layouts',
        partialsPath: './app/views/partials',
        layout: true,
        isCached: false,
    });




    server.route(require('./routes'));
    server.route(require('./routeapi'));
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}


process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});




init();