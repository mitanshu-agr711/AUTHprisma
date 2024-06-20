import dotenv from "dotenv";
dotenv.config();
import express from "express"
const app=express();
app.use(express.json());

app.get('/',(req,res)=>{
    return res.send("hey this is me")
})
let PORT=process.env.PORT||8000
app.listen(PORT,()=>
  console.log(`port is running on ${PORT}`)
)