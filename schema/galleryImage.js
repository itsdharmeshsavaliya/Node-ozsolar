import mongoose from "mongoose";
import { APP_URL } from "../config";

const GalleryImageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    sortOrder: { type: Number, required: true },
    gallery: { type: mongoose.Schema.Types.ObjectId, ref: "Gallery", required: true },
    description: { type: String, required: true },
    gallery_image: { 
        type: String, 
        required: true,
        get: (image) => {
            return (image) ? `${APP_URL}${image}` : '';
        }
     },
    isActive: { type: Boolean, required: false, default: true }
    
},{ timestamps: true, toJSON:{getters:true}, id:false });

export default mongoose.model('GalleryImage',GalleryImageSchema, 'GalleryImage');

