import { Request, Response } from 'express';
import { db } from '../../db/index.js';
import { ordersTable, orderItemsTable} from '../../db/ordersSchema.js';
import { eq } from 'drizzle-orm';

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
        //@ts-ignore
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

// if req.role admin, return all orders
// if req.role is seller, return only orders filtered by sellerId
// else, return only orders filtered by userId
export async function listOrders(req: Request, res: Response) {
 try{
     const  orders = await db.select().from(ordersTable);
     res.json(orders);
 } catch (error) {
   res.status(400).json({message: 'Invalid data'});
 }
}

export async function getOrder(req: Request, res: Response) {
  try {
       const id = parseInt (req.params.id);
       const orderWithItems = await db.select()
       .from(ordersTable)
       .where(eq(ordersTable.id, id))
       .leftJoin(orderItemsTable, eq(ordersTable.id, orderItemsTable.orderId));

        if(orderWithItems.length === 0 ) {
          res.status(404).json({message: 'Order not found'});
          return;
        }

        const mergedOrder = { 
          ... orderWithItems[0].orders,
          items: orderWithItems.map( oi => oi.order_items)
        }

        res.status(200).json(mergedOrder);
  } catch (error) {
    console.log(error);
  }
}

export async function updateOrderSchema(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    const { status } = req.cleanBody;

    const [updatedOrder] = await db
    .update(ordersTable)
    .set(req.body)
    .where(eq(ordersTable.id, id))
    .returning();
    if(!updatedOrder) {
      res.status(404).json({message: 'Order not found'});
      return;
    } 
   else {
     res.status(200).json(updatedOrder);
   }
  } catch (error) {
    res.status(400).json({message: 'Invalid data'});
  }
}