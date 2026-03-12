export default async function InfoRoutes(req,res,next){
    console.log(`Req path: ${req.url} with method: ${req.method}`)
    next()
}