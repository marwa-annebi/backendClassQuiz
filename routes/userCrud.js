const express = require('express')
const router = express.Router()
const User=require('../models/user')
//Getting all 
router.get('/',async(req,res) =>{
 try{
        const users= await User.find()
        res.json(users)
 }catch(err){
    res.status(500).json( {message : err.message})
 }
})
//Getting one
router.get('/:id',getUser,(req,res) =>{
res.json(res.user)

})
//creating one
router.post('/',async(req,res)=>{
    let{name,email,password,age}=req.body;
    const newUser = new User({
        name: name,
        email : email,
        password: password,
        age:age,
        isAdmin:false
      });
      try{
        await newUser.save();
          res.status(200).json(newUser)
      }catch(err){
          res.status(400).json({message : err.message})
      }
})
//updating one
router.patch('/:id',getUser,async (req,res) =>{
    if(req.body.name != null){
        res.user.name=req.body.name
    }
    if(req.body.email != null){
        res.user.email=req.body.email
    }
    if(req.body.password != null){
        res.user.password=req.body.password
    }
    if(req.body.age != null){
        res.user.age=req.body.age
    }
    try{
        const updateUser = await res.user.save()
        res.json(updateUser)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }

})
//deleting one
router.delete('/:id',getUser,async(req,res) =>{
    try{
        await res.user.remove()
        res.json({message :'deleted user success'})
    }catch(err){
        res.status(500).json({message : err.message})
    }
})
async function  getUser(req,res,next){
    let user 
    try{
        user=await User.findById(req.params.id)
        if(user == null){
            return res.status(404).json({message : 'cannot find user'})
        }
    }
    catch(err){
        return res.status(500).json({message : err.message})
    }
    res.user=user
    next()
}
module.exports= router