import { Router } from 'express'
import { registerUser, logout, getUserById, authUser } from '../Controllers/UserController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/register',registerUser)
router.post('/login', authUser)
router.get('/logout', protect,logout) 
router.route('/:id').get(protect,getUserById)

export default router