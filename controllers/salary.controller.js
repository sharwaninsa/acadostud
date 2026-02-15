const SalaryService = require('../services/salary.service');

const SalaryController = {
  async createSalary(req, res, next) {
    try {
      const salary = await SalaryService.createSalary(req.body);
      res.status(201).json({
        message: 'Salary record created successfully',
        salary
      });
    } catch (error) {
      next(error);
    }
  },

  async getSalary(req, res, next) {
    try {
      const salary = await SalaryService.getSalaryByUser(req.params.userId);
      res.json(salary);
    } catch (error) {
      next(error);
    }
  },

  async updateSalary(req, res, next) {
    try {
      const updated = await SalaryService.updateSalary(req.params.userId, req.body);
      res.json({
        message: 'Salary updated successfully',
        salary: updated
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = SalaryController;