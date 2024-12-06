import boom from '@hapi/boom';

const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(
      req[property],
      { abortEarly: false, stripUnknown: true }
    );
    if (error) {
      next(
        boom.badData(
          error.details
            .map((detail) => detail.message)
            .join(', ')
        )
      );
    }

    req[property] = value;

    next();
  };
};

export default validate;
