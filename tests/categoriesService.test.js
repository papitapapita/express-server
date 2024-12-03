import { it } from '@faker-js/faker';
import { CategoriesService } from '../api/services/categoriesService';
import boom, { expectationFailed } from '@hapi/boom';
import Category from '../api/models/category.js';

describe('CategoriesService', () => {
  let service;

  // Intialize a fresh instance before each test
  beforeEach(() => {
    service = new CategoriesService();
  });

  it('should generate 10 categories on intialization', async () => {
    expect(service.categories).toHaveLength(10);
  });

  it('should get all categories with the specified amount', async () => {
    const amount = 10;
    const categories = await service.getAll(amount);
    expect(categories).toHaveLength(amount);
  });

  it('should find a category by ID', async () => {
    const id = 1;
    const product = await service.findById(id);
    expect(product).toBeDefined();
    expect(product.id).toBe(id);
  });

  /*it('should return undefined for a non-existing ID', async () => {
    const invalidCategory = {
      id: 12,
      name: 'testName',
      image: 'image',
      extra: 'invalidProperty'
    };

    expect(() => service.validate(invalidCategory)).toThrow(
      boom.entityTooLarge
    );
  });*/
});
