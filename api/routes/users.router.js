import { Router } from 'express';
import validate from '../middleware/validate.js';
import UsersController from '../controllers/users.controller.js';
import {
  idSchema,
  userSchema,
  softUserSchema
} from '../utils/schemas.js';

const router = Router();
const usersController = new UsersController();
const {
  getUser,
  getUsers,
  createUser,
  replaceUser,
  editUser,
  deleteUser
} = usersController;

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
