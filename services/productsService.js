import { faker } from '@faker-js/faker';
import { Product } from '../models/product';
import { ProductValidationError } from '../errors/errors';

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

  getProducts(amount) {
    return this.products.slice(0, amount);
  }

  getProductById(id) {
    return this.products.find(
      (product) => product.id == id
    );
  }

  findIndexById(id) {
    return this.products.findIndex(
      (product) => product.id == id
    );
  }

  createProduct(product) {
    this.products.push(this.verifyProduct(product));
  }

  verifyProduct(product) {
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

  replaceProduct(id, product) {}
}
