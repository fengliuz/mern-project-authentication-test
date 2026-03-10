export default  function InfoApi(req,res,next){
    console.log(`PATH : ${req.url} , METHOD : ${req.method}`)
    next()
}