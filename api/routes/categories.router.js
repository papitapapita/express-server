import { Router } from 'express';
import validate from '../middleware/validate.js';
import CategoriesController from '../controllers/categories.controller.js';
import {
  categorySchema,
  idSchema,
  softCategorySchema
} from '../utils/schemas.js';

const router = Router();
const categoriesController = new CategoriesController();
const {
  getCategory,
  getCategories,
  createCategory,
  editCategory,
  replaceCategory,
  deleteCategory
} = categoriesController;

router.get('/', getCategories);
router.get(
  '/:id',
  validate(idSchema, 'params'),
  getCategory()
);

router.post(
  '/',
  validate(categorySchema, 'body'),
  createCategory()
);

router.put(
  '/:id',
  validate(idSchema, 'params'),
  validate(categorySchema, 'body'),
  replaceCategory()
);

router.patch(
  '/:id',
  validate(idSchema, 'params'),
  validate(softCategorySchema, 'body'),
  editCategory()
);

router.delete(
  '/:id',
  validate(idSchema, 'params'),
  deleteCategory()
);

export default router;
