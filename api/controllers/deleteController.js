import { tryCatch } from '../utils/tryCatch.js';
import { productsService } from '../services/productsService.js';

/**
 * @description delete product
 * @route       DELETE /api/v1/products/:id
 */
const deleteProduct = tryCatch(async (req, res, next) => {
  const { id } = req.params;

  const deletedProduct = await productsService.delete(
    parseInt(id)
  );

  res.status(200).json({
    message: 'Product deleted succesfully',
    deletedProduct
  });
});

export { deleteProduct };
