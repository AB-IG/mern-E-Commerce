import express from "express"
import expressFormidable from "express-formidable";
//Admin
import { authenticated,authorisedAdmin } from "../middlewares/auth.js"
//Product controller
import { addProduct } from "../controllers/productController.js"
const router = express.Router()

router.route("/").post(expressFormidable(),authenticated,authorisedAdmin,addProduct)

export default router