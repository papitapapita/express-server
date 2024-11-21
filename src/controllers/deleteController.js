import { tryCatch } from '../utils/tryCatch.js';
import { ProductsService } from '../services/productsService.js';

const productsService = new ProductsService();

/**
 * @description delete product
 * @route       DELETE /api/v1/products/:id
 */
function deletePost(req, res, next) {
  tryCatch(() => {
    const { id } = req.params;

    productsService.delete(id);

    res.json({
      message: 'deleted',
      id
    });
  });
}

export { deletePost };
