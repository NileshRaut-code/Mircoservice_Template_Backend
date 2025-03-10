
import mongoose from "mongoose"
const dbconnect = async()=>{
    try {
        const MongoINstance=await mongoose.connect("mongodb://localhost:27017/ecommerse")
        console.log("Your Mongodb is connected host:" ,MongoINstance.connection.host)
    } catch (error) {
        console.log("some error occured",error);
        process.exit(1);
    }
}

export {dbconnect}