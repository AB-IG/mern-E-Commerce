import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import conncetDB from "./backend/config/connectDB.js";
import userRoutes from "./backend/routes/userRoutes.js"


dotenv.config()
const port = process.env.PORT


const app = express()


app.use(express.json())
app.use(cookieParser())

conncetDB()

app.use("/auth",userRoutes)


app.listen(port, (req,res) => console.log(`Listening to port ${port}`))