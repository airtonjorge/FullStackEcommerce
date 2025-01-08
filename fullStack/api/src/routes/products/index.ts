import { Router } from "express";
import { getProducts, getProduct, createProduct,updateProduct, deleteProduct } from "./productsControllers";
import { validateData } from "../../middlewares/validationMiddleware";
//import {z} from 'zod';
import {createProductSchema, updateProductSchema} from '../../db/productsSchema';
import { verifySeller, verifyToken } from "../../middlewares/authMiddleware";




const router = Router();

router.get('/', getProducts);

router.get('/:id', getProduct);

router.post('/', verifyToken , verifySeller , validateData(createProductSchema) ,createProduct);

router.delete('/:id',verifyToken , verifySeller , deleteProduct);

router.put('/:id', verifyToken , verifySeller , validateData(updateProductSchema) ,updateProduct);
export default router;