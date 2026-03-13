import Category from "../Models/Category";
export const createCategory= async(req,res)=>{
    try {
        const {name,description} = req.body
        const slug = name.toLowerCase().split(" ").join("-")
        const newCategory = await Category.create({name,description,slug})
        res.status(201).json({ message: "A new category created successfully", data: newCategory });
    } catch (error) {
        res.status(500).json({ message: "Failed create new category", error: error.message });
    }
}
export const getAllCategories = async(req,res)=>{
    try {
        const categories = await Category.find()
        res.status(200).json({message:"Success retrieved all data from categories",data:{categories}})
    } catch (error) {
        res.status(500).json({ message: "Failed to retieved all data from categories ", error: error.message });
        
    }
}