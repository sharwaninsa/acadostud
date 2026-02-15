const UserDocumentsModel = require('../models/userDocuments.model');
const { getUserPublicIP } = require('../utils/ip.util');
const { getUserAgent } = require('../utils/navigator.util');

const UserDocumentsService = {
  async createDocuments(req, body) {
    const {
      user_id, user_email, aadhar_number, pan_number, aadhar_path,
      pan_path, educational_documents_path, user_photo
    } = body;
    const ip_address = await getUserPublicIP();
    const navigator = getUserAgent(req);
    const created_by = 'System';

    const documents = await UserDocumentsModel.create({
      user_id, user_email, aadhar_number, pan_number, aadhar_path,
      pan_path, educational_documents_path, user_photo,
      created_by, ip_address, navigator
    });
    return documents;
  },

  async getDocumentsByUser(userId) {
    const documents = await UserDocumentsModel.findByUser(userId);
    if (!documents) throw new Error('User documents not found');
    return documents;
  },

  async updateDocuments(documentId, body, req) {
    const {
      aadhar_number, pan_number, aadhar_path, pan_path,
      educational_documents_path, user_photo
    } = body;
    const ip_address = await getUserPublicIP();
    const navigator = getUserAgent(req);
    const updated_by = 'System';

    const updated = await UserDocumentsModel.update(documentId, {
      aadhar_number, pan_number, aadhar_path, pan_path,
      educational_documents_path, user_photo, updated_by, ip_address, navigator
    });
    if (!updated) throw new Error('User documents not found');
    return updated;
  },

  async deleteDocuments(documentId) {
    const deleted = await UserDocumentsModel.delete(documentId);
    if (!deleted) throw new Error('User documents not found');
    return deleted;
  }
};

module.exports = UserDocumentsService;