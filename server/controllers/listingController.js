import { Listing } from "../Models/listingModel.js"
import { errorHandler } from "../utils/error.js"

export const createListing=async(req,res,next)=>{
    try{
        const newListing = await Listing.create(req.body)
        return res.status(201).json(newListing)
    }catch(err){
        next(err);
    }
}

export const getListing=async(req,res,next)=>{
    try{
        const { id } = req.params;
        const listing = await Listing.findById(id);
        return res.status(201).json(listing)
    }catch(err){
        next(err)
    }
}

export const deleteListing=async(req,res,next)=>{
    try{
        const { id } = req.params;
        const deletedResult = await Listing.findByIdAndDelete(id);
        if(!deletedResult){
            next(errorHandler(400,"Listing not found!!"))
        }
        return res.status(200).send({message:'Listing Deleted!!'})
    }catch(err){
        next(err)
    }
}
 export const updateListing=async(req,res,next)=>{
    try{
        const { id } = req.params;
        const updatedResult = await Listing.findByIdAndUpdate(id,req.body,{ new: true });

        if(!updatedResult){
            return res.status(400).json({message:"listing not found!!"})
        }
        return res.status(200).json(updatedResult)

    }catch(err){
        next(err)
    }
 }