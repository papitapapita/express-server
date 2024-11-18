import express from 'express';
import { routerApi } from './routes/indexRouter.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello');
});

routerApi(app);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
