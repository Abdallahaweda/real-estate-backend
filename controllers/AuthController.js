import User from "../models/UserModel.js"
import bcrypt from 'bcryptjs'
import { errorHandeler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

export const signup =async(req,res,next)=>{
    const {username,email,password}=req.body
    const hashedPassword=bcrypt.hashSync(password,10)
    const newUser=new User({username,email,password:hashedPassword})
    try{

        await newUser.save()
        res.status(201).json({message:"user created successfully"})
    }catch(error){
        next(error)
    }
}

export const signin=async(req,res,nex)=>{
    const{username,password}=req.body
    try {
        const validUser=await User.findOne({username})
    if(!validUser)return next(errorHandeler(404,'User not found!'))
    const validPassword=bcrypt.compareSync(password,validUser.password)
    if(!validPassword)return next(errorHandeler(401,'Wrong Password!'))
    const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)
    const {password:pass,...rest}=validUser._doc
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
    } catch (error) {
        next(error)        
    }
}