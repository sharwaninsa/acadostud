const pool = require('../config/db');

const UserBasicDetailsModel = {
  async create({
    user_id, user_email, user_gender, user_dateofbirth, user_fathername,
    user_mothername, user_phone, user_correspondence_address, user_permanent_address,
    user_qualifications_object, user_placeofbirth, ip_address, navigator
  }) {
    const query = `
      INSERT INTO users_basic_details 
        (user_id, user_email, user_gender, user_dateofbirth, user_fathername, user_mothername,
         user_phone, user_correspondence_address, user_permanent_address, user_qualifications_object,
         user_placeofbirth, user_creation_ip, user_updation_ip, user_creation_navigator,
         user_updation_navigator, user_creation_date, user_updation_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $12, $13, $13, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING *
    `;
    const values = [
      user_id, user_email, user_gender, user_dateofbirth, user_fathername,
      user_mothername, user_phone, user_correspondence_address, user_permanent_address,
      user_qualifications_object, user_placeofbirth, ip_address, navigator
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByUser(userId) {
    const query = `SELECT * FROM users_basic_details WHERE user_id = $1`;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  },

  async update(userId, {
    user_gender, user_dateofbirth, user_fathername, user_mothername,
    user_phone, user_correspondence_address, user_permanent_address,
    user_qualifications_object, user_placeofbirth, ip_address, navigator
  }) {
    const query = `
      UPDATE users_basic_details
      SET user_gender = $1, user_dateofbirth = $2, user_fathername = $3,
          user_mothername = $4, user_phone = $5, user_correspondence_address = $6,
          user_permanent_address = $7, user_qualifications_object = $8,
          user_placeofbirth = $9, user_updation_ip = $10, user_updation_navigator = $11,
          user_updation_date = CURRENT_TIMESTAMP
      WHERE user_id = $12
      RETURNING *
    `;
    const values = [
      user_gender, user_dateofbirth, user_fathername, user_mothername,
      user_phone, user_correspondence_address, user_permanent_address,
      user_qualifications_object, user_placeofbirth, ip_address, navigator, userId
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
};

module.exports = UserBasicDetailsModel;