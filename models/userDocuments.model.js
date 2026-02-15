const pool = require('../config/db');

const UserDocumentsModel = {
  async create({
    user_id, user_email, aadhar_number, pan_number, aadhar_path,
    pan_path, educational_documents_path, user_photo, created_by, ip_address, navigator
  }) {
    const query = `
      INSERT INTO users_documents 
        (user_id, user_email, aadhar_number, pan_number, aadhar_path, pan_path,
         educational_documents_path, user_photo, data_created_by, data_updated_by,
         data_creation_ip, data_updation_ip, data_creation_navigator, data_updation_navigator)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $9, $10, $10, $11, $11)
      RETURNING *
    `;
    const values = [
      user_id, user_email, aadhar_number, pan_number, aadhar_path,
      pan_path, educational_documents_path, user_photo, created_by, ip_address, navigator
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByUser(userId) {
    const query = `SELECT * FROM users_documents WHERE user_id = $1`;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  },

  async update(documentId, {
    aadhar_number, pan_number, aadhar_path, pan_path,
    educational_documents_path, user_photo, updated_by, ip_address, navigator
  }) {
    const query = `
      UPDATE users_documents
      SET aadhar_number = $1, pan_number = $2, aadhar_path = $3,
          pan_path = $4, educational_documents_path = $5, user_photo = $6,
          data_updated_by = $7, data_updation_ip = $8, data_updation_navigator = $9,
          data_updation_date = CURRENT_TIMESTAMP
      WHERE document_id = $10
      RETURNING *
    `;
    const values = [
      aadhar_number, pan_number, aadhar_path, pan_path,
      educational_documents_path, user_photo, updated_by, ip_address, navigator, documentId
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async delete(documentId) {
    const query = `DELETE FROM users_documents WHERE document_id = $1 RETURNING *`;
    const result = await pool.query(query, [documentId]);
    return result.rows[0];
  }
};

module.exports = UserDocumentsModel;