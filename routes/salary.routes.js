const express = require('express');
const SalaryController = require('../controllers/salary.controller');
const router = express.Router();

router.post('/createSalary', SalaryController.createSalary);
router.get('/getSalary/:userId', SalaryController.getSalary);
router.put('/updateSalary/:userId', SalaryController.updateSalary);

module.exports = router;