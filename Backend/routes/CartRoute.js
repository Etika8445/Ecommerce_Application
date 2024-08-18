import { Router } from 'express'
import { addToCart, deleteCartItem, getCart } from '../Controllers/CartController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = Router()

router.route('/').post(addToCart)     
router.route('/:userid/:productid').delete(deleteCartItem)
router.route('/:id').get(getCart)

export default router
