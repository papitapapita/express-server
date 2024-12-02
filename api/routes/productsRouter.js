import express from 'express';
import validate from '../middleware/validate.js';
import { deleteProduct } from '../controllers/deleteController.js';
import {
  idSchema,
  productSchema,
  softProductSchema
} from '../utils/schemas.js';
import {
  getProduct,
  getProducts
} from '../controllers/getController.js';
import { createProduct } from '../controllers/postController.js';
import { replaceProduct } from '../controllers/putController.js';
import { editProduct } from '../controllers/patchController.js';

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
