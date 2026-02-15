const SalaryModel = require('../models/salary.model');

const SalaryService = {
  async createSalary(salaryData) {
    const salary = await SalaryModel.create(salaryData);
    return salary;
  },

  async getSalaryByUser(userId) {
    const salary = await SalaryModel.findByUser(userId);
    if (!salary) throw new Error('Salary record not found');
    return salary;
  },

  async updateSalary(userId, salaryData) {
    const updated = await SalaryModel.update(userId, salaryData);
    if (!updated) throw new Error('Salary record not found');
    return updated;
  }
};

module.exports = SalaryService;