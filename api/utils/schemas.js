import Joi from 'joi';

const idSchema = Joi.object({
  id: Joi.number().positive().integer().required()
});

const name = Joi.string().min(3).max(50);
const price = Joi.number().positive();
const image = Joi.string().uri();
const isBlocked = Joi.boolean();
const email = Joi.string().email();
const password = Joi.string().pattern(
  new RegExp('^[a-zA-Z0-9]{3,30}$')
);
const role = Joi.string();

const productSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image,
  isBlocked: isBlocked.required()
});

const softProductSchema = Joi.object({
  name,
  price,
  image,
  isBlocked
}).or('name', 'price', 'image', 'isBlocked');

const categorySchema = Joi.object({
  name: name.required(),
  image
});

const softCategorySchema = Joi.object({
  name,
  image
}).or('name', 'image');

const userSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role
});

const softUserSchema = Joi.object({
  email,
  password,
  role
}).or('email', 'password', 'role');

export {
  idSchema,
  productSchema,
  softProductSchema,
  categorySchema,
  softCategorySchema,
  userSchema,
  softUserSchema
};
