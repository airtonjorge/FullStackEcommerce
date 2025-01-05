import { Request, Response } from 'express';

export function getProducts(req:Request , res: Response) {
  res.send('The list of Products');
}

export function getProduct(req: Request , res: Response) {
  res.send('The Product');
}

export function createProduct(req: Request , res: Response) {
  res.send('New Product');
}

export function updateProduct(req: Request , res: Response) {
  res.send('Update Product');
}

export function deleteProduct(req: Request , res: Response) {
  res.send('Delete Product');
}