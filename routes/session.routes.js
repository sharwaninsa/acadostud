const express = require('express');
const SessionController = require('../controllers/session.controller');
const router = express.Router();

router.post('/createSession', SessionController.createSession);
router.get('/getActiveSessions', SessionController.getActiveSessions);
router.put('/logoutSession/:userId', SessionController.logoutSession);

module.exports = router;