const pool = require('../config/db');

const AttendanceModel = {
  async create({ user_id, attendance_date, attendance_status, reason, ip_address, navigator, marked_by }) {
    const query = `
      INSERT INTO user_attendance 
        (user_id, attendance_date, attendance_status, reason, user_attendance_ip, user_attendance_navigator, user_attendance_marked_by, user_attendanve_marked_on)
      VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)
      RETURNING *
    `;
    const values = [user_id, attendance_date, attendance_status, reason, ip_address, navigator, marked_by];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findAll() {
    const query = `SELECT * FROM user_attendance ORDER BY attendance_key DESC`;
    const result = await pool.query(query);
    return result.rows;
  },

  async findByUser(userId) {
    const query = `SELECT * FROM user_attendance WHERE user_id = $1 ORDER BY attendance_date DESC`;
    const result = await pool.query(query, [userId]);
    return result.rows;
  },

  async update(attendanceKey, { attendance_status, reason }) {
    const query = `
      UPDATE user_attendance
      SET attendance_status = $1, reason = $2
      WHERE attendance_key = $3
      RETURNING *
    `;
    const values = [attendance_status, reason, attendanceKey];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async delete(attendanceKey) {
    const query = `DELETE FROM user_attendance WHERE attendance_key = $1 RETURNING *`;
    const result = await pool.query(query, [attendanceKey]);
    return result.rows[0];
  }
};

module.exports = AttendanceModel;