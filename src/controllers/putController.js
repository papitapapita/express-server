import { productsService } from '../services/productsService.js';
import { tryCatch } from '../utils/tryCatch.js';

const replaceProduct = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  await productsService.replace(id, body);

  res.status(214).json({
    message: 'modified',
    data: body
  });
});

export { replaceProduct };
