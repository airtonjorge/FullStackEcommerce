import express from 'express';
import productsRoutes from './routes/products/index';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.use('/products', productsRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});