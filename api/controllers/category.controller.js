import { tryCatch } from '../utils/tryCatch.js';
import { categoriesService } from '../services/categories.js';
import boom from '@hapi/boom';

const { categories } = categoriesService;

export default class CategoryController {
  getCategories() {
    return tryCatch(async (req, res) => {
      let { size } = req.query;
      size = parseInt(size);

      if (size >= categories.length || !size) {
        return res.json(categories);
      }

      res.json(await categoriesService.getAll(size));
    });
  }

  getCategory() {
    return tryCatch(async (req, res) => {
      let { id } = req.params;
      const category = await categoriesService.findById(id);

      if (!category) {
        throw boom.notFound(`id ${id} not found`);
      }

      res.json(category);
    });
  }

  createCategory() {
    return tryCatch(async (req, res) => {
      const { body } = req;
      const category = await categoriesService.create(body);

      res.status(201).json({
        message: 'created',
        data: category
      });
    });
  }

  replaceCategory() {
    return tryCatch(async (req, res) => {
      const { id } = req.params;
      const { body } = req;

      await categoriesService.replace(id, body);

      res.status(214).json({
        message: 'modifed',
        data: body
      });
    });
  }

  editCategory() {
    return tryCatch(async (req, res) => {
      const { id } = req.params;
      const { body } = req;

      const category = await categoriesService.update(
        id,
        body
      );

      res.status(214).json({
        message: 'modified',
        data: category
      });
    });
  }

  deleteCategory() {
    return tryCatch(async (req, res) => {
      const { id } = req.params;

      const deletedCategory =
        await categoriesService.delete(id);

      res.json({
        message: 'Category deteled succesfully',
        deletedCategory
      });
    });
  }
}
