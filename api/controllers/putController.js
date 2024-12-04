import { categoriesService } from '../services/categoriesService.js';
import { productsService } from '../services/productsService.js';
import { usersService } from '../services/usersService.js';
import { tryCatch } from '../utils/tryCatch.js';

const replaceProduct = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  await productsService.replace(id, body);

  res.status(214).json({
    message: 'modified',
    data: body
  });
});

const replaceCategory = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  await categoriesService.replace(id, body);

  res.status(214).json({
    message: 'modifed',
    data: body
  });
});

const replaceUser = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  await usersService.replace(id, body);

  res.status(214).json({
    message: 'modified',
    data: body
  });
});

export { replaceProduct, replaceCategory, replaceUser };
