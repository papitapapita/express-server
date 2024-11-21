export function tryCatch(res, callback) {
  try {
    callback;
  } catch (error) {
    if (error.name == 'ProductValidationError') {
      return res.status(400).json({
        message: error.message
      });
    }

    res.status(500).json({
      message: 'Internal server error'
    });
  }
}
