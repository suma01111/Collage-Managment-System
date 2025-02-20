import express from 'express';
import { registerStudent, getStudentProfile } from '../controllers/studentController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerStudent);
router.get('/profile', authenticateUser, getStudentProfile); // New route for fetching student profile

export default router;
