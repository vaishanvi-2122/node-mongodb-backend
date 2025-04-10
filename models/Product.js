const mongoose=require('mongoose')
const productSchema=mongoose.Schema({
    productname:{type:String,required:true,unique:true},
    productprice:{type:Number,required:true},
    productunit:{type:String,required:true},
    productdescription:{type:String,required:true}
})
module.exports=mongoose.model('Product',productSchema)