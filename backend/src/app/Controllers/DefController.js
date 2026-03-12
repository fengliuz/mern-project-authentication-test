export const apiAuthorize    = async(req,res)=>{
    return res.status(200).json({messsage:"Authenticated",data:req.user})
}