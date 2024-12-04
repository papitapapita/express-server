import { categoriesService } from '../services/categoriesService.js';
import { productsService } from '../services/productsService.js';
import { usersService } from '../services/usersService.js';
import { tryCatch } from '../utils/tryCatch.js';

const editProduct = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const product = await productsService.update(id, body);

  res.status(214).json({
    message: 'modified',
    data: product
  });
});

const editCategory = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const category = await categoriesService.update(id, body);

  res.status(214).json({
    message: 'modified',
    data: category
  });
});

const editUser = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const user = await usersService.update(id, body);

  res.status(214).json({
    message: 'modified',
    data: user
  });
});

export { editProduct, editCategory, editUser };
