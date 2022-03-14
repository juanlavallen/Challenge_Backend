const { Router } = require('express');
const { authRegister, authLogin } = require('../controllers/auth');
const router = Router();

// REGISTER
router.post('/register', authRegister);

// LOGIN
router.post('/login', authLogin);

module.exports = router;