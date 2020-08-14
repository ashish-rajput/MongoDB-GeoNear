/**
 * The file must imports all the configurations present in this
 * `config` dir and export those for further handling
 */

const APP_CONFIG = require('./app.config');
const DB_CONFIG = require('./db.config');
const MULTER_CONFIG = require('./multer.config');

module.exports = {
    APP_CONFIG,
    DB_CONFIG,
    MULTER_CONFIG,
};