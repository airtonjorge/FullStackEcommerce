import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
  res.send('The list of Products');
});

router.get('/:id', (req, res) => {
  res.send('The Product');
});

router.post('/', (req, res) => {
  res.send('New Product');
});

export default router;