import Joi from 'joi';

const idSchema = Joi.object({
  id: Joi.number().positive().integer().required()
});

const productSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  price: Joi.number().positive().required(),
  image: Joi.string().uri().optional(),
  isBlocked: Joi.boolean().required()
});

const softProductSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  price: Joi.number().positive().optional(),
  image: Joi.string().uri().optional(),
  isBlocked: Joi.boolean().optional()
}).or('name', 'price', 'image', 'isBlocked');

export { idSchema, productSchema, softProductSchema };
