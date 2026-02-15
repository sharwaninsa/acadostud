const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');
const { getUserPublicIP } = require('../utils/ip.util');

const UserService = {
  async createUser(userData) {
    const { user_name, user_email, user_password, user_role } = userData;
    const hashed_password = await bcrypt.hash(user_password, 10);
    const ip_address = await getUserPublicIP(); // Note: this fetches server IP, not client. In production use req.ip.

    const newUser = await UserModel.create({
      user_name,
      user_email,
      hashed_password,
      user_role,
      ip_address,
      created_by: 'Super admin'
    });
    return newUser;
  },

  async getAllUsers() {
    return await UserModel.findAll();
  },

  async getUserById(userId) {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error('User not found');
    return user;
  },

  async updateUser(userId, userData) {
    const { user_name, user_email, user_password, user_role } = userData;
    let hashed_password;
    if (user_password) {
      hashed_password = await bcrypt.hash(user_password, 10);
    }
    const updatedUser = await UserModel.update(userId, {
      user_name,
      user_email,
      hashed_password,
      user_role
    });
    if (!updatedUser) throw new Error('User not found');
    return updatedUser;
  },

  async deleteUser(userId) {
    const deleted = await UserModel.delete(userId);
    if (!deleted) throw new Error('User not found');
    return deleted;
  }
};

module.exports = UserService;