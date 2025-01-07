import { Request, Response } from 'express';
import { db } from '../../db/index';
import { productsTable, createProductSchema } from '../../db/productsSchema';
import { eq } from 'drizzle-orm';
import _ from 'lodash';

export async function getProducts(req:Request , res: Response) {

try {
  const products = await db.select().from(productsTable);
  res.json(products);
} catch (error) {
  res.status(500).send(error);
}
  
}

export async function getProduct(req: Request , res: Response) {
  try {
    const {id} = req.params;
    const product = await db.select().from(productsTable).where(eq(productsTable.id,Number(id)));
    if(!product){
      res.status(404).send('Product not found');
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function createProduct(req: Request , res: Response) {
  console.log(req.body);
  try{

 
    const [product] = await db.insert(productsTable).values(req.cleanBody).returning();
    res.status(201).json(product);
  }
  catch (e) {
    res.status(500).send(e);

} }

export async function updateProduct(req: Request , res: Response) {
  try {
    const {id} = req.params;
    const updateFields = req.cleanBody;
    const [product] = await db.update(productsTable)
    .set(updateFields)
    .where(eq(productsTable.id,Number(id)))
    .returning();

    if(product){
      res.json(product);
    } else {
      res.status(404).send('Product not found');
  } 
}
  
  catch (error) {
    res.status(500).send(error);
  }
}

export async function deleteProduct(req: Request , res: Response) {
  try {
    const {id} = req.params;
    const product = await db.delete(productsTable).where(eq(productsTable.id,Number(id)));
    if(product){
      res.json('Product deleted');
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
}