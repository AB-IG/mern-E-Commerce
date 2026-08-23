import express from "express"
import expressFormidable from "express-formidable";
//Admin
import { authenticated,authorisedAdmin } from "../middlewares/auth.js"
//Product controller
import { addProduct, fetchProductById, fetchProducts, fetchTopProducts,updateProduct,deleteProduct, addReview } from "../controllers/productController.js"
const router = express.Router()

router.route("/").post(expressFormidable(),authenticated,authorisedAdmin,addProduct).get(fetchProducts)
router.get("/top",fetchTopProducts)
router.post("/:id/review",authenticated,addReview)
router.route("/:id").get(fetchProductById).put(authenticated,authorisedAdmin,updateProduct).delete(authenticated,authorisedAdmin,deleteProduct)
export default router