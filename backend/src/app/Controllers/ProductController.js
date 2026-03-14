import Category from "../Models/Category"
import Product from "../Models/Product"

export const createProduct = async(req,res)=>{
    try {
        const {sku,name,description,stock,minStock,categoryId,price,unit} =req.body
        const categoryExists = await Category.findById(categoryId)
        if(!categoryExists){
            return res.status(404).json({message:"Category Id not found"})
        }
        const newProduct = await Product.create({
            sku,name,description,stock,minStock,category:categoryId,price,unit,createdBy:req.user._id
        })
        res.status(201).json({message:"New Product is created successfully",data:newProduct})
    } catch (error) {
        if(error.code === 11000){
            const field = Object.keys(error.keyValue)[0]
            return res.status(201).json({message:`${field} already created`})
        }
        res.status(500).json({message:`Failed create new Product ${error.message}`})
    }
}
export const getAllProducts = async(req,res)=>{
    try {
        const products = await Product.find().populate("category","name").populate("createdBy","username")
        res.status(200).json({message:"Success to retrieving Products data",data:products})
    } catch (error) {
        res.status(500).json({message:`Failed retrieve Products Data ${error.message}`})
        
    }
}