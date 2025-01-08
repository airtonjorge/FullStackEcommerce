import express, {json, urlencoded} from 'express';
import productsRoutes from './routes/products/index';
import authRoutes from './routes/auth/index';

const app = express();
app.use(urlencoded({extended: false}));
app.use(json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/products', productsRoutes);
app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});