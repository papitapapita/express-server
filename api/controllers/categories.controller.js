import { tryCatch } from '../utils/tryCatch.js';
import { categoriesService } from '../services/categories.js';
import boom from '@hapi/boom';

export default class CategoriesController {
  /**
   * @description Get all categories
   * @route       /api/v1/categories
   */
  getCategories() {
    return tryCatch(async (req, res) => {
      let { size } = req.query;

      if (size) {
        size = parseInt(size);

        if (isNaN(size) || size < 0) {
          throw boom.badRequest('Invalid size parameter');
        }
      }

      const categories =
        await categoriesService.getAll(size);

      res.status(200).json({
        success: true,
        message: 'Categories Retrieved',
        data: categories
      });
    });
  }

  /**
   * @description Get a specific category
   * @route       /api/v1/categories/:id
   */
  getCategory() {
    return tryCatch(async (req, res) => {
      let { id } = req.params;
      const category = await categoriesService.findById(id);

      if (!category) {
        throw boom.notFound(`id ${id} not found`);
      }

      res.json({
        success: true,
        message: 'Category retrieved',
        data: category
      });
    });
  }

  /**
   * @description Create a category
   * @route       /api/v1/categories
   */
  createCategory() {
    return tryCatch(async (req, res) => {
      const { body } = req;
      const category = await categoriesService.create(body);

      res.status(201).json({
        success: true,
        message: 'Category created',
        data: category
      });
    });
  }

  /**
   * @description Replace a category
   * @route       /api/v1/categories/:id
   */
  replaceCategory() {
    return tryCatch(async (req, res) => {
      const { id } = req.params;
      const { body } = req;

      await categoriesService.replace(id, body);

      res.status(200).json({
        success: true,
        message: 'Category replaced',
        data: body
      });
    });
  }

  /**
   * @description Edit a category
   * @route       /api/v1/categories/:id
   */
  editCategory() {
    return tryCatch(async (req, res) => {
      const { id } = req.params;
      const { body } = req;

      const category = await categoriesService.update(
        id,
        body
      );

      res.status(200).json({
        success: true,
        message: 'Category updated',
        data: category
      });
    });
  }

  /**
   * @description Delete a category
   * @route       /api/v1/categories/:id
   */
  deleteCategory() {
    return tryCatch(async (req, res) => {
      const { id } = req.params;

      const deletedCategory =
        await categoriesService.delete(id);

      res.status(200).json({
        success: true,
        message: 'Category deleted',
        data: deletedCategory
      });
    });
  }
}
