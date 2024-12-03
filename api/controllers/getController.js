import { tryCatch } from '../utils/tryCatch.js';
import { productsService } from '../services/productsService.js';
import { categoriesService } from '../services/categoriesService.js';
import boom from '@hapi/boom';

const { products } = productsService;
const { categories } = categoriesService;

/**
 * @description gets a specific product
 * @route       /api/v1/products
 */
const getProduct = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const product = await productsService.findById(id);

  if (!product) {
    throw boom.notFound(`id ${id} not found`);
  }

  res.json(product);
});

const getProducts = tryCatch(async (req, res, next) => {
  let { size } = req.query;
  size = parseInt(size);

  if (size >= products.length || !size) {
    return res.json(products);
  }

  res.json(await productsService.getAll(size));
});

const getCategories = tryCatch(async (req, res, next) => {
  let { size } = req.query;
  size = parseInt(size);

  if (size >= products.length || !size) {
    return res.json(categories);
  }

  res.json(await categoriesService.getAll(size));
});

const getCategory = tryCatch(async (req, res) => {
  console.log('Im here');

  let { id } = req.params;
  const category = await categoriesService.findById(id);

  if (!category) {
    throw boom.notFound(`id ${id} not found`);
  }

  res.json(category);
});

export {
  getProduct,
  getProducts,
  getCategories,
  getCategory
};
