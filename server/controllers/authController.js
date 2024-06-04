import { User } from "../Models/UserModel.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";

export const signUp = async(req,res,next)=>{
    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPassword});

    try{
        await newUser.save();
        res.status(201).json('User created successfully!');
    }catch(error){
        next(error);
    }

};

export const signIn = async(req,res,next)=>{
    const {email,password}= req.body;
    try{
    const validUser = await User.findOne({email});
    if (!validUser) return next(errorHandler(404,'User not found!'));
    const validPassword = bcryptjs.compareSync(password,validUser.password);
    if (!validPassword) return next(errorHandler(401,'Password Incorrect!'));
    //we save logged in users ID as a cookie for later use
    const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
    //we exclude the password because we don't need to send it to user with cooke data
    const { password: pass, ...rest } = validUser._doc;// This will log the plain object containing the document data exclude additional Mongoose-specific properties and methods. 
    res
      .cookie('access_token', token, { httpOnly: true })//httpOnly prevent access of other third party applications, we can set cookie expire time also
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }

};

