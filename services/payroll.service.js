const PayrollModel = require('../models/payroll.model');
const { getUserPublicIP } = require('../utils/ip.util');
const { getUserAgent } = require('../utils/navigator.util');

const PayrollService = {
  async createPayroll(req, body) {
    const { user_id, user_email, payroll_date, payroll_amount, payroll_type, payroll_status } = body;
    const ip_address = await getUserPublicIP();
    const navigator = getUserAgent(req);
    const issued_by = 'System';

    const payroll = await PayrollModel.create({
      user_id,
      user_email,
      payroll_date,
      payroll_amount,
      payroll_type,
      payroll_status,
      issued_by,
      ip_address,
      navigator
    });
    return payroll;
  },

  async getAllPayroll() {
    return await PayrollModel.findAll();
  },

  async getPayrollByUser(userId) {
    return await PayrollModel.findByUser(userId);
  },

  async updatePayrollStatus(payrollId, payroll_status) {
    const updated = await PayrollModel.updateStatus(payrollId, payroll_status);
    if (!updated) throw new Error('Payroll record not found');
    return updated;
  }
};

module.exports = PayrollService;