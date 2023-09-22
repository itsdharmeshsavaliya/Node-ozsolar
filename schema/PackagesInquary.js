import mongoose from "mongoose";

const PackagesInquarySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile_no: { type: String, required: true },
    postalCode: { type: String, required: true },
    address: { type: String, required: false },
    message: { type: String, required: false },
    SystemSize: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model(
  "PackagesInquary",
  PackagesInquarySchema,
  "PackagesInquary"
);
