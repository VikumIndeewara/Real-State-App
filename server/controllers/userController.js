import { User } from "../Models/UserModel.js";
import bcryptjs from 'bcryptjs';

export const test = (req,res)=>{
    res.json({
        message:'Api is working',
    });
};

export const update=async(req,res)=>{
    try{
        if(!req.body.username || !req.body.email || !req.body.password || !req.body.avatar){
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }
        if (req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const { id }=req.params;
        const updateResult =await User.findByIdAndUpdate(id,
            {$set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.passsword,
                avatar:req.body.avater,
            }},{new:true}
        );
        

        if(!updateResult){
            return res.status(400).json({message:'User not found'});
        }
        const { password, ...rest } = updateResult._doc;
        return res.status(200).send({
            user:rest,
            message:'user upadated!!'
        });


    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    };
    
};