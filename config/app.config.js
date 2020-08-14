/**
 * This file is used to set the configurations for express app.
 * All kinds of init, bootstrap and express app specific logic
 * should be mention here.
 */

// logger middlerware
const logger = require('morgan');

// port to use in the server
const PORT = process.env.PORT || 8090;

module.exports = {
    PORT,
    logger: logger('dev'),
};
