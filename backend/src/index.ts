import { Request, Response } from 'express';
import { sampleProducts } from './data/sampleProducts';

const PORT = 4004;
const express = require('express');
const cors = require('cors');
const app = express();
app.use((req: Request, res: Response, next: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:' + PORT, 'http://127.0.0.1:' + PORT],
  })
);
app.get('/api/products', (req: Request, res: Response) => {
  res.json(sampleProducts);
});
app.get('/api/products/::slug', (req: Request, res: Response) => {
  res.send(sampleProducts.find((p) => p.slug === req.params.slug));
});
app.listen(PORT, () => {
  console.log('Started at http://localhost:' + PORT);
});
