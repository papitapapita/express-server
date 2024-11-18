import express from 'express';
import products from '../utils/products.js';

const router = express.Router();
const categories = [
  { id: 1, name: 'toiletries', products },
  { id: 2, name: 'accesories', products }
];

router.get('/', (req, res) => {
  res.json(categories);
});

router.get('/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  res.json(
    categories.find((category) => category.id == categoryId)
  );
});

router.get(
  '/:categoryId/products/:productId',
  (req, res) => {
    const { categoryId, productId } = req.params;
    res.json(
      categories
        .find((category) => category.id == categoryId)
        .products.find((product) => product.id == productId)
    );
  }
);

export default router;
