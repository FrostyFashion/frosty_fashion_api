import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

await mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log('Database connected'))
.catch(err => console.log('error'))

app.get('/users',(req,res)=> {
    res.send("Hello world");
})

app.listen(5500, ()=> {
    console.log(`Server is listening on PORT 3000`);
})