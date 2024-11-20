import { faker } from '@faker-js/faker';
import { Product } from '../models/product.js';
import { ProductValidationError } from '../errors/errors.js';

export class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    for (let i = 0; i < 100; i++) {
      this.products.push(
        new Product(
          i,
          faker.commerce.productName(),
          parseInt(faker.commerce.price()),
          faker.image.url()
        )
      );
    }
  }

  getAll(amount) {
    return this.products.slice(0, amount);
  }

  findById(id) {
    return this.products.find(
      (product) => product.id == id
    );
  }

  findIndexById(id) {
    return this.products.findIndex(
      (product) => product.id == id
    );
  }

  create(product) {
    this.products.push(this.verifyProduct(product));
  }

  validate(product) {
    if (Object.keys(product) > 4) {
      throw new ProductValidationError();
    }

    const requiredProperties = Object.keys(new Product());

    for (let prop of requiredProperties) {
      if (!Object.hasOwn(product, prop)) {
        throw new ProductValidationError(
          `Object lacks ${prop}`
        );
      }
    }

    return product;
  }

  replace(id, product) {
    const productIndex = this.products.findIndex(
      (product) => product.id == id
    );

    this.products[productIndex] =
      this.verifyProduct(product);
  }

  update(id, data) {
    const productIndex = this.products.findIndex(
      (product) => product.id == id
    );

    this.products[productIndex] = this.data;
  }

  delete(id) {
    const productIndex = this.products.findIndex(
      (product) => product.id == id
    );
  }
}
