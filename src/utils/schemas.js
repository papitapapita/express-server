import Joi from 'joi';

const idSchema = Joi.object({
  id: Joi.number().positive().integer().required()
});

const productSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().positive().required(),
  imageUrl: Joi.string().uri().optional()
});

export { idSchema, productSchema };
