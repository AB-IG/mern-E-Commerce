import Product from "../model/ProductModel.js";

export const addProduct = async(req,res) => {
    const {name,brand,category,description,images,price } = req.fields
    try {
         switch(true){
        case !name:
            return res.status(400).json({message:"Name is required"})
        case !brand:
            return res.status(400).json({message:"brand is required"})
        case !category:
            return res.status(400).json({message:"category is required"})
        case !description:
            return res.status(400).json({message:"description is required"})
        case !image:
            return res.status(400).json({message:"image is required"})
        case !price:
            return res.status(400).json({message:"price is required"})
    }

     const product = await Product.create({...req.fields})
     return res.status(201).json({success:true,Products:product})
    } catch (error) {
        return res.status(500).json({success:false,message:"Server error"})

    }

}