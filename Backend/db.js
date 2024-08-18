import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const URL=process.env.MONGO_URL;

const connectDB= async()=>{
    try{
        mongoose.set('strictQuery',false);
        mongoose.connect(URL
        ).then(console.log("connected successfully"))
    }
    catch(e){
        console.log(e);
    }
}
export default connectDB;
