import { Schema, model } from "mongoose";
import { APP_URL } from "../config";

const SubCategorySchema = new Schema({
  subCategory: { type: String, required: true },
  sortOrder: { type: Number, required: true, unique: true },
  subcategory_img: {
    type: String,
    required: false,
    get: (image) => {
      return image ? `${APP_URL}${image}` : "";
    },
  },
  description: { type: String, required: true },
  isActive: { type: Boolean, required: false, default: true },
  slug: { type: String, required: true },
  products: { type: Number, required: true, default: 0 },
  metaTitle: { type: String, required: true },
  metaKeyword: { type: String, required: true },
  metaDescription: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

export default model("SubCategory", SubCategorySchema, "SubCategory");
