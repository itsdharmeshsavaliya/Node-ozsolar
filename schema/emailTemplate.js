import mongoose from "mongoose";

const EmailTemplateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, required: false, default: true }
},{ timestamps: true });

export default mongoose.model('EmailTemplate',EmailTemplateSchema, 'EmailTemplate');

