// routes/adminRoutes.js
import express from 'express';
import { protect } from '../middleware/admin.js';
import { authorizeAdmin } from '../middleware/admin.js';
import { createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
const router = express.Router();

// Apply both middlewares to admin routes
// First protect verifies the token, then authorizeAdmin checks for admin role
router.use(protect);
router.use(authorizeAdmin);

// All routes below this line will require admin privileges
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
// More admin routes...

export default router;