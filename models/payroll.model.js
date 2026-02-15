const pool = require('../config/db');

const PayrollModel = {
  async create({ user_id, user_email, payroll_date, payroll_amount, payroll_type, payroll_status, issued_by, ip_address, navigator }) {
    const query = `
      INSERT INTO user_payroll 
        (user_id, user_email, payroll_date, payroll_amount, payroll_issued_by, payroll_initiation_ip, payroll_initiation_navigator, payroll_type, payroll_status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const values = [user_id, user_email, payroll_date, payroll_amount, issued_by, ip_address, navigator, payroll_type, payroll_status];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findAll() {
    const query = `SELECT * FROM user_payroll ORDER BY payroll_initiation_date DESC`;
    const result = await pool.query(query);
    return result.rows;
  },

  async findByUser(userId) {
    const query = `SELECT * FROM user_payroll WHERE user_id = $1 ORDER BY payroll_date DESC`;
    const result = await pool.query(query, [userId]);
    return result.rows;
  },

  async updateStatus(payrollId, payroll_status) {
    const query = `
      UPDATE user_payroll
      SET payroll_status = $1, payroll_processed_on = CURRENT_TIMESTAMP
      WHERE payroll_id = $2
      RETURNING *
    `;
    const values = [payroll_status, payrollId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
};

module.exports = PayrollModel;