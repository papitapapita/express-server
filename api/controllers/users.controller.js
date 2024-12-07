import { usersService } from '../services/users.js';
import { tryCatch } from '../utils/tryCatch.js';
import boom from '@hapi/boom';

export default class UsersController {
  getUsers() {
    return tryCatch(async (req, res) => {
      let { size } = req.query;

      if (size) {
        size = parseInt(size, 10) || 0;

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

  replaceUser() {
    return tryCatch(async (req, res) => {
      const { id } = req.params;
      const { body } = req;

      await usersService.replace(id, body);

      res.status(204).json({
        message: 'modified',
        data: body
      });
    });
  }

  editUser() {
    return tryCatch(async (req, res) => {
      const { id } = req.params;
      const { body } = req;

      const user = await usersService.update(id, body);

      res.status(214).json({
        message: 'modified',
        data: user
      });
    });
  }

  deleteUser() {
    return tryCatch(async (req, res) => {
      const { id } = req.params;

      const deletedUser = await usersService.delete(id);

      res.json({
        message: 'User deleted succesfully',
        deletedUser
      });
    });
  }
}
