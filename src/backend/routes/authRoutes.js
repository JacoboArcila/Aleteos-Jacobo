import express from 'express';
import { protect } from '../middleware/auth.js';
import { login, getMe, logout, updateDetails, updatePassword } from '../controllers/authController.js';
const router = express.Router();

// Public routes
router.post('/login', login);
router.get('/logout', logout);

// Protected routes
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

export default router;