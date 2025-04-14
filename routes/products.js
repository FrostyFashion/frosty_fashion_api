import { Router } from "express";
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/products.js";
import { productPicturesUpload } from "../middlewares/upload.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const productRouter = Router();

productRouter.post("/products",isAuthenticated,isAuthorized(['vendor','admin']), productPicturesUpload.array("pictures", 3), addProduct);
productRouter.get("/products/:id", getProduct);
productRouter.get("/products", getProducts);
productRouter.patch("/products/:id",isAuthenticated,isAuthorized(['vendor','admin']), updateProduct);
productRouter.delete("/products/:id",isAuthenticated, isAuthorized(['vendor','admin']), deleteProduct);

export default productRouter;