import express from 'express';
import productsRouter from './products.js';
import categoriesRouter from './categories.js';
import usersRouter from './users.js';

export function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
}
