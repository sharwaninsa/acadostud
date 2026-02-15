// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'Access not allowed from this origin' });
  }

  // Handle known service errors (e.g., "User not found")
  if (err.message.includes('not found')) {
    return res.status(404).json({ error: err.message });
  }

  if (err.message === 'Invalid email or password') {
    return res.status(401).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal server error', details: err.message });
};

module.exports = errorHandler;