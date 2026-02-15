const AttendanceModel = require('../models/attendance.model');
const { getUserPublicIP } = require('../utils/ip.util');
const { getUserAgent } = require('../utils/navigator.util');

const AttendanceService = {
  async createAttendance(req, body) {
    const { user_id, attendance_date, attendance_status, reason } = body;
    const ip_address = await getUserPublicIP();
    const navigator = getUserAgent(req);
    const marked_by = 'System'; // Could be dynamic based on logged-in user

    const attendance = await AttendanceModel.create({
      user_id,
      attendance_date,
      attendance_status,
      reason,
      ip_address,
      navigator,
      marked_by
    });
    return attendance;
  },

  async getAllAttendance() {
    return await AttendanceModel.findAll();
  },

  async getAttendanceByUser(userId) {
    return await AttendanceModel.findByUser(userId);
  },

  async updateAttendance(attendanceKey, updateData) {
    const attendance = await AttendanceModel.update(attendanceKey, updateData);
    if (!attendance) throw new Error('Attendance record not found');
    return attendance;
  },

  async deleteAttendance(attendanceKey) {
    const deleted = await AttendanceModel.delete(attendanceKey);
    if (!deleted) throw new Error('Attendance record not found');
    return deleted;
  }
};

module.exports = AttendanceService;