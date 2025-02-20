import express from 'express'
import { getUsers, updateUserStatus, updateUserRole } from '../controllers/adminController.js'
import { authenticateUser } from '../middleware/auth.js'
import { isAdmin } from '../middleware/isAdmin.js'

const router = express.Router()

// Apply authentication and admin check to all routes
router.use(authenticateUser)
router.use(isAdmin)

router.get('/users', getUsers)
router.put('/users/:userId/status', updateUserStatus)
router.put('/users/:userId/role', updateUserRole)

export default router 
