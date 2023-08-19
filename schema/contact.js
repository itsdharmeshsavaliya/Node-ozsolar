import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    company_name: { type: String, required: true },
    office_contact_no: { type: Number, required: true },
    office_address: { type: String, required: true },
    google_map: { type: String, required: true }
},{ timestamps: true });

export default mongoose.model('Contact',ContactSchema, 'Contact');

