import express from "express"
import { authenticated,authorisedAdmin } from "../middlewares/auth.js" 
import {
    ceateOrder,getAllOrders,findOrderbyId,
    countTotalOrders,calculateTotalSales,
    markOrderAsPaid,markOrderAsDelivered} from "../controllers/orderController.js"

const router = express.Router()

router.route("/create").post(authenticated, ceateOrder)
router.route("/").get(authenticated, authorisedAdmin, getAllOrders)
router.route("/total-orders").get(authenticated,authorisedAdmin,countTotalOrders)
router.route("/total-sales").get(authenticated,authorisedAdmin,calculateTotalSales)
router.route("/:id").get(authenticated,authorisedAdmin,getUserOrders).get(authenticated,findOrderbyId)
router.route("/:id/pay").get(authenticated,authorisedAdmin,markOrderAsPaid)
router.route("/:id/delivered").post(authenticated,authorisedAdmin,markOrderAsDelivered)
export default router