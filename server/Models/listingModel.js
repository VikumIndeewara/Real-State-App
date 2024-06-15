import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
    propertyname:{
        type:String,
        required:true,
    },
    contactnumber:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    beds:{
        type:Number,
        required:true,
    },
    baths:{
        type:Number,
        required:true,
    },
    floors:{
        type:Number,
        required:true,
    },
    price:{
        type: Number,
        required:true,
    },
    images:{
        type: Array,
        required:true,
      },
    userRef:{
        type:String,
        required:true,
      },
},{timestamps:true});

export const Listing= mongoose.model('Listing',ListingSchema);
