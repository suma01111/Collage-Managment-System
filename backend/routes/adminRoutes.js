import express from 'express'
import { getUsers, updateUserRole, updateUserStatus } from '../controllers/adminController.js'
import { AddCourse, deleteCourse, getCourses, updateCourse } from '../controllers/Courses.js'
import { getFacultyForCourses } from '../controllers/facultyController.js'
import { authenticateUser } from '../middleware/auth.js'
import { isAdmin } from '../middleware/isAdmin.js'

const router = express.Router()

router.use(authenticateUser)
router.use(isAdmin)

router.get('/users', getUsers)
router.put('/users/:userId/status', updateUserStatus)
router.put('/users/:userId/role', updateUserRole)
router.get('/courses/faculty', getFacultyForCourses);
router.get('/courses', getCourses);
router.post('/courses/addCourse', AddCourse);
router.put("/courses/updatecourse/:course_id", updateCourse);
router.delete("/courses/deletecourse/:course_id", deleteCourse);
export default router 
