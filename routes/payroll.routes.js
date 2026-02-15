const express = require('express');
const PayrollController = require('../controllers/payroll.controller');
const router = express.Router();

router.post('/createPayroll', PayrollController.createPayroll);
router.get('/listPayroll', PayrollController.listPayroll);
router.get('/getPayrollByUser/:userId', PayrollController.getPayrollByUser);
router.put('/updatePayroll/:payrollId', PayrollController.updatePayroll);

module.exports = router;