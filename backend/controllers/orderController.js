import Order from "../model/OrderModel.js";
import Product from "../model/ProductModel.js";
import calPrices from "../utils/calPrices.js";

const createOrder = async (req, res) => {
    try {
        const {orderItems, shippingAddress, paymentMethod} = req.body



        if(!orderItems || orderItems.length === 0) {
            return res.status(400).json({success:false, message:"fill all fields,oderItems"})
        }

        if(!shippingAddress?.address || !shippingAddress?.city || !shippingAddress?.postalCode || !shippingAddress?.country) {

            return res.status(400).json({success:false, message:"Fill all fields, address"})
        }
        // if(!paymentMethod){
        //     return res.status(400).json({success:false, message:"Fill all fields, payment"})
        // }
 

        const itemsFromDB = await Product.find({_id: {$in: orderItems.map((item) => item.product)}
       
    })
     console.log("searching for:", orderItems.map(i=>i.product), "found:", itemsFromDB.length)

        const dbOrderItems = orderItems.map((itemsFromClient) => {
            const matchingItemFromDB = itemsFromDB.find((itemFromDB)=> itemFromDB._id.toString() === itemsFromClient.product)
              if(!matchingItemFromDB){
                throw new Error("Product not found")
            }
            return {
                
                name: matchingItemFromDB.name,
                image: matchingItemFromDB.image,
                price: matchingItemFromDB.price,
                qty: itemsFromClient.qty,
                product: matchingItemFromDB._id
            }
        })
        
     const    {itemPrice, shippingPrice, taxPrice, totalPrice} = calPrices(dbOrderItems)

          const order = await Order.create({
            user: req.user._id,
            orderItems: dbOrderItems,
            shippingAddress,
            paymentMethod: paymentMethod || "payPal",
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice
          })

          return res.status(201).json({success:true, message: order})
        
    } catch (error) {
        return res.status(500).json({success:false,message: error.message})
    }
}
const getAllOrders = async (req,res) => {}
const findOrderbyId = async (req,res) => {}
const countTotalOrders = async (req,res) => {}
const calculateTotalSales = async (req,res) => {}
const markOrderAsPaid = async (req,res) => {}
const markOrderAsDelivered = async (req,res) => {}
const getUserOrders = async (req,res) => {}
export {
    createOrder,getAllOrders,findOrderbyId,
    countTotalOrders,calculateTotalSales,
    markOrderAsPaid,markOrderAsDelivered,getUserOrders}