import mongoose from "mongoose";
import { APP_URL } from "../config";

const BannerSchema = new mongoose.Schema({
    sortOrder: { type: Number, required: true },
    menuName: { type: mongoose.Schema.Types.ObjectId, required: true },
    bannerType: { 
        type: Number,
        required: true,
        default: 0,
        enum: [0,1,2],
        description: '0: Default, 1: Home Slider, 2: Box Image'
     },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    click_url: { type: String, required: false },
    description: { type: String, required: true },
    banner_image: { 
        type: String, 
        required: true,
        get: (image) => {
            return (image) ? `${APP_URL}${image}` : '';
        }
     },
    banner_mobile_image: { 
        type: String, 
        required: false,
        get: (image) => {
            return (image) ? `${APP_URL}${image}` : '';
        }
     },
    isActive: { type: Boolean, required: false, default: true }
},{ timestamps: true, toJSON:{getters:true}, id:false });

export default mongoose.model('Banner',BannerSchema, 'Banner');

