import { User } from "../Models/UserModel.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";

export const signUp = async(req,res,next)=>{

    try{
        const {username,email,password} = req.body;
        const hashedPassword = bcryptjs.hashSync(password,10);
        const newUser = new User({username,email,password:hashedPassword});
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
    const token = jwt.sign({id:validUser._id},"sdvvsvv323r0d")
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

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, "sdvvsvv323r0d");
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, "sdvvsvv323r0d");
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async(req,res,next)=>{
  try{
    res.clearCookie('access_token');
    res.status(200).json('User logged out successfully!');
  }catch(err){
    next(err);
  }
};