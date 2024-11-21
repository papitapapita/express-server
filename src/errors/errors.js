class ProductValidationError extends Error {
  constructor(message = 'Invalid product data') {
    super(message);
    this.name = 'ProductValidationError';
    this.statusCode = 400;
  }
}

export { ProductValidationError };
