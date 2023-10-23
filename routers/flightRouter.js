const express = require('express');

const { addFlight } = require('../controllers/flightController');

const router = express.Router();

router.post('/', addFlight);

module.exports = router;
