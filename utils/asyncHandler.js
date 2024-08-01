const asyncHandler=(fn)=>async(req, res,next)=>{
    try {
        await fn(req,res,next);
    } catch (error) {
        res.status(error.status || 500).send(error.message)
    }
}   

module.exports = asyncHandler;