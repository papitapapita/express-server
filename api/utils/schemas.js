import Joi from 'joi';

/**
 * Schema for validating an ID parameter.
 * Fields:
 * - `id` (required): A positive integer representing the ID.
 */
const idSchema = Joi.object({
  id: Joi.number().positive().integer().required()
});

/**
 * Common field validations reused across schemas.
 */
const name = Joi.string().min(3).max(50).messages({
  'string.base': '"name" must be a string.',
  'string.empty': '"name" cannot be empty.',
  'string.min': '"name" must have at least 3 characters.',
  'string.max': '"name" must not exceed 50 characters.'
});

const price = Joi.number().positive().messages({
  'number.base': '"price" must be a number.',
  'number.positive': '"price" must be a positive value.'
});

const image = Joi.string().uri().messages({
  'string.uri': '"image" must be a valid URI.'
});

const isBlocked = Joi.boolean().messages({
  'boolean.base': '"isBlocked" must be a boolean value.'
});

const email = Joi.string().email().messages({
  'string.email': '"email" must be a valid email address.'
});

const password = Joi.string()
  .pattern(/^[a-zA-Z0-9]{3,30}$/)
  .messages({
    'string.pattern.base':
      '"password" must contain only alphanumeric characters and be between 3 and 30 characters long.'
  });

const role = Joi.string().messages({
  'string.base': '"role" must be a string.'
});

/**
 * Schema for creating a new product.
 * Fields:
 * - `name` (required): A string between 3 and 50 characters.
 * - `price` (required): A positive number representing the product price.
 * - `image` (optional): A valid URI string for the product image.
 * - `isBlocked` (optional): A boolean indicating whether the product is blocked.
 */
const productSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image,
  isBlocked
}).unknown();

/**
 * Schema for partially updating a product.
 * At least one of the following fields must be provided:
 * - `name`: A string between 3 and 50 characters.
 * - `price`: A positive number.
 * - `image`: A valid URI string.
 * - `isBlocked`: A boolean.
 */
const softProductSchema = Joi.object({
  name,
  price,
  image,
  isBlocked
})
  .or('name', 'price', 'image', 'isBlocked')
  .unknown();

/**
 * Schema for creating a new category.
 * Fields:
 * - `name` (required): A string between 3 and 50 characters.
 * - `image` (optional): A valid URI string for the category image.
 */
const categorySchema = Joi.object({
  name: name.required(),
  image
}).unknown();

/**
 * Schema for partially updating a category.
 * At least one of the following fields must be provided:
 * - `name`: A string between 3 and 50 characters.
 * - `image`: A valid URI string.
 */
const softCategorySchema = Joi.object({
  name,
  image
})
  .or('name', 'image')
  .unknown();

/**
 * Schema for creating a new user.
 * Fields:
 * - `email` (required): A valid email address.
 * - `password` (required): A string with 3-30 alphanumeric characters.
 * - `role` (optional): A string representing the user's role.
 */
const userSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role
}).unknown();

/**
 * Schema for partially updating a user.
 * At least one of the following fields must be provided:
 * - `email`: A valid email address.
 * - `password`: A string with 3-30 alphanumeric characters.
 * - `role`: A string representing the user's role.
 */
const softUserSchema = Joi.object({
  email,
  password,
  role
})
  .or('email', 'password', 'role')
  .unknown();

export {
  idSchema,
  productSchema,
  softProductSchema,
  categorySchema,
  softCategorySchema,
  userSchema,
  softUserSchema
};
