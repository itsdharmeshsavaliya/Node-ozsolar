import mongoose from "mongoose";

const CMSSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    mainmenu_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Menu",
      default: mongoose.Types.ObjectId("000000000000000000000000"),
    },
    sortOrder: { type: Number, required: true, unique: true },
    description: { type: String },
    metaTitle: { type: String },
    metaKeyword: { type: String },
    metaDescription: { type: String },
    isActive: { type: Boolean, required: false, default: true },
    isExternalPageURL: { type: Boolean, required: false, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("CMS", CMSSchema, "CMS");
