const express = require('express');
const AuthController = require('../controllers/auth.controller');
const router = express.Router();

router.post('/signin', AuthController.signin);

module.exports = router;