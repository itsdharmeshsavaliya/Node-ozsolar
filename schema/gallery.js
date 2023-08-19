import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    sortOrder: { type: Number, required: true },
    isActive: { type: Boolean, required: false, default: true },
},{ timestamps: true });

export default mongoose.model('Gallery',GallerySchema, 'Gallery');

