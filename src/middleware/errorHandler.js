function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  if (err.name === 'ProductValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.message
    });
  }

  res.status(status).json({
    error: err.name || 'InternalServerError',
    message
  });
}

export default errorHandler;
