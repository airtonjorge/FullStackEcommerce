import { Request, Response } from 'express';
import { db } from '../../db/index.js';
import { ordersTable } from '../../db/ordersSchema.js';
import { orderItemsTable } from '../../db/ordersSchema.js';

export async function createOrder(req: Request, res: Response) {
   try {
        const { order, items }=req.cleanBody;
        const userId = req.userId;
        if(!userId) {
          res.status(401).json({message: 'Unauthorized'});
          return;
        }

        const [newOrder] = await db
        .insert(ordersTable)
        .values({userId: userId})
        .returning();
     
        // Validate products ids, and take the price from the database
         const orderItems = items.map((item: any) => ({
          ...item,
          orderId: newOrder.id,

         }));


      const newOrderItems = await db
       .insert(orderItemsTable)
       .values(orderItems)
       .returning();

       res.status(201).json({... newOrder, items: newOrderItems});
   } catch (error) {
     res.status(400).json({message: 'Invalid data'});
   }
    
}