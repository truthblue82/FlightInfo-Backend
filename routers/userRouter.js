const express = require('express');

const { signup, login, getUserByEmail } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.get('/:email', getUserByEmail);
router.post('/login', login);

module.exports = router;
