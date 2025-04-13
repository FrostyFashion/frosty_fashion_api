import { Router } from "express";
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/products.js";
import { productPicturesUpload } from "../middlewares/upload.js";

const productRouter = Router();

productRouter.post("/products", productPicturesUpload.array("pictures", 3), addProduct);
productRouter.get("/products/:id", getProduct);
productRouter.get("/products",getProducts);
productRouter.patch("/products/:id", updateProduct);
productRouter.delete("/products/:id", deleteProduct);

export default productRouter;