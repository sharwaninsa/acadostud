const UserBasicDetailsModel = require('../models/userBasicDetails.model');
const { getUserPublicIP } = require('../utils/ip.util');
const { getUserAgent } = require('../utils/navigator.util');

const UserBasicDetailsService = {
  async createDetails(req, body) {
    const {
      user_id, user_email, user_gender, user_dateofbirth, user_fathername,
      user_mothername, user_phone, user_correspondence_address, user_permanent_address,
      user_qualifications_object, user_placeofbirth
    } = body;
    const ip_address = await getUserPublicIP();
    const navigator = getUserAgent(req);

    const details = await UserBasicDetailsModel.create({
      user_id, user_email, user_gender, user_dateofbirth, user_fathername,
      user_mothername, user_phone, user_correspondence_address, user_permanent_address,
      user_qualifications_object, user_placeofbirth, ip_address, navigator
    });
    return details;
  },

  async getDetailsByUser(userId) {
    const details = await UserBasicDetailsModel.findByUser(userId);
    if (!details) throw new Error('User details not found');
    return details;
  },

  async updateDetails(req, userId, body) {
    const {
      user_gender, user_dateofbirth, user_fathername, user_mothername,
      user_phone, user_correspondence_address, user_permanent_address,
      user_qualifications_object, user_placeofbirth
    } = body;
    const ip_address = await getUserPublicIP();
    const navigator = getUserAgent(req);

    const updated = await UserBasicDetailsModel.update(userId, {
      user_gender, user_dateofbirth, user_fathername, user_mothername,
      user_phone, user_correspondence_address, user_permanent_address,
      user_qualifications_object, user_placeofbirth, ip_address, navigator
    });
    if (!updated) throw new Error('User details not found');
    return updated;
  }
};

module.exports = UserBasicDetailsService;