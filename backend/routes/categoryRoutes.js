import express from "express"
import { authenticated,authorisedAdmin } from "../middlewares/auth.js"


const router = express.Router()

router.route("/create").post(createCategory)
router.route("/:id").put(updateCategory).get(getSingleCategory).delete(deleteCategory)
router.get("/categories",getAllCategories)

export default router