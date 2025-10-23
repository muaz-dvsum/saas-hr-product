const express = require('express');
const { users, getUserById } = require('../data');

const router = express.Router();

/**
 * GET /auth/users - Get all users (for mock login)
 */
router.get('/users', (req, res) => {
  const publicUsers = users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  }));
  
  res.json({
    success: true,
    data: publicUsers
  });
});

/**
 * POST /auth/login - Mock login endpoint
 */
router.post('/login', (req, res) => {
  const { userId } = req.body;
  
  if (!userId) {
    return res.status(400).json({
      success: false,
      error: 'User ID is required'
    });
  }
  
  const user = getUserById(userId);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }
  
  // Return user info (in real app, this would return JWT token)
  res.json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      leaveBalance: user.leaveBalance
    },
    message: 'Login successful'
  });
});

/**
 * GET /auth/profile - Get current user profile
 */
router.get('/profile', (req, res) => {
  const userId = req.headers['user-id'];
  
  if (!userId) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required'
    });
  }
  
  const user = getUserById(userId);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Invalid user'
    });
  }
  
  res.json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      leaveBalance: user.leaveBalance
    }
  });
});

module.exports = router;