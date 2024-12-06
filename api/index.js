import express from 'express';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { routerApi } from './routes/index.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import corsMiddleware from './utils/cors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(corsMiddleware());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);

app.get('/api/about', (req, res) => {
  res.render('index', {
    title: 'About',
    message: 'Hello there'
  });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

routerApi(app);
app.use(errorHandler);

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

export default app;
