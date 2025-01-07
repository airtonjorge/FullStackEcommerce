import { Router } from "express";
import { getProducts, getProduct, createProduct,updateProduct, deleteProduct } from "./productsControllers";
import { validateData } from "../../middlewares/validationMiddleware";
//import {z} from 'zod';
import {createProductSchema, updateProductSchema} from '../../db/productsSchema';




const router = Router();

router.get('/', getProducts);

router.get('/:id', getProduct);

router.post('/', validateData(createProductSchema) ,createProduct);

router.delete('/:id', deleteProduct);

router.put('/:id', validateData(updateProductSchema) ,updateProduct);
export default router;