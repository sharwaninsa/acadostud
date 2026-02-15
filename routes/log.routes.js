const express = require('express');
const LogController = require('../controllers/log.controller');
const router = express.Router();

router.post('/createUserLog', LogController.createLog);
router.get('/listUserLogs', LogController.listLogs);
router.get('/getUserLogs/:userId', LogController.getLogsByUser);

module.exports = router;