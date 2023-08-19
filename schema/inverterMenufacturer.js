import mongoose from "mongoose";

const InverterManuFacturerSchema = new mongoose.Schema({
    inverter_menufacturer: { type: String, required: true },
    slug: { type: String, required: true },
    sortOrder: { type: Number, required: true },
    isActive: { type: Boolean, required: false, default: true }
},{ timestamps: true });

export default mongoose.model('InverterMenuFacturer',InverterManuFacturerSchema, 'InverterMenuFacturer');

