const SessionModel = require('../models/session.model');
const { getUserPublicIP } = require('../utils/ip.util');
const { getUserAgent } = require('../utils/navigator.util');

const SessionService = {
  async createSession(req, body) {
    const { user_id, user_email, user_login_status, user_login_method, user_session_time, user_logged_out_at } = body;
    const ip_address = await getUserPublicIP();
    const navigator = getUserAgent(req);

    const session = await SessionModel.create({
      user_id,
      user_email,
      ip_address,
      navigator,
      login_status: user_login_status,
      login_method: user_login_method,
      session_time: user_session_time,
      logged_out_at: user_logged_out_at
    });
    return session;
  },

  async getActiveSessions() {
    return await SessionModel.findActive();
  },

  async logoutSession(userId, logged_out_at) {
    const session = await SessionModel.logout(userId, logged_out_at);
    return session; // May be undefined if no active session
  }
};

module.exports = SessionService;