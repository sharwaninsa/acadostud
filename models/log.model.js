const pool = require('../config/db');

const LogModel = {
  async create({ user_id, user_email, user_activity, user_activity_duration, start_ip, end_ip }) {
    const query = `
      INSERT INTO user_logs 
        (user_id, user_email, user_activity, user_activity_duration, user_activity_start_ip, user_activity_end_ip, user_activity_time)
      VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
      RETURNING *
    `;
    const values = [user_id, user_email, user_activity, user_activity_duration, start_ip, end_ip];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findAll() {
    const query = `SELECT * FROM user_logs ORDER BY user_activity_time DESC`;
    const result = await pool.query(query);
    return result.rows;
  },

  async findByUser(userId) {
    const query = `SELECT * FROM user_logs WHERE user_id = $1 ORDER BY user_activity_time DESC`;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }
};

module.exports = LogModel;