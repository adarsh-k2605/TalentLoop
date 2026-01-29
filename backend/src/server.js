import express from "express"
import { ENV } from "./lib/env.js"


const app = express()

console.log(ENV.PROT);
console.log(ENV.DB_URL);

app.get("/health", (req,res)=>{
    res.status(200).json({msg:"api is up and running"})
})

app.listen(3000, ()=>{
    console.log("Server is listening on port:", ENV.PROT);
    
})