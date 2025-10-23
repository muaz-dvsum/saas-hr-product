const { getUserById } = require('../data');

/**
 * Simple authentication middleware for mock users
 * In a real application, this would validate JWT tokens or session cookies
 */
const authenticate = (req, res, next) => {
  const userId = req.headers['user-id'] || req.body.userId || req.query.userId;
  
  if (!userId) {
    return res.status(401).json({ 
      error: 'Authentication required. Please provide user-id in headers.' 
    });
  }

  const user = getUserById(userId);
  if (!user) {
    return res.status(401).json({ 
      error: 'Invalid user credentials.' 
    });
  }

  req.user = user;
  next();
};

/**
 * Authorization middleware to check if user has manager role
 */
const requireManager = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      error: 'Authentication required.' 
    });
  }

  if (req.user.role !== 'manager') {
    return res.status(403).json({ 
      error: 'Manager role required for this operation.' 
    });
  }

  next();
};

/**
 * Authorization middleware to check if user has employee role
 */
const requireEmployee = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      error: 'Authentication required.' 
    });
  }

  if (req.user.role !== 'employee') {
    return res.status(403).json({ 
      error: 'Employee role required for this operation.' 
    });
  }

  next();
};

module.exports = {
  authenticate,
  requireManager,
  requireEmployee
};