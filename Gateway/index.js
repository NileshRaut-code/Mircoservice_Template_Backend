import express from "express"
import {createProxyMiddleware} from "http-proxy-middleware"

const app=express();


app.use("/user",(req,res,next)=>{
  console.log("forwared to 8001 service");
  next()
  
},createProxyMiddleware({
    target: 'http://localhost:8001',
  changeOrigin: true,
  pathRewrite: {
    '^/': '/user/', 
  },
}))


app.use("/product",(req,res,next)=>{
  console.log("forwared to 8002 service");
  next()
  
},createProxyMiddleware({
    target: 'http://localhost:8002',
  changeOrigin: true,
  pathRewrite: {
    '^/': '/product/', 
  },
}))

app.listen(8000,()=>{
    console.log("The Server is running on the 8000");
    
})