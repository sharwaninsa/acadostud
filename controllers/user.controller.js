const UserService = require('../services/user.service');

const UserController = {
  async createUser(req, res, next) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json({
        message: 'User has been registered successfully.',
        user: newUser
      });
    } catch (error) {
      next(error);
    }
  },

  async listUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  async getUser(req, res, next) {
    try {
      const user = await UserService.getUserById(req.params.userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async updateUser(req, res, next) {
    try {
      const updatedUser = await UserService.updateUser(req.params.userId, req.body);
      res.json({
        message: 'User updation has been successful',
        user: updatedUser
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req, res, next) {
    try {
      await UserService.deleteUser(req.params.userId);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = UserController;