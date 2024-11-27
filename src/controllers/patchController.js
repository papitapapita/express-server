import { productsService } from '../services/productsService.js';
import { tryCatch } from '../utils/tryCatch.js';

const editProduct = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const product = await productsService.update(id, body);

  res.status(214).json({
    message: 'modified',
    data: product
  });
});

export { editProduct };
