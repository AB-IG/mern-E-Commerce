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
const getAllOrders = async (req,res) => {
    try {
        const order = await Order.find({}).populate("user", "name email")

        return res.status(200).json({success:true,Orders: order})
    } catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
}
const findOrderbyId = async (req,res) => {}
const countTotalOrders = async (req,res) => {
    try {
        const orders = await Order.countDocuments()

        return res.status(200).json({success:true, Total_Orders: orders})
    } catch (error) {
         return res.status(500).json({success:false, message:error.message})
    }
}
const calculateTotalSales = async (req,res) => {

    try {
        const order = await Order.find({})

        const totalSales = order.reduce((sum, order) => sum + order.totalPrice,0)

        return res.status(200).json({success:true, Total_Sales: totalSales})
    } catch (error) {
                 return res.status(500).json({success:false, message:error.message})
    }
}
const markOrderAsPaid = async (req,res) => {

    try {

        const order = await Order.findById(req.params.id)

        if(order){
            order.isPaid = true,
            order.paidAt = Date.now(),
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                updated_time: req.body.updated_time,
                email_address : req.body.payer.email_address
            }
             const updatedOrder = await order.save()
             res.status(200).json(updatedOrder)
        }else {
            res.status(404).json({success:false, message:"Order not found"})
        }

       
        
    } catch (error) {
                 return res.status(500).json({success:false, message:error.message})
    }
}
const markOrderAsDelivered = async (req,res) => {

    try {
        
        const order = await Order.findById(req.params.id)

        if(order){
            order.isDelivered = true,
            order.deliveredAt = Date.now()

            const updatedOrder = await order.save()
            res.status(200).json(updatedOrder)
        }else{
            res.status(404).json({success:false, message:"order not found"})
        }
    } catch (error) {
          return res.status(500).json({success:false, message:error.message})
    }
}
const getUserOrders = async (req,res) => {

    try {
        const order = await Order.find({user:req.user._id})

        if(!order){
            return res.status(404).json({success:false, message:"No order Found!"})
        }

        return res.status(200).json({success:true, order})
    } catch (error) {
           return res.status(500).json({success:false, message:error.message})
    }
}
export {
    createOrder,getAllOrders,findOrderbyId,
    countTotalOrders,calculateTotalSales,
    markOrderAsPaid,markOrderAsDelivered,getUserOrders}