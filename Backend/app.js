import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/ProductRoute.js";
import userRoutes from "./routes/userRoute.js";
import cartRoutes from "./routes/CartRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express()

app.use(cors({origin:"https://ecommerce-application-swart.vercel.app",credentials:true}))
app.use(express.json())
app.use(cookieParser())

connectDB();

app.get("/",(req,res)=>{
    res.status(200).send("welcome");
});



app.use('/api/v1/products',productRoutes);
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/cart',cartRoutes);

const PORT= 8080;
app.listen(PORT,(err)=>{
    if(err){
        console.log('server crash',err);
    }
    else{
        console.log("server is running");
    }
})
