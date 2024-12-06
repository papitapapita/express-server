import { Router } from 'express';
import validate from '../middleware/validate.js';
import {
  categorySchema,
  idSchema,
  softCategorySchema
} from '../utils/schemas.js';
import { createCategory } from '../controllers/post.js';
import { replaceCategory } from '../controllers/put.js';
import { editCategory } from '../controllers/patch.js';
import {
  getCategory,
  getCategories
} from '../controllers/get.js';
import { deleteCategory } from '../controllers/delete.js';

const router = Router();

router.get('/', getCategories);
router.get(
  '/:id',
  validate(idSchema, 'params'),
  getCategory
);

router.post(
  '/',
  validate(categorySchema, 'body'),
  createCategory
);

router.put(
  '/:id',
  validate(idSchema, 'params'),
  validate(categorySchema, 'body'),
  replaceCategory
);

router.patch(
  '/:id',
  validate(idSchema, 'params'),
  validate(softCategorySchema, 'body'),
  editCategory
);

router.delete(
  '/:id',
  validate(idSchema, 'params'),
  deleteCategory
);

export default router;
