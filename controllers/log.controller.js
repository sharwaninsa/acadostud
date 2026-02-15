const LogService = require('../services/log.service');

const LogController = {
  async createLog(req, res, next) {
    try {
      const log = await LogService.createLog(req, req.body);
      res.status(201).json({
        message: 'Log created successfully',
        log
      });
    } catch (error) {
      next(error);
    }
  },

  async listLogs(req, res, next) {
    try {
      const logs = await LogService.getAllLogs();
      res.json(logs);
    } catch (error) {
      next(error);
    }
  },

  async getLogsByUser(req, res, next) {
    try {
      const logs = await LogService.getLogsByUser(req.params.userId);
      res.json(logs);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = LogController;