import express from 'express';
import { deleteProduct } from '../controllers/deleteController.js';
import { getProduct, getProducts } from '../controllers/getController.js';
import validate from '../middleware/validate.js';
import { idSchema } from '../utils/schemas.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', validate(idSchema, 'params'), getProduct);

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
    const productIndex = products.findIndex((product) => product.id == id);

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

router.delete('/:id', validate(idSchema, 'params'), deleteProduct);

export default router;
