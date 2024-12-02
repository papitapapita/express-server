import { productsService } from '../services/productsService.js';
import { tryCatch } from '../utils/tryCatch.js';

/**
 * @description create product
 * @route       POST /api/v1/products/
 */
const createProduct = tryCatch(async (req, res, next) => {
  const { body } = req;
  const product = await productsService.create(body);

  res.status(201).json({
    message: 'created',
    data: product
  });
});

export { createProduct };
