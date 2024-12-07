import express from 'express';
import validate from '../middleware/validate.js';
import ProductsController from '../controllers/products.controller.js';
import {
  idSchema,
  productSchema,
  softProductSchema
} from '../utils/schemas.js';

const router = express.Router();
const productsController = new ProductsController();
const {
  getProduct,
  getProducts,
  createProduct,
  editProduct,
  replaceProduct,
  deleteProduct
} = productsController;

router.get('/', getProducts);
router.get(
  '/:id',
  validate(idSchema, 'params'),
  getProduct
);

router.post(
  '/',
  validate(productSchema, 'body'),
  createProduct
);

router.put(
  '/:id',
  validate(idSchema, 'params'),
  validate(productSchema, 'body'),
  replaceProduct
);

router.patch(
  '/:id',
  validate(idSchema, 'params'),
  validate(softProductSchema, 'body'),
  editProduct
);

router.delete(
  '/:id',
  validate(idSchema, 'params'),
  deleteProduct
);

export default router;
