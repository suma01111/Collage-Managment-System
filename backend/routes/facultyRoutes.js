import express from 'express';
import { getFacultyProfile, registerFaculty } from '../controllers/facultyController.js';
import { authenticateUser } from '../middleware/auth.js';



const router = express.Router();

router.post('/register', registerFaculty);
router.get('/profile', authenticateUser, getFacultyProfile);
export default router;