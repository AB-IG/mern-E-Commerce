import express from "express"
import { authenticated,authorisedAdmin } from "../middlewares/auth.js" 
import {
    createOrder,getAllOrders,findOrderbyId,
    countTotalOrders,calculateTotalSales,
    markOrderAsPaid,markOrderAsDelivered,getUserOrders} from "../controllers/orderController.js"

const router = express.Router()

router.route("/create").post(authenticated, createOrder)
router.route("/").get(authenticated, authorisedAdmin, getAllOrders)
router.route("/total-orders").get(authenticated,authorisedAdmin,countTotalOrders)
router.route("/total-sales").get(authenticated,authorisedAdmin,calculateTotalSales)
router.route("/mine").get(authenticated,getUserOrders).get(authenticated,findOrderbyId)
router.route("/:id/pay").put(authenticated,authorisedAdmin,markOrderAsPaid)
router.route("/:id/delivered").post(authenticated,authorisedAdmin,markOrderAsDelivered)
export default router