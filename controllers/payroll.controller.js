const PayrollService = require('../services/payroll.service');

const PayrollController = {
  async createPayroll(req, res, next) {
    try {
      const payroll = await PayrollService.createPayroll(req, req.body);
      res.status(201).json({
        message: 'Payroll created successfully',
        payroll
      });
    } catch (error) {
      next(error);
    }
  },

  async listPayroll(req, res, next) {
    try {
      const payrolls = await PayrollService.getAllPayroll();
      res.json(payrolls);
    } catch (error) {
      next(error);
    }
  },

  async getPayrollByUser(req, res, next) {
    try {
      const payrolls = await PayrollService.getPayrollByUser(req.params.userId);
      res.json(payrolls);
    } catch (error) {
      next(error);
    }
  },

  async updatePayroll(req, res, next) {
    try {
      const updated = await PayrollService.updatePayrollStatus(req.params.payrollId, req.body.payroll_status);
      res.json({
        message: 'Payroll updated successfully',
        payroll: updated
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = PayrollController;