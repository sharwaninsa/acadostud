const pool = require('../config/db');

const SalaryModel = {
  async create({
    user_id, user_email, basic_pay, epf_deduction, esic_deduction,
    travel_allowances, house_rent_allowances, dearness_allowances,
    other_allowances, net_salary, salary_period
  }) {
    const query = `
      INSERT INTO user_salary 
        (user_id, user_email, basic_pay, epf_deduction, esic_deduction, travel_allowances,
         house_rent_allowances, dearness_allowances, other_allowances, net_salary, salary_period, fk_user)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $1)
      RETURNING *
    `;
    const values = [
      user_id, user_email, basic_pay, epf_deduction, esic_deduction,
      travel_allowances, house_rent_allowances, dearness_allowances,
      other_allowances, net_salary, salary_period
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByUser(userId) {
    const query = `SELECT * FROM user_salary WHERE user_id = $1`;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  },

  async update(userId, {
    basic_pay, epf_deduction, esic_deduction, travel_allowances,
    house_rent_allowances, dearness_allowances, other_allowances,
    net_salary, salary_period
  }) {
    const query = `
      UPDATE user_salary
      SET basic_pay = $1, epf_deduction = $2, esic_deduction = $3,
          travel_allowances = $4, house_rent_allowances = $5,
          dearness_allowances = $6, other_allowances = $7,
          net_salary = $8, salary_period = $9, salary_disbursal_date = CURRENT_TIMESTAMP
      WHERE user_id = $10
      RETURNING *
    `;
    const values = [
      basic_pay, epf_deduction, esic_deduction, travel_allowances,
      house_rent_allowances, dearness_allowances, other_allowances,
      net_salary, salary_period, userId
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
};

module.exports = SalaryModel;