import { User } from "../Models/UserModel.js";
import bcryptjs from 'bcryptjs';

export const signUp = async(req,res)=>{
    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPassword});
    await newUser.save();
    res.status(201).json('User created successfully!');

};

