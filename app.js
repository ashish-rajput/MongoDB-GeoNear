

const express = require('express');
const http = require('http');
const cors = require('cors');

// load the env variables
require('dotenv').config();

const { APP_CONFIG, DB_CONFIG } = require('./config');

//create an express app
const app = express();

// unlock cors policy
app.use(cors({origin : true}));

// port to use in the app
app.set('port', APP_CONFIG.PORT);




// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhostL:8000/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

/**
 * Basic middlerWares
 * `logger` to print the http req, res logs
 * `express.json` for parsing the json body data
 * `express.urlencoded` for reach parsing of form body data
 */

app.use(APP_CONFIG.logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// fallback for 404 or other routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: `${req.path} not found`,
    });
});

startServer();

async function startServer(){

    await DB_CONFIG.connectDB();

    const server = http.createServer(app);

    server.listen(APP_CONFIG.PORT);

    server.on('error', (err) => console.error(err));

    server.on('listening', () => console.log(`Server running on ${APP_CONFIG.PORT}`));

}