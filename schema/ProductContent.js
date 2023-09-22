import { Schema, model } from "mongoose";

const ProductContent = new Schema({
  products_id: { type: Schema.Types.ObjectId, required: true },
  sortOrder: { type: Number, required: true },
  products_img: {
    type: String,
    required: false,
    get: (image) => {
      return image ? `${APP_URL}${image}` : "";
    },
  },
  ContentText: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
});

export default model("ProductContent", ProductContent);
