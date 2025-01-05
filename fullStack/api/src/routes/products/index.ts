import { Router } from "express";
import { getProducts, getProduct, createProduct, 
    updateProduct, deleteProduct } from "./productsControllers";
const router = Router();

router.get('/', getProducts);

router.get('/:id', getProduct);

router.post('/', createProduct);

router.delete('/:id', deleteProduct);

router.put('/:id', updateProduct);
export default router;