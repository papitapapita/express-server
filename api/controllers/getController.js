import { tryCatch } from '../utils/tryCatch.js';
import { productsService } from '../services/productsService.js';

const { products } = productsService;

/**
 * @description gets a specific product
 * @route       /api/v1/products
 */
const getProduct = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const product = await productsService.findById(id);

  if (!product) {
    return res.status(404).json({
      message: `id ${id} not found`
    });
  }

  res.status(200).json(product);
});

const getProducts = tryCatch(async (req, res, next) => {
  let { size } = req.query;
  size = parseInt(size);

  if (size >= products.length || !size) {
    return res.json(products);
  }

  res.json(await productsService.getAll(size));
});

export { getProduct, getProducts };
