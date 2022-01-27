const express=require('express');
const port=9999;
const app=express();

const {connectDB} = require('./config/dbConnect');
const router = require("./routes/employeeRoutes");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

connectDB();

app.use("/api",router)
app.listen(port,(err)=>{
    if (err) throw err;
    console.log(`working on ${port}`)
})