import express from 'express';
import productsRouter from './productsRouter.js';

export function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
}
