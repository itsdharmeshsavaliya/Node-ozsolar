import mongoose from "mongoose";

const EmailConfigurationSchema = new mongoose.Schema({
    website_name: { type: String, required: false },
    domain_name: { type: String, required: false },
    support_email: { type: String, required: true },
    support_contactNo: { type: String, required: true },
    email_from: { type: String, required: false },
    bcc_email: { type: String, required: false },
    multiple_bcc_email: { type: String, required: false },
    smtp_server: { type: String, required: false },
    smtp_auth_email: { type: String, required: false },
    smtp_auth_password: { type: String, required: false },
    smtp_port: { type: Number, required: false },
    smtp_enabale_ssl: { type: Boolean, required: false , default: false } 
    
},{ timestamps: true });

export default mongoose.model('EmailConfiguration',EmailConfigurationSchema, 'EmailConfiguration');

