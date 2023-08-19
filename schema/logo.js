import mongoose from "mongoose";
import { APP_URL } from "../config";

const LogoSchema = new mongoose.Schema({
    // title: { type: String, required: true },
    // slug: { type: String, required: true },
    logo_image: { 
        type: String, 
        required: true,
        get: (image) => {
            return (image) ? `${APP_URL}${image}` : '';
        }
     },
    // isActive: { type: Boolean, required: false, default: true }
    
},{ timestamps: true, toJSON:{getters:true}, id:false });

export default mongoose.model('Logo',LogoSchema, 'Logo');

