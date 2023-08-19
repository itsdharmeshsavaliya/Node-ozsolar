import mongoose from "mongoose";

const PackageTypeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    isActive: { type: Boolean, required: false, default: true },
},{ timestamps: true });

export default mongoose.model('PackageType',PackageTypeSchema, 'PackageType');

