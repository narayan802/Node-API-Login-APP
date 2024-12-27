const express = require('express');
const authController = require('../controllers/authController');
const registerController = require('../controllers/registerController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerController.register);


// Apply the middleware only to protected routes
router.use(verifyToken); // All routes defined below this will be protected

// Protected routes
router.post('/login_check', authController.login);

module.exports = router;
