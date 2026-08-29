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
          console.error("fetch PRODUCT ERROR:", error);
        return res.status(500).json({success:false,message:"Server error"})
    }
}
export const fetchTopProducts = async (req,res) => {

    try {
        const topProducts = await Product.find({rating: -1}).limit(5)

        res.status(200).json({success:true, topProducts})
        
    } catch (error) {
          console.error("FetchTopProducts PRODUCT ERROR:", error);
        return res.status(500).json({success:false,message:"Server error"})
    }
}

export const addReview = async (req,res) => {

    try {
        const {rating,comment} = req.body

        const product = await Product.findById(req.params.id)

        if(product){
            const alreadyReviewed = await product.reviews.find((r) => r.user.toString() === req.user._id.toString())

            if(alreadyReviewed){
                return res.status(400).json({success:false, message:"Already reviewed..."})
            }

            const review = {
                name: req.user.name,
                rating:Number(rating),
                comment,
                user: req.user._id
            }

             product.reviews = [...product.reviews, review]//or //product.reviews.push(review)
             product.numReviews = product.reviews.length
             product.rating = product.reviews.reduce((acc,item) => acc + item.rating,0)/product.reviews.length

        }
        await product.save()
        res.status(200).json({success:true,message:"Review Added successfully..."})
    } catch (error) {
        console.error("Add Review PRODUCT ERROR:", error);
        return res.status(500).json({success:false,message:"Server error"})
    }
}
export const fetchProductById = async (req,res) => {

    try {
        const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(404).json({success:false, message:"Product not found!"})
        }

        res.status(200).json({success:true,product})
        
    } catch (error) {
         console.error("find PRODUCT ERROR:", error);
        return res.status(500).json({success:false,message:"Server error"})
    }
}
export const updateProduct = async (req,res) => {

    try {
        const {id} = req.params
        const productExist = await Product.findById(id)
        console.log("ID:", id);
console.log("FIELDS:", req.fields);


        if(!productExist){
            return res.status(404).json({success:false, message:"Product not found..."})

        }


        const updatedProduct = await Product.findByIdAndUpdate(id,{$set: req.fields},{new:true, runValidators:true})

return res.status(200).json({success:true,updatedProduct})
    } catch (error) {
          console.error("Update PRODUCT ERROR:", error);
        return res.status(500).json({success:false,message:"Server error"})
    }
}
export const deleteProduct = async (req,res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)

        if(!product){
            return res.status(404).json({success:false, message:"Product not found"})
        }

        return res.status(200).json({success:true,message:"Product deleted successfully..."
        })
        
    } catch (error) {
         console.error("find PRODUCT ERROR:", error);
        return res.status(500).json({success:false,message:"Server error"})
    }
} 
export const fetchNewProduct = async (req,res) => {

    try {
        const product = await Product.find().sort({ _id : -1}).limit(3)
        return res.status(200).json({success:true,product})
    } catch (error) {
           console.error("fetching new PRODUCT ERROR:", error);
        return res.status(500).json({success:false,message:"Server error"})
    }
}