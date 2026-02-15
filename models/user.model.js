const pool = require('../config/db');

const UserModel = {
  async create({ user_name, user_email, hashed_password, user_role, ip_address, created_by }) {
    const query = `
      INSERT INTO users 
        (user_name, user_email, user_password, user_role, user_creation_ip, user_created_by, user_creation_date, user_updation_date)
      VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING user_id, user_name, user_email, user_role, user_creation_date
    `;
    const values = [user_name, user_email, hashed_password, user_role, ip_address, created_by];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findAll() {
    const query = `
      SELECT user_id, user_name, user_email, user_role, user_creation_date
      FROM users
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  async findById(userId) {
    const query = `
      SELECT user_id, user_name, user_email, user_role, user_creation_date
      FROM users
      WHERE user_id = $1
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  },

  async findByEmail(email) {
    const query = `SELECT * FROM users WHERE user_email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  async update(userId, { user_name, user_email, hashed_password, user_role }) {
    let query, values;
    if (hashed_password) {
      query = `
        UPDATE users
        SET user_name = $1, user_email = $2, user_password = $3, user_role = $4, user_updation_date = CURRENT_TIMESTAMP
        WHERE user_id = $5
        RETURNING user_id, user_name, user_email, user_role, user_updation_date
      `;
      values = [user_name, user_email, hashed_password, user_role, userId];
    } else {
      query = `
        UPDATE users
        SET user_name = $1, user_email = $2, user_role = $3, user_updation_date = CURRENT_TIMESTAMP
        WHERE user_id = $4
        RETURNING user_id, user_name, user_email, user_role, user_updation_date
      `;
      values = [user_name, user_email, user_role, userId];
    }
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async delete(userId) {
    const query = `DELETE FROM users WHERE user_id = $1 RETURNING user_id`;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }
};

module.exports = UserModel;