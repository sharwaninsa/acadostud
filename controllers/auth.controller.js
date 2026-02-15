const AuthService = require('../services/auth.service');

const AuthController = {
  async signin(req, res, next) {
    try {
      const result = await AuthService.signin(req, req.body);
      res.json({
        message: 'Login successful',
        user: result.user,
        token: result.token
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = AuthController;