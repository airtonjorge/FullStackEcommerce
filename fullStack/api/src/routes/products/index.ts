import { Router } from "express";
import { getProducts, getProduct, createProduct,updateProduct, deleteProduct } from "./productsControllers.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
//import {z} from 'zod';
import {createProductSchema, updateProductSchema} from '../../db/productsSchema.js';
import { verifySeller, verifyToken } from "../../middlewares/authMiddleware.js";




const router = Router();

router.get('/', getProducts);

router.get('/:id', getProduct);

router.post('/', verifyToken , verifySeller , validateData(createProductSchema) ,createProduct);

router.delete('/:id',verifyToken , verifySeller , deleteProduct);

router.put('/:id', verifyToken , verifySeller , validateData(updateProductSchema) ,updateProduct);
export default router;