import { Router } from 'express'
import {addProduct, getProducts, getProductById} from '../Controllers/ProductController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = Router()

router.route('/').get(getProducts).post(protect,addProduct)
router.route('/:id').get(getProductById)

export default router