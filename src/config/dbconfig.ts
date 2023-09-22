import mongoose from 'mongoose';


const connectDB = ()=>{
    try{
        mongoose.connect(process.env.MONGO_URL!);

        const connection = mongoose.connection

        connection.on("connected", ()=>{
            console.log("Mongodb connected")
        })


        connection.on("error", (error)=>{
            console.log("Mongodb connection failed")
            console.log(error);
        })
    }
    catch(error){
        console.log(error);
    }
}


export default connectDB;

