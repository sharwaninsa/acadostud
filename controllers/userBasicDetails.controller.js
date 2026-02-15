const UserBasicDetailsService = require('../services/userBasicDetails.service');

const UserBasicDetailsController = {
  async createDetails(req, res, next) {
    try {
      const details = await UserBasicDetailsService.createDetails(req, req.body);
      res.status(201).json({
        message: 'User basic details created successfully',
        details
      });
    } catch (error) {
      next(error);
    }
  },

  async getDetails(req, res, next) {
    try {
      const details = await UserBasicDetailsService.getDetailsByUser(req.params.userId);
      res.json(details);
    } catch (error) {
      next(error);
    }
  },

  async updateDetails(req, res, next) {
    try {
      const updated = await UserBasicDetailsService.updateDetails(req, req.params.userId, req.body);
      res.json({
        message: 'User details updated successfully',
        details: updated
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = UserBasicDetailsController;