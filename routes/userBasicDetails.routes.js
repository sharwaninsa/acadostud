const express = require('express');
const UserBasicDetailsController = require('../controllers/userBasicDetails.controller');
const router = express.Router();

router.post('/createUserBasicDetails', UserBasicDetailsController.createDetails);
router.get('/getUserBasicDetails/:userId', UserBasicDetailsController.getDetails);
router.put('/updateUserBasicDetails/:userId', UserBasicDetailsController.updateDetails);

module.exports = router;