import { Router } from 'express';
import validate from '../middleware/validate.js';
import {
  idSchema,
  userSchema,
  softUserSchema
} from '../utils/schemas.js';
import {
  getUsers,
  getUser
} from '../controllers/getController.js';
import { createUser } from '../controllers/postController.js';
import { replaceUser } from '../controllers/putController.js';
import { editUser } from '../controllers/patchController.js';
import { deleteUser } from '../controllers/deleteController.js';

const router = Router();

router.get('/', getUsers);
router.get('/:id', validate(idSchema, 'params'), getUser);

router.post('/', validate(userSchema, 'body'), createUser);

router.put(
  '/:id',
  validate(idSchema, 'params'),
  validate(userSchema, 'body'),
  replaceUser
);

router.patch(
  '/:id',
  validate(idSchema, 'params'),
  validate(softUserSchema, 'body'),
  editUser
);

router.delete(
  '/:id',
  validate(idSchema, 'params'),
  deleteUser
);

export default router;
