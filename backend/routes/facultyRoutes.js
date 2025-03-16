import express from 'express';
import { facutlyAssignCourses, getFacultyProfile, registerFaculty, StudentCourse } from '../controllers/facultyController.js';
import { authenticateUser } from '../middleware/auth.js';



const router = express.Router();

router.post('/register', registerFaculty);
router.get('/profile', authenticateUser, getFacultyProfile);
router.get('/courses/:facultyId',facutlyAssignCourses);
router.get('/course-student/:facultyId', StudentCourse);
export default router;