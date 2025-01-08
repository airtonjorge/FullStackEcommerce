import express, {json, urlencoded} from 'express';
import productsRoutes from './routes/products/index.js';
import authRoutes from './routes/auth/index.js';
import serverless from "serverless-http";
// Import the postgres driver library at the top of your file



const app = express();
app.use(urlencoded({extended: false}));
app.use(json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/products', productsRoutes);
app.use('/auth', authRoutes);


if (process.env.NODE_ENV === "dev") {
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
}
export const handler = serverless(app);

