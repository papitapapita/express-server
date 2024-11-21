import express from 'express';
import path from 'node:path';
import { routerApi } from './routes/indexRouter.js';
import process from 'node:process';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';

const { dirname } = import.meta;
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(dirname, 'public')));
app.use(logger);

app.get('/about', (req, res) => {
  res.sendFile(path.join(dirname, 'public', 'about.html'));
});

routerApi(app);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
