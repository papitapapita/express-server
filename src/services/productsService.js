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

  async getAll(amount) {
    return this.products.slice(0, amount);
  }

  async findById(id) {
    return this.products.find(
      (product) => product.id === id
    );
  }

  async findIndexById(id) {
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

  async create(product) {
    const createdProduct = {
      id: this.products.length + 1,
      ...product
    };
    const validatedProduct = this.validate(createdProduct);
    this.products.push(validatedProduct);

    return validatedProduct;
  }

  async replace(id, product) {
    const productIndex = await this.findIndexById(id);

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

  async update(id, data) {
    const productIndex = await this.findIndexById(id);

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

    return validatedProduct;
  }

  async delete(id) {
    const product = await this.findById(id);

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
