const pool = require('../config/db');

const SessionModel = {
  async create({ user_id, user_email, ip_address, navigator, login_status, login_method, session_time, logged_out_at }) {
    const query = `
      INSERT INTO user_sessions 
        (user_id, user_email, user_login_ip, user_login_navigator, user_login_status,
         user_login_method, user_session_time, user_logged_out_at, fk_user)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $1)
      RETURNING *
    `;
    const values = [user_id, user_email, ip_address, navigator, login_status, login_method, session_time, logged_out_at];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findActive() {
    const query = `SELECT * FROM user_sessions WHERE user_login_status = 'Active' ORDER BY user_login_date DESC`;
    const result = await pool.query(query);
    return result.rows;
  },

  async logout(userId, logged_out_at) {
    const query = `
      UPDATE user_sessions
      SET user_login_status = 'Logged Out', user_logged_out_at = $1
      WHERE user_id = $2 AND user_login_status = 'Active'
      RETURNING *
    `;
    const values = [logged_out_at, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
};

module.exports = SessionModel;