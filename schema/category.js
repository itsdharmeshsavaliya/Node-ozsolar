import { Schema, model } from "mongoose";
import { APP_URL } from "../config";

const CategorySchema = new Schema({
  category: { type: String, required: true },
  sortOrder: { type: Number, required: true },
  category_image: {
    type: String,
    required: false,
    get: (image) => {
      return image ? `${APP_URL}${image}` : "";
    },
  },
  description: { type: String, required: true },
  isActive: { type: Boolean, required: false, default: true },
  slug: { type: String, required: false },
  metaTitle: { type: String, required: true },
  metaKeyword: { type: String, required: true },
  metaDescription: { type: String, required: true },
});

export default model("Category", CategorySchema, "Category");
