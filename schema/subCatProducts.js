import mongoose, { Schema, model } from "mongoose";
import { APP_URL } from "../config";

const SubCategoryProductSchema = new Schema({
  sortOrder: {
    type: Number,
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  subCat_product: {
    type: String,
    required: false,
    get: (image) => {
      return image ? `${APP_URL}${image}` : "";
    },
  },
  logoimg: {
    type: String,
    required: false,
    get: (image) => {
      return image ? `${APP_URL}${image}` : "";
    },
  },

  slug: {
    type: String,
    required: true,
  },

  productName: {
    type: String,
    required: true,
  },
  ProductCode: {
    type: String,
    required: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
  metaTitle: { type: String, required: true },
  metaKeyword: { type: String, required: true },
  metaDescription: { type: String, required: true },
  Description: { type: String, required: true },
});

export default model("SubCategoryProducts", SubCategoryProductSchema);
