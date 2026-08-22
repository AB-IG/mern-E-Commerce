import express from "express"
import { authenticated,authorisedAdmin } from "../middlewares/auth.js"
import { createCategory,updateCategory,getSingleCategory,deleteCategory,getAllCategories } from "../controllers/categoryController.js"


const router = express.Router()

router.route("/").post(authenticated,authorisedAdmin, createCategory)
.get(authenticated,authorisedAdmin,getAllCategories)
router.route("/:id").put(authenticated,authorisedAdmin,updateCategory)
.get(authenticated,authorisedAdmin,getSingleCategory)
.delete(authenticated,authorisedAdmin,deleteCategory)


export default router