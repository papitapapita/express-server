import Joi from 'joi';

const idSchema = Joi.object({
  id: Joi.number().positive().integer().required()
});

const name = Joi.string().min(3).max(50);
const price = Joi.number().positive();
const image = Joi.string().uri().optional();
const isBlocked = Joi.boolean();

const productSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image,
  isBlocked: isBlocked.required()
});

const softProductSchema = Joi.object({
  name: name.optional(),
  price: price.optional(),
  image,
  isBlocked: isBlocked.optional()
}).or('name', 'price', 'image', 'isBlocked');

export { idSchema, productSchema, softProductSchema };
