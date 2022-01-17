import express from 'express';
import { getProducts, getProductsById, postProduct, putProduct ,deleteProduct,postReview,getReview} from '../controllers/products.js';
import { authenticate } from '../middleware/auth.js';
// create a router
const router = express.Router();

router.get('/', getProducts);
router.get('/:_id', getProductsById);
router.post('/', postProduct);
router.put('/:_id', putProduct);
router.delete('/:_id',deleteProduct)
router.post(   '/:_id/review', getReview );

router.post(   '/:_id/review', postReview );
// module.exports = router
router.post(   '/:_id/reviews', authenticate, postReview );
// exporting single item in ES2015 export syntax
export default router;
