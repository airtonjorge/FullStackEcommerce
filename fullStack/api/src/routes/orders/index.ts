import { Router } from "express";
import { createOrder } from "./ordersController";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { insertOrderWithItemsSchema} from "../../db/ordersSchema.js";
import { verifyToken } from "../..//middlewares/authMiddleware";
import { listOrders, getOrder, updateOrderSchema } from "./ordersController";

const router = Router();

router.post('/', verifyToken ,validateData(insertOrderWithItemsSchema), 
createOrder);

router.get('/', verifyToken, listOrders);
router.get('/:id', verifyToken, getOrder);
router.put('/:id', verifyToken, validateData(insertOrderWithItemsSchema), updateOrderSchema);
export default router;



