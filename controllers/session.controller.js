const SessionService = require('../services/session.service');

const SessionController = {
  async createSession(req, res, next) {
    try {
      const session = await SessionService.createSession(req, req.body);
      res.status(201).json({
        message: 'Session created successfully',
        session
      });
    } catch (error) {
      next(error);
    }
  },

  async getActiveSessions(req, res, next) {
    try {
      const sessions = await SessionService.getActiveSessions();
      res.json(sessions);
    } catch (error) {
      next(error);
    }
  },

  async logoutSession(req, res, next) {
    try {
      const { user_logged_out_at } = req.body;
      const session = await SessionService.logoutSession(req.params.userId, user_logged_out_at);
      res.json({
        message: 'Session ended successfully',
        session: session || {}
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = SessionController;