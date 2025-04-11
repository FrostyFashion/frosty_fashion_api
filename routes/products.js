import { Router } from "express";
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/products";
import { productImageUpload } from "../middlewares/upload.js";

const productRouter = Router();

productRouter.post("/products", productImageUpload.single("image"), addProduct);
productRouter.get("/products/:id", getProduct);
productRouter.get("/products",getProducts);
productRouter.patch("/products/:id", updateProduct);
productRouter.delete("/products/:id", deleteProduct);

export default productRouter;