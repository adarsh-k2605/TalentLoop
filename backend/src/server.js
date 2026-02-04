import express from "express"
import { ENV } from "./lib/env.js"
import { connectDB } from "./lib/db.js";


const app = express()
app.get("/health", (req,res)=>{
    res.status(200).json({msg:"api is up and running"})
})

const startServer = async() => {
    try {
        await connectDB()
        app.listen(ENV.PROT, ()=> console.log("Server is listening on port:", ENV.PROT));
    } catch (error) {
        console.error("💣 Error Starting the Server", error)
    }
}
startServer();