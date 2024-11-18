import express from 'express';
import products from '../utils/products.js';

const router = express.Router();

router.get('/', (req, res) => {
  let { size } = req.query;
  size = parseInt(size);

  if (size >= products.length || !size) {
    res.json(products);
  } else {
    res.json(products.slice(0, size));
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.json(products.find((product) => product.id == id));
});

router.post('/', (req, res) => {
  const { body } = req;
  res.json({
    message: 'created',
    data: body
  });
});

router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const productIndex = products.findIndex(
      (product) => product.id == id
    );

    if (productIndex == -1) res.status(400);

    const { body } = req;

    console.log(body);

    products[productIndex] = body;

    res.json({
      message: 'modified',
      data: products[productIndex]
    });
  } catch (error) {
    console.error(error);
  }
});

router.patch('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const productIndex = products.findIndex(
      (product) => product.id == id
    );

    if (productIndex == -1) res.status(400);

    const { body } = req;

    for (const prop in body) {
      products[productIndex][prop] = body[prop];
    }

    res.json({
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
