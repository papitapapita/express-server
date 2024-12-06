import { categoriesService } from '../services/categories.js';
import { productsService } from '../services/products.js';
import { usersService } from '../services/users.js';
import { tryCatch } from '../utils/tryCatch.js';

/**
 * @description create product
 * @route       POST /api/v1/products/
 */
const createProduct = tryCatch(async (req, res) => {
  const { body } = req;
  console.log(body);
  const product = await productsService.create(body);

  res.status(201).json({
    message: 'created',
    data: product
  });
});

const createCategory = tryCatch(async (req, res) => {
  const { body } = req;
  const category = await categoriesService.create(body);

  res.status(201).json({
    message: 'created',
    data: category
  });
});

const createUser = tryCatch(async (req, res) => {
  const { body } = req;
  const user = await usersService.create(body);

  res.status(201).json({
    message: 'created',
    data: user
  });
});

export { createProduct, createCategory, createUser };
