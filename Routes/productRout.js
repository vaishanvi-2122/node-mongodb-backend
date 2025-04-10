const express=require('express')
const router =express.Router()
const product=require ('../models/Product') 

router.post('/add',async(req,res)=>{
    try{
        const { productname,productprice,productunit,productdescription}=req.body
        const productExist=await product.findOne({productname})
        if (productExist){
            return res.json({
                status:false,
                message:'product already exists'})
    
        }
        const productObj = new product({ productname,productprice,productunit,productdescription})
        await productObj.save()

    }
    catch(err){
        return res.json({
            status:false,
            message:err
        })
    }
})
router.get('/get',async(req,res)=>{
    try{
        const product = await product.find()
         return res.json({
            status:true,
            message:product         
        })
    }
    catch(err){
        return res.json({
            status:false,
            message:err
        })
    }
})

module.exports = router
