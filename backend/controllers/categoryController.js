import Category from "../model/CategoryModel.js"


const createCategory = async (req,res) =>{
    const {name} = req.body

    if(!name){
        return res.status(400).json({success:false, message:"Name is required..."})

    }

    try {
        const categoryExist = await Category.findOne({name})

        if(categoryExist){
            return res.status(400).json({success:false, message:"Category already exist!"})
        }
        const category = await Category.create({name})
        
        res.status(201).json({success:true,message:`${name} category created successfully...`,category})
    } catch (error) {
        res.status(500).json({success:false,message:"server error"})
    }
}
const updateCategory = async (req,res) =>{
    const {name} = req.body
    const {id} = req.params

    try {

        const categoryExist = await Category.findOne({name: name, _id: {$ne: id}})

        if(categoryExist){
            return res.status(400).json({message:`${name} category already exist`})
        }
        const updatedCategory = await Category.findByIdAndUpdate(id,{name},{new:true, runValidators: true})

        if(!updatedCategory){
            return res.status(404).json({success:false,message:"Category not found"})
        }
        await updatedCategory.save()
        res.status(200).json({success:true,message:`category  has been updated successfully`,updatedCategory
        })
    } catch (error) {
         res.status(500).json({success:false,message:"server error"})
    }
}
const getSingleCategory = async (req,res) =>{
    const {id} = req.params

    try {
        const category = await Category.findOne({_id:id})

        if(!category){
            return res.status(404).json({success:false,message:"Category not found"})
        }

        res.status(200).json({success:true,category})
    } catch (error) {
      return   res.status(500).json({success:false,message:"server error"})
    }
}
const deleteCategory = async (req,res) =>{
    
    try {
        const deleteCate = await Category.findByIdAndDelete(req.params.id)

        if(!deleteCate){
          return res.status(404).json({success:false,message:"Category not found"})
        }

       return res.status(200).json({success:true,message:"Category deleted successfully"})
    } catch (error) {
       return res.status(500).json({success:false,message:"server error"})
    }
}
const getAllCategories = async (req,res) =>{

    try {
        const categories = await Category.find({})

      return  res.status(200).json({success:true,categories})
    } catch (error) {
        return res.status(500).json({success:false,message:"server error"})
    }
}


export {createCategory,updateCategory,getSingleCategory,deleteCategory,getAllCategories}