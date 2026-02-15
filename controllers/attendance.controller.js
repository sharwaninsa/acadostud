const AttendanceService = require('../services/attendance.service');

const AttendanceController = {
  async createAttendance(req, res, next) {
    try {
      const attendance = await AttendanceService.createAttendance(req, req.body);
      res.status(201).json({
        message: 'Attendance marked successfully',
        attendance
      });
    } catch (error) {
      next(error);
    }
  },

  async listAttendance(req, res, next) {
    try {
      const records = await AttendanceService.getAllAttendance();
      res.json(records);
    } catch (error) {
      next(error);
    }
  },

  async getAttendanceByUser(req, res, next) {
    try {
      const records = await AttendanceService.getAttendanceByUser(req.params.userId);
      res.json(records);
    } catch (error) {
      next(error);
    }
  },

  async updateAttendance(req, res, next) {
    try {
      const updated = await AttendanceService.updateAttendance(req.params.attendanceKey, req.body);
      res.json({
        message: 'Attendance updated successfully',
        attendance: updated
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteAttendance(req, res, next) {
    try {
      await AttendanceService.deleteAttendance(req.params.attendanceKey);
      res.json({ message: 'Attendance deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = AttendanceController;