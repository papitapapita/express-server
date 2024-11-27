import colors from 'colors';

const methodColors = {
  GET: 'green',
  POST: 'blue',
  PUT: 'yellow',
  DELETE: 'red',
  PATCH: 'magenta'
};

function logger(req, res, next) {
  const color = methodColors[req.method];
  console.log(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`[
      color
    ]
  );
  next();
}

export default logger;
