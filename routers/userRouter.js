const express = require('express');

const { signup, login, getUserByEmail, getUserInfo, 
    authEncrypted, verifyEncryptedURL } = require('../controllers/userController');


const router = express.Router();

router.post('/signup', signup);
router.get('/:email', getUserByEmail);
router.post('/login', login);
router.get('/', getUserInfo);
router.post('/link', authEncrypted);
router.post('/verify', verifyEncryptedURL);

module.exports = router;
