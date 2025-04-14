import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import productRouter from "./routes/products.js";

// Create an express app
const app = express();

// Make a database connection
await mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log('Database connected'))
.catch(err => console.log('error'))

// Use global middlewares
app.use(express.json());

// Use routes
app.use("/api", productRouter);

// Enable cors for all routes
app.use(cors());

// Listen for incoming requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Server is listening on PORT ${PORT}`);
})