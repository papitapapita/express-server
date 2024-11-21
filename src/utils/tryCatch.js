export function tryCatch(res, callback) {
  try {
    callback;
  } catch (error) {
    if (error.name == 'ProductValidationError') {
      res.status(400).json({
        message: error.message
      });
    }
  }
}
