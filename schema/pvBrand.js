import mongoose from "mongoose";

const PVBrandSchema = new mongoose.Schema({
    brandName: { type: String, required: true },
    slug: { type: String, required: true },
    sortOrder: { type: Number, required: true },
    isActive: { type: Boolean, required: false, default: true }
},{ timestamps: true });

export default mongoose.model('PVBrand',PVBrandSchema, 'PVBrand');

