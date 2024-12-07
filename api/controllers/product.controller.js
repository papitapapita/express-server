import { tryCatch } from '../utils/tryCatch.js';
import { productsService } from '../services/products.js';
import boom from '@hapi/boom';

const { products } = productsService;

export default class productController {
  /**
   * @description gets a specific product
   * @route       /api/v1/products
   */
  getProduct() {
    return tryCatch(async (req, res) => {
      const { id } = req.params;
      const product = await productsService.findById(id);

      if (!product) {
        throw boom.notFound(`id ${id} not found`);
      }

      res.json(product);
    });
  }

  getProducts() {
    return tryCatch(async (req, res) => {
      let { size } = req.query;
      size = parseInt(size);

      if (size >= products.length || !size) {
        return res.json(products);
      }

      res.json(await productsService.getAll(size));
    });
  }

  /**
   * @description create product
   * @route       POST /api/v1/products/
   */
  createProduct() {
    return tryCatch(async (req, res) => {
      const { body } = req;
      console.log(body);
      const product = await productsService.create(body);

      res.status(201).json({
        message: 'created',
        data: product
      });
    });
  }

  replaceProduct() {
    tryCatch(async (req, res) => {
      const { id } = req.params;
      const { body } = req;

      await productsService.replace(id, body);

      res.status(214).json({
        message: 'modified',
        data: body
      });
    });
  }

  editProduct() {
    return tryCatch(async (req, res) => {
      const { id } = req.params;
      const { body } = req;

      const product = await productsService.update(
        id,
        body
      );

      res.status(214).json({
        message: 'modified',
        data: product
      });
    });
  }

  /**
   * @description delete product
   * @route       DELETE /api/v1/products/:id
   */
  deleteProduct() {
    return tryCatch(async (req, res) => {
      const { id } = req.params;

      const deletedProduct =
        await productsService.delete(id);

      res.status(200).json({
        message: 'Product deleted succesfully',
        deletedProduct
      });
    });
  }
}
