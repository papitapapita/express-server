import boom from '@hapi/boom';
import { faker } from '@faker-js/faker';
import Category from '../models/category.js';

class CategoriesService {
  constructor(categories = this.generate()) {
    this.categories =
      categories.length > 0 ? categories : this.generate();
  }

  generate() {
    const categories = [];

    for (let i = 0; i < 10; i++) {
      categories.push(
        new Category(
          i + 1,
          faker.commerce.productAdjective(),
          faker.image.url()
        )
      );
    }

    return categories;
  }

  async getAll(limit = this.categories.length) {
    return this.categories.slice(0, limit);
  }

  async findById(id) {
    return this.categories.find(
      (category) => category.id === id
    );
  }

  async findIndexById(id) {
    return this.categories.findIndex(
      (category) => category.id === id
    );
  }

  validate(category) {
    const requiredProperties = Object.keys(new Category());
    const categoryKeys = Object.keys(category);

    if (categoryKeys.length > requiredProperties.length) {
      throw boom.entityTooLarge(
        `Too many properties: ${categoryKeys}`
      );
    }

    for (let prop of requiredProperties) {
      if (
        !Object.prototype.hasOwnProperty.call(
          category,
          prop
        )
      ) {
        throw boom.expectationFailed(
          `Missing property: ${prop}`
        );
      }
    }

    return category;
  }

  async create(category) {
    const createdCategory = {
      id: this.categories.length + 1,
      ...category
    };
    const validatedCategory =
      this.validate(createdCategory);
    this.categories.push(validatedCategory);

    return validatedCategory;
  }

  async replace(id, category) {
    const categoryIndex = await this.findIndexById(id);

    if (categoryIndex === -1) {
      throw boom.notFound(
        `Category with ID ${id} not found`
      );
    }

    const validatedCategory = this.validate({
      id,
      ...category
    });
    this.categories[categoryIndex] = validatedCategory;
  }

  async update(id, data) {
    const categoryIndex = await this.findIndexById(id);

    if (categoryIndex === -1) {
      throw boom.notFound(
        `Category with ID ${id} not found`
      );
    }

    const validatedCategory = this.validate({
      ...this.categories[categoryIndex],
      ...data
    });

    this.categories[categoryIndex] = validatedCategory;

    return validatedCategory;
  }

  async delete(id) {
    const category = await this.findById(id);

    if (!category) {
      throw boom.notFound(
        `Category with ID ${id} not found`
      );
    }

    this.categories = this.categories.filter(
      (category) => category.id !== id
    );

    return category;
  }
}

const categoriesService = new CategoriesService();
export { categoriesService, CategoriesService };
