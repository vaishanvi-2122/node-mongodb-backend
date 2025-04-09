const cors=require('cors')
const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const User=require('./models/User')

const server=express()
server.use(cors())
server.use(bodyParser.json())

mongoose.connect('mongodb+srv://vaishnavi:vaishnavi%40123@leadsoft.hkqfhux.mongodb.net/?retryWrites=true&w=majority&appName=leadsoft').
then(()=>console.log('database is connected')
).catch((error)=>console.log(error))

server.post('/register',async(req,res)=>{
    try{
        const {fullName,userName,age,password}=req.body
        const userExist=await User.findOne({userName})
        if(userExist){
            return res.json({
                status:false,
                message:'user exists!!'
            })
        }
        const userObj=new User({fullName,userName,age,password})
        await userObj.save()
        res.json({
            status:true,message:'registered successesfully'
        })

    }
    catch(err){
        res.json({
         status:false,
         message:err   
        }) 
       }
})

server.post('/login',async(req,res)=>{
    try{
        const{userName,password}=req.body
        const userExist=await User.findOne({userName})
        if(!userExist){
            return res.json({status:false,message:'user not found'})
        } 
        if (password!==userExist.password){
            return res.json ({status:false,message:'wrong password'})
        }
        return res.json ({status:true,message:'login successfull'})

    }
    catch(err){
        res.json({
            status:false,
            message:`${err}`   
           }) 
    }
})

server.listen(8055,()=>{
    console.log('server is started');
    
})
