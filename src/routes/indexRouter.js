import express from 'express';
//import categoriesRouter from './categoriesRouter.js';
import productsRouter from './productsRouter.js';

export function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  //router.use('/categories', categoriesRouter);
}
