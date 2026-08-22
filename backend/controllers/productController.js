import Product from "../model/ProductModel.js";

export const addProduct = async(req,res) => {
   
    try {
         const {name,brand,category,description,price } = req.fields
         
         switch(true){
        case !name:
            return res.status(400).json({message:"Name is required"})
        case !brand:
            return res.status(400).json({message:"brand is required"})
        case !category:
            return res.status(400).json({message:"category is required"})
        case !description:
            return res.status(400).json({message:"description is required"})
        case !price:
            return res.status(400).json({message:"price is required"})
    }

     const product = await Product.create({...req.fields})
     return res.status(201).json({success:true,Products:product})
    } catch (error) {
          console.error("ADD PRODUCT ERROR:", error);
        return res.status(500).json({success:false,message:"Server error"})

    }

}
export const fetchProducts = async(req,res) =>{

    try {
        const pages = 4
        const keyword = req.query.keyword ? {name:{$regex:req.query.keyword, $options:"i"}} :{}

    const products = await Product.find({...keyword}).sort({createdAt: -1}).limit(pages)

        res.status(200).json({success:true, products})

    } catch (error) {
          console.error("ADD PRODUCT ERROR:", error);
        return res.status(500).json({success:false,message:"Server error"})
    }
}