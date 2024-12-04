import boom from '@hapi/boom';
import { faker } from '@faker-js/faker';
import User from '../models/user.js';

class UsersService {
  constructor(users = this.generate()) {
    this.users = users.length > 0 ? users : this.generate();
  }

  generate() {
    const users = [];

    for (let i = 0; i < 10; i++) {
      users.push(
        new User(
          i + 1,
          faker.commerce.productAdjective(),
          faker.image.url()
        )
      );
    }

    return users;
  }

  async getAll(limit = this.users.length) {
    return this.users.slice(0, limit);
  }

  async findById(id) {
    return this.users.find((user) => user.id === id);
  }

  async findIndexById(id) {
    return this.users.findIndex((user) => user.id === id);
  }

  validate(user) {
    const requiredProperties = Object.keys(new User());
    const userKeys = Object.keys(user);

    if (userKeys.length > requiredProperties.length) {
      throw boom.entityTooLarge(
        `Too many properties: ${userKeys}`
      );
    }

    for (let prop of requiredProperties) {
      if (
        !Object.prototype.hasOwnProperty.call(user, prop)
      ) {
        throw boom.expectationFailed(
          `Missing property: ${prop}`
        );
      }
    }

    return user;
  }

  async create(user) {
    const createdUser = {
      id: this.users.length + 1,
      ...user
    };
    const validatedUser = this.validate(createdUser);
    this.users.push(validatedUser);

    return validatedUser;
  }

  async replace(id, user) {
    const userIndex = await this.findIndexById(id);

    if (userIndex === -1) {
      throw boom.notFound(`User with ID ${id} not found`);
    }

    const validatedUser = this.validate({
      id,
      ...user
    });
    this.users[userIndex] = validatedUser;
  }

  async update(id, data) {
    const userIndex = await this.findIndexById(id);

    if (userIndex === -1) {
      throw boom.notFound(`User with ID ${id} not found`);
    }

    const validatedUser = this.validate({
      ...this.users[userIndex],
      ...data
    });

    this.users[userIndex] = validatedUser;

    return validatedUser;
  }

  async delete(id) {
    const user = await this.findById(id);

    if (!user) {
      throw boom.notFound(`User with ID ${id} not found`);
    }

    this.users = this.users.filter(
      (user) => user.id !== id
    );

    return user;
  }
}

const usersService = new UsersService();

export { usersService, UsersService };
