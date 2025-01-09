import { Router } from "express";
import { createOrder } from "./ordersController";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { insertOrderWithItemsSchema} from "../../db/ordersSchema.js";
import { verifyToken } from "../..//middlewares/authMiddleware";

const router = Router();

router.post('/', verifyToken ,validateData(insertOrderWithItemsSchema), 
createOrder);

export default router;



