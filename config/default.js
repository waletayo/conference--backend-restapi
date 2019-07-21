'use strict';
require('dotenv').config();
module.exports = {
    app: {
        name: "intelchub-junior-test",
        superSecret: "power",
        baseUrl: `http://localhost:`,
        port: process.env.PORT,
        expiresIn: 86400

    },

    api: {
        prefix: '^/api/v[1-9]',
        version: [1],
        lang: 'en',
        pagination: {
            itemsPerPage: 10
        },
    },
    database: {
        url: process.env.DB_URL,
        url_test: process.env.DB_URL_test,

    }
};
