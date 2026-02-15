const express = require('express');
const UserController = require('../controllers/user.controller');
const router = express.Router();

router.post('/createUser', UserController.createUser);
router.get('/listUsers', UserController.listUsers);
router.get('/getUser/:userId', UserController.getUser);
router.put('/updateUser/:userId', UserController.updateUser);
router.delete('/deleteUser/:userId', UserController.deleteUser);

module.exports = router;