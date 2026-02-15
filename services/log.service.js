const LogModel = require('../models/log.model');
const { getUserPublicIP } = require('../utils/ip.util');

const LogService = {
  async createLog(req, logData) {
    const { user_id, user_email, user_activity, user_activity_duration } = logData;
    const ip_address = await getUserPublicIP();

    const log = await LogModel.create({
      user_id,
      user_email,
      user_activity,
      user_activity_duration,
      start_ip: ip_address,
      end_ip: ip_address
    });
    return log;
  },

  async getAllLogs() {
    return await LogModel.findAll();
  },

  async getLogsByUser(userId) {
    return await LogModel.findByUser(userId);
  }
};

module.exports = LogService;