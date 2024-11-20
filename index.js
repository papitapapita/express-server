import express from 'express';
import path from 'node:path';
import { routerApi } from './routes/indexRouter.js';

const { dirname } = import.meta;
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(dirname, 'public')));

app.get('/about', (req, res) => {
  res.sendFile(path.join(dirname, 'public', 'about.html'));
});

routerApi(app);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
