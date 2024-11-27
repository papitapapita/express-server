const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property]);
    if (error) {
      return res.status(400).json({
        error: 'ValidationError',
        message: error.details
          .map((detail) => detail.message)
          .join(', ')
      });
    }

    req[property] = value;

    next();
  };
};

export default validate;
