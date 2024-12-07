import { tryCatch } from '../utils/tryCatch.js';
import { productsService } from '../services/products.js';
import boom from '@hapi/boom';

export default class ProductsController {
  /**
   * @description Get a specific product
   * @route       /api/v1/products/:id
   */
  getProduct() {
    return tryCatch(async (req, res) => {
      const { id } = req.params;
      const product = await productsService.findById(id);

      if (!product) {
        throw boom.notFound(
          `Product with ID ${id} not found`
        );
      }

      res.status(200).json({
        success: true,
        message: 'Product Retrieved',
        data: product
      });
    });
  }

  /**
   * @description Get all products
   * @route       GET /api/v1/products
   */
  getProducts() {
    return tryCatch(async (req, res) => {
      let { size } = req.query;

      if (size) {
        size = parseInt(size);

        if (isNaN(size) || size < 0) {
          throw boom.badRequest('Invalid size parameter');
        }
      }

      const products = await productsService.getAll(size);

      res.status(200).json({
        success: true,
        message: 'Products Retrieved',
        data: products
      });
    });
  }

  /**
   * @description create product
   * @route       POST /api/v1/products
   */
  createProduct() {
    return tryCatch(async (req, res) => {
      const { body } = req;
      console.log(body);
      const product = await productsService.create(body);

      res.status(201).json({
        success: true,
        message: 'Product created',
        data: product
      });
    });
  }

  /**
   * @description Replace a product
   * @route       PUT /api/v1/products/:id
   */
  replaceProduct() {
    return tryCatch(async (req, res) => {
      const { id } = req.params;
      const { body } = req;

      await productsService.replace(id, body);

      res.status(200).json({
        success: true,
        message: 'Product replaced',
        data: body
      });
    });
  }

  /**
   * @description Edit a product
   * @route       PATCH /api/v1/products/:id
   */
  editProduct() {
    return tryCatch(async (req, res) => {
      const { id } = req.params;
      const { body } = req;

      const product = await productsService.update(
        id,
        body
      );

      res.status(200).json({
        success: true,
        message: 'Product updated',
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
        success: true,
        message: 'Product deleted succesfully',
        data: deletedProduct
      });
    });
  }
}
