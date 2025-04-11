import express from "express";

const app = express();

app.get('/users',(req,res)=> {
    res.send("Hello world");
})

app.listen(5500, ()=> {
    console.log(`Server is listening on PORT 3000`);
})