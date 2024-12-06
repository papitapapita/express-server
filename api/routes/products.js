import express from 'express';
import validate from '../middleware/validate.js';
import { deleteProduct } from '../controllers/delete.js';
import {
  idSchema,
  productSchema,
  softProductSchema
} from '../utils/schemas.js';
import {
  getProduct,
  getProducts
} from '../controllers/get.js';
import { createProduct } from '../controllers/post.js';
import { replaceProduct } from '../controllers/put.js';
import { editProduct } from '../controllers/patch.js';

const router = express.Router();

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
