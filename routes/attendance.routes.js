const express = require('express');
const AttendanceController = require('../controllers/attendance.controller');
const router = express.Router();

router.post('/createAttendance', AttendanceController.createAttendance);
router.get('/listAttendance', AttendanceController.listAttendance);
router.get('/getAttendanceByUser/:userId', AttendanceController.getAttendanceByUser);
router.put('/updateAttendance/:attendanceKey', AttendanceController.updateAttendance);
router.delete('/deleteAttendance/:attendanceKey', AttendanceController.deleteAttendance);

module.exports = router;