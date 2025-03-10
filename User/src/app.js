import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
const app=express();

app.use(cors({
    origin:"http://localhost:8000", 
    credentials:true,
    methods: ["GET", "PUT", "POST", "DELETE"],
}))

app.use(express.json({limit:"30kb"}))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.get("/",(req,res)=>{
    res.send("our server are live you can hit any time")
})
import userRouter from "./route/user.js"
app.use("/user",userRouter)

export {app};