import { usersService } from '../services/users.js';
import { tryCatch } from '../utils/tryCatch.js';
import boom from '@hapi/boom';

export default class UsersController {
  /**
   * @description Get all users
   * @route       GET /api/v1/users
   */
  getUsers() {
    return tryCatch(async (req, res) => {
      let { size } = req.query;

      if (size) {
        size = parseInt(size);

        if (isNaN(size) || size < 0) {
          throw boom.badRequest('Invalid size parameter');
        }
      }

      const result = await usersService.getAll(size);

      res.status(200).json({
        succes: true,
        message: 'Users retrieved',
        data: result
      });
    });
  }

  /**
   * @description Get a specific user
   * @route       GET /api/v1/users/:id
   */
  getUser() {
    return tryCatch(async (req, res) => {
      const { id } = req.params;
      const user = await usersService.findById(id);

      if (!user) {
        throw boom.notFound(`User with ID ${id} not found`);
      }

      res.status(200).json({
        succes: true,
        message: 'User retrieved',
        data: user
      });
    });
  }

  /**
   * @description Create a user
   * @route       POST /api/v1/users
   */
  createUser() {
    return tryCatch(async (req, res) => {
      const { body } = req;
      const user = await usersService.create(body);

      res.status(201).json({
        succes: true,
        message: 'User created',
        data: user
      });
    });
  }

  /**
   * @description Replace a user
   * @route       PUT /api/v1/users/:id
   */
  replaceUser() {
    return tryCatch(async (req, res) => {
      const { id } = req.params;
      const { body } = req;

      await usersService.replace(id, body);

      res.status(204).json({
        succes: true,
        message: 'User replaced',
        data: body
      });
    });
  }

  /**
   * @description Edit a user
   * @route       PATCH /api/v1/users/:id
   */
  editUser() {
    return tryCatch(async (req, res) => {
      const { id } = req.params;
      const { body } = req;

      const user = await usersService.update(id, body);

      res.status(200).json({
        succes: true,
        message: 'User updated',
        data: user
      });
    });
  }

  /**
   * @description Delete a user
   * @route       DELETE /api/v1/users/:id
   */
  deleteUser() {
    return tryCatch(async (req, res) => {
      const { id } = req.params;

      const deletedUser = await usersService.delete(id);

      res.status(200).json({
        succes: true,
        message: 'User deleted succesfully',
        data: deletedUser
      });
    });
  }
}
