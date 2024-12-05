import { tryCatch } from '../utils/tryCatch.js';
import { productsService } from '../services/productsService.js';
import { categoriesService } from '../services/categoriesService.js';
import boom from '@hapi/boom';
import { usersService } from '../services/usersService.js';

const { products } = productsService;
const { categories } = categoriesService;
const { users } = usersService;

/**
 * @description gets a specific product
 * @route       /api/v1/products
 */
const getProduct = tryCatch(async (req, res) => {
  const { id } = req.params;
  const product = await productsService.findById(id);

  if (!product) {
    throw boom.notFound(`id ${id} not found`);
  }

  res.json(product);
});

const getProducts = tryCatch(async (req, res) => {
  let { size } = req.query;
  size = parseInt(size);

  if (size >= products.length || !size) {
    return res.json(products);
  }

  res.json(await productsService.getAll(size));
});

const getCategories = tryCatch(async (req, res) => {
  let { size } = req.query;
  size = parseInt(size);

  if (size >= products.length || !size) {
    return res.json(categories);
  }

  res.json(await categoriesService.getAll(size));
});

const getCategory = tryCatch(async (req, res) => {
  let { id } = req.params;
  const category = await categoriesService.findById(id);

  if (!category) {
    throw boom.notFound(`id ${id} not found`);
  }

  res.json(category);
});

const getUsers = tryCatch(async (req, res) => {
  let { size } = req.query;
  size = parseInt(size) ?? 0;

  const result = await usersService.getAll(size);
  console.log(result);

  res.json(result);
});

const getUser = tryCatch(async (req, res) => {
  const { id } = req.params;
  const user = usersService.findById(id);

  if (!user) {
    throw boom.notFound(`id ${id} not found`);
  }

  res.json(user);
});

export {
  getProduct,
  getProducts,
  getCategories,
  getCategory,
  getUsers,
  getUser
};
