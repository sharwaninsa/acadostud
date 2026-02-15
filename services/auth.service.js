const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');
const LogModel = require('../models/log.model');
const { getUserPublicIP } = require('../utils/ip.util');

const AuthService = {
  async signin(req, credentials) {
    const { user_email, user_password } = credentials;

    const user = await UserModel.findByEmail(user_email);
    if (!user) throw new Error('Invalid email or password');

    const validPassword = await bcrypt.compare(user_password, user.user_password);
    if (!validPassword) throw new Error('Invalid email or password');

    // Create a simple token (in production use JWT)
    const token = Buffer.from(`${user.user_id}-${Date.now()}`).toString('base64');

    // Remove password from user object
    delete user.user_password;

    // Create login log
    const ip_address = await getUserPublicIP();
    await LogModel.create({
      user_id: user.user_id,
      user_email: user.user_email,
      user_activity: 'User Logged In',
      user_activity_duration: '0',
      start_ip: ip_address,
      end_ip: ip_address
    });

    return { user, token };
  }
};

module.exports = AuthService;