import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    national_metering_identifier: { type: String, required: false },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    mobile_no: { type: Number, required: true },
    email: { type: String, required: true },
    phone_no: { type: Number, required: false },
    flat_no: { type: String, required: false },
    street_no: { type: String, required: false },
    street: { type: String, required: false },
    city: { type: String, required: false },
    state:  { type: String, required: false },
    postCode:  { type: String, required: false }
    
},{ timestamps: true });

export default mongoose.model('Customer',CustomerSchema, 'Customer');

