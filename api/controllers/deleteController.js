import { tryCatch } from '../utils/tryCatch.js';
import { productsService } from '../services/productsService.js';
import { categoriesService } from '../services/categoriesService.js';

/**
 * @description delete product
 * @route       DELETE /api/v1/products/:id
 */
const deleteProduct = tryCatch(async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await productsService.delete(id);

  res.status(200).json({
    message: 'Product deleted succesfully',
    deletedProduct
  });
});

const deleteCategory = tryCatch(async (req, res) => {
  const { id } = req.params;

  const deletedCategory =
    await categoriesService.delete(id);

  res.json({
    message: 'Product deteled succesfully',
    deletedCategory
  });
});

export { deleteProduct, deleteCategory };
