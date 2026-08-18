import express from  "express"
import { createUser,loginUser,logout,getAllUsers, updateUser, deleteUser,getSingleUser,verifyEmail,forgetPassword,resetPassword } from "../controllers/userController.js"
import { authenticated, authorisedAdmin } from "../middlewares/auth.js"

const router = express.Router()


router.route("/create").post(createUser)
router.post("/verify-email",verifyEmail)
router.post("/login",loginUser)
router.post("/forget-password",forgetPassword)
router.post("/reset-password",resetPassword)
router.post("/logout",authenticated,logout)
router.get("/users",authenticated,authorisedAdmin,getAllUsers)
router.route("/users/:id").delete(authenticated,authorisedAdmin,deleteUser)
.get(authenticated,authorisedAdmin,getSingleUser)
.put(authenticated,updateUser)

export default router