import mongoose from "mongoose";

const CMSSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    sortOrder: { type: Number, required: true, unique: true },
    description: { type: String, required: true },
    metaTitle: { type: String, required: true },
    metaKeyword: { type: String, required: true },
    metaDescription: { type: String, required: true },
    isActive: { type: Boolean, required: false, default: true },
    isExternalPageURL: { type: Boolean, required: false, default: true }
    
},{ timestamps: true });

export default mongoose.model('CMS',CMSSchema, 'CMS');

