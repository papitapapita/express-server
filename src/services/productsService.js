import { faker } from '@faker-js/faker';
import { Product } from '../models/product.js';
import { ProductValidationError } from '../errors/errors.js';

class ProductsService {
  constructor(products = this.generate()) {
    this.products =
      products.length > 0 ? products : this.generate();
  }

  generate() {
    const products = [];

    for (let i = 0; i < 100; i++) {
      products.push(
        new Product(
          i + 1,
          faker.commerce.productName(),
          parseInt(faker.commerce.price()),
          faker.image.url()
        )
      );
    }

    return products;
  }

  getAll(amount) {
    return this.products.slice(0, amount);
  }

  findById(id) {
    return this.products.find(
      (product) => product.id === id
    );
  }

  findIndexById(id) {
    return this.products.findIndex(
      (product) => product.id === id
    );
  }

  validate(product) {
    const requiredProperties = Object.keys(new Product());
    const productKeys = Object.keys(product);

    if (productKeys.length > requiredProperties.length) {
      throw new ProductValidationError(
        `Too many properties: ${productKeys}`
      );
    }

    for (let prop of requiredProperties) {
      if (
        !Object.prototype.hasOwnProperty.call(product, prop)
      ) {
        throw new ProductValidationError(
          `Missing property: ${prop}`
        );
      }
    }

    return product;
  }

  create(product) {
    const validatedProduct = this.validate(product);
    this.products.push(validatedProduct);
  }

  replace(id, product) {
    const productIndex = this.findIndexById(id);

    if (productIndex === -1) {
      throw new ProductValidationError(
        `Product with ID ${id} not found`
      );
    }

    const validatedProduct = this.validate({
      id,
      ...product
    });
    this.products[productIndex] = validatedProduct;
  }

  update(id, data) {
    const productIndex = this.findIndexById(id);

    if (productIndex === -1) {
      throw new ProductValidationError(
        `Product with ID ${id} not found`
      );
    }

    const validatedProduct = this.validate({
      ...this.products[productIndex],
      ...data
    });

    this.products[productIndex] = validatedProduct;
  }

  delete(id) {
    const product = this.products.find(
      (product) => product.id === id
    );

    if (!product) {
      throw new ProductValidationError(
        `Cannot find id ${id}`
      );
    }

    this.products = this.products.filter(
      (product) => product.id !== id
    );

    return product;
  }
}

const productsService = new ProductsService();
export { productsService, ProductsService };
