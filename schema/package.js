import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
    package: { type: mongoose.Schema.Types.ObjectId, ref: 'PackageType', required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    sortOrder: { type: Number, required: true },
    kwText: { type: String, required: true },
    savings_upto_amount: { type: Number, required: true },
    saving_upto_text: { type: String, required: true },
    amount: { type: Number, required: true },
    amount_text: { type: String, required: true },
    description: { type: String, required: true },
    isActive: { type: Boolean, required: false, default: true } 
},{ timestamps: true });

export default mongoose.model('Package',PackageSchema, 'Package');

