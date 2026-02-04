import express from "express"
import { ENV } from "./lib/env.js"
import { connectDB } from "./lib/db.js";
import {serve} from "inngest/express"
import cors from "cors";
import { inngest } from "./lib/inngest.js";


const app = express()

// middleware
app.use(express.json())

//credentials:true meaning?? => our server allows a browser to include cookies on request
app.use(cors({origin:ENV.CLIENT_URL, credentials:true}))
app.use("api/inngest", serve({client:inngest, functions}))


app.get("/health", (req,res)=>{
    res.status(200).json({msg:"api is up and running"})
})

const startServer = async() => {
    try {
        await connectDB()
        app.listen(ENV.PORT, ()=> console.log("Server is listening on port:", ENV.PORT));
    } catch (error) {
        console.error("💣 Error Starting the Server", error)
    }
}
startServer();