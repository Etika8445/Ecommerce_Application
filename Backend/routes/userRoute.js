import { Router } from 'express'
import { registerUser, logout, getUserById, authUser } from '../Controllers/UserController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/register',registerUser)
router.post('/login', authUser)
router.get('/logout',logout) 
router.route('/:id').get(getUserById)

export default router
