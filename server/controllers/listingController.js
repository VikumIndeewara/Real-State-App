import { Listing } from "../Models/listingModel.js"

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