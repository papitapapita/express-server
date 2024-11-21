import express from 'express';
import { ProductsService } from '../services/productsService.js';
import { tryCatch } from '../utils/tryCatch.js';
import logger from '../middleware/logger.js';

const router = express.Router();
const productsService = new ProductsService();
const { products } = productsService;

router.get('/', logger, (req, res) => {
  let { size } = req.query;
  size = parseInt(size);

  if (size >= products.length || !size) {
    return res.json(products);
  }

  res.json(productsService.getProducts(size));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = productsService.getProductById(id);

  if (!product) {
    return res.status(404).json({
      message: `id ${id} not found`
    });
  }

  res.status(200).json(product);
});

router.post('/', (req, res) => {
  tryCatch(res, () => {
    const { body } = req;
    productsService.createProduct(body);

    res.status(201).json({
      message: 'created',
      data: body
    });
  });
});

router.put('/:id', (req, res) => {
  tryCatch(res, () => {
    const { id } = req.params;
    const { body } = req;

    productsService.replaceProduct(id, body);

    res.status(214).json({
      message: 'modified',
      data: body
    });
  });
});

router.patch('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const productIndex = products.findIndex(
      (product) => product.id == id
    );

    if (productIndex == -1) {
      return res.status(400);
    }

    const { body } = req;

    for (const prop in body) {
      products[productIndex][prop] = body[prop];
    }

    res.status(214).json({
      message: 'modified',
      data: products[productIndex]
    });
  } catch (error) {
    console.error(error);
  }
});

router.delete('/:id', (req, res) => {
  try {
    console.log('Hi');
    const { id } = req.params;
    const productIndex = products.findIndex(
      (product) => product.id == id
    );

    if (productIndex == -1) res.status(400);

    products.splice(productIndex, 1);
    res.json({
      message: 'deleted',
      id
    });
  } catch (error) {
    console.error(error);
  }
});

export default router;
