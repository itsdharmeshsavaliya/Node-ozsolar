import { Schema, model } from "mongoose";

const ProductFile = new Schema({
  products_id: { type: Schema.Types.ObjectId, required: true },
  Title: { type: String, required: true },
  sortOrder: { type: Number, required: true },
  UploadType: { type: String, required: true },
  File: {
    type: String,
    required: false,
    get: (image) => {
      return image ? `${APP_URL}${image}` : "";
    },
  },
  ContentText: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
});

export default model("ProductFile", ProductFile);
