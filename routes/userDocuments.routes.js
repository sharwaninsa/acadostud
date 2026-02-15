const express = require('express');
const UserDocumentsController = require('../controllers/userDocuments.controller');
const router = express.Router();

router.post('/createUserDocuments', UserDocumentsController.createDocuments);
router.get('/getUserDocuments/:userId', UserDocumentsController.getDocuments);
router.put('/updateUserDocuments/:documentId', UserDocumentsController.updateDocuments);
router.delete('/deleteUserDocuments/:documentId', UserDocumentsController.deleteDocuments);

module.exports = router;