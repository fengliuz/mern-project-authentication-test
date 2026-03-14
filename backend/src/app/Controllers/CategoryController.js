import Category from "../Models/Category"

export const createCategory = async(req,res)=>{
    try {
        const {name,description} =req.body
        const slug = name.toLowerCase().split(" ").join("-")
        const newCategory = await Category.create({
            name,description,slug
        })
        res.status(201).json({message:"New category is created successfully",data:newCategory})
    } catch (error) {
        if(error.code === 11000){
            const message = Object.keys(error.keyValue)[0]
            return res.status(400).json({message:`${message} field is already created`})
        }
        res.status(500).json({message:`Failed create new Category ${error.message}`})
    }
}
export const getAllCategories = async(req,res)=>{
    try {
        const categories = await Category.find()
        res.status(200).json({message:"Success to retrieving Categories data",data:categories})
    } catch (error) {
        res.status(500).json({message:`Failed retrieve Categories Data ${error.message}`})
        
    }
}