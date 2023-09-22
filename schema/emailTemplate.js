import mongoose from "mongoose";

const EmailTemplateSchema = new mongoose.Schema(
  {
    InquiryToUser: { type: String, required: true },
    PackageInquiryToUser: { type: String, required: true },
    isActive: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default mongoose.model(
  "EmailTemplate",
  EmailTemplateSchema,
  "EmailTemplate"
);
