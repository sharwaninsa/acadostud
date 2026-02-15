const UserDocumentsService = require('../services/userDocuments.service');

const UserDocumentsController = {
  async createDocuments(req, res, next) {
    try {
      const documents = await UserDocumentsService.createDocuments(req, req.body);
      res.status(201).json({
        message: 'User documents created successfully',
        documents
      });
    } catch (error) {
      next(error);
    }
  },

  async getDocuments(req, res, next) {
    try {
      const documents = await UserDocumentsService.getDocumentsByUser(req.params.userId);
      res.json(documents);
    } catch (error) {
      next(error);
    }
  },

  async updateDocuments(req, res, next) {
    try {
      const updated = await UserDocumentsService.updateDocuments(req.params.documentId, req.body, req);
      res.json({
        message: 'User documents updated successfully',
        documents: updated
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteDocuments(req, res, next) {
    try {
      await UserDocumentsService.deleteDocuments(req.params.documentId);
      res.json({ message: 'User documents deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = UserDocumentsController;