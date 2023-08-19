import mongoose from "mongoose";

const PVModelSchema = new mongoose.Schema({
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "PVBrand", required: true },
    modelName: { type: String, required: true },
    slug: { type: String, required: true },
    sortOrder: { type: Number, required: true },
    isActive: { type: Boolean, required: false, default: true }
},{ timestamps: true });

export default mongoose.model('PVModel',PVModelSchema, 'PVModel');

