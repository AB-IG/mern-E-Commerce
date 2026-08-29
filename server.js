import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import expressFormidable from "express-formidable";
import conncetDB from "./backend/config/connectDB.js";
import userRoutes from "./backend/routes/userRoutes.js"
import categoryRoutes from "./backend/routes/categoryRoutes.js"
import productRoutes from "./backend/routes/productRoutes.js"



dotenv.config()
const port = process.env.PORT


const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(expressFormidable());

conncetDB()

app.use("/auth",userRoutes)
app.use("/category",categoryRoutes)
app.use("/products",productRoutes)


app.listen(port, (req,res) => console.log(`Listening to port ${port}`))