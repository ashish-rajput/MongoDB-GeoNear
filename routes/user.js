const express = require('express');
const router = express.Router();

const USER = require('../controllers/user.controller');

router.post('/nearest-pump', USER.nearestPumpList);

module.exports = router;
