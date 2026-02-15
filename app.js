const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/cors');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const userRoutes = require('./routes/user.routes');
const attendanceRoutes = require('./routes/attendance.routes');
const logRoutes = require('./routes/log.routes');
const payrollRoutes = require('./routes/payroll.routes');
const salaryRoutes = require('./routes/salary.routes');
const sessionRoutes = require('./routes/session.routes');
const userBasicDetailsRoutes = require('./routes/userBasicDetails.routes');
const userDocumentsRoutes = require('./routes/userDocuments.routes');
const authRoutes = require('./routes/auth.routes');
const userIp = require('./utils/ip.util')

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/', userRoutes);
app.use('/', attendanceRoutes);
app.use('/', logRoutes);
app.use('/', payrollRoutes);
app.use('/', salaryRoutes);
app.use('/', sessionRoutes);
app.use('/', userBasicDetailsRoutes);
app.use('/', userDocumentsRoutes);
app.use('/', authRoutes);

// Health check
app.get('/', async (req, res) => {
  res.json({ message: `Server is running and user is connected from IP ${(await userIp.getUserPublicIP())}` });
});

// Error handling (must be last)
app.use(errorHandler);

module.exports = app;