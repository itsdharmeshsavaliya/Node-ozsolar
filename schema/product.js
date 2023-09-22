import { Schema, model } from "mongoose";

const Product = new Schema({
  productName: { type: String, required: true },
  slug: { type: String, required: true },
  productCode: { type: String, require: true },
  sortOrder: { type: Number, required: true },
  logo_img: { type: String, required: true },
  banner_img: { type: String, required: true },
  description: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
  metaTitle: { type: String, required: true },
  metaKeywords: { type: String, required: true },
  metaDescription: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

export default model("CategoryProducts", Product);
