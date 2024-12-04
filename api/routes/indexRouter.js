import express from 'express';
import productsRouter from './productsRouter.js';
import categoriesRouter from './categoriesRouter.js';
import usersRouter from './usersRouter.js';

export function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
}
