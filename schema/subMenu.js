import mongoose from "mongoose";

const SubMenuSchema = new mongoose.Schema({
    baseMenu: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
    menuType: { 
        type: Number,
        required: true,
        default: 0,
        enum: [0,1,2,3],
        description: '0: Default ,1: CMS, 2: Product, 3: Other' 
     },
    sortOrder: { type: Number, required: true },
    slug: { type: String, required: true },
    menu_URL_unique_key: { type: String, required: false },
    CMS: { type: mongoose.Schema.Types.ObjectId, required: false },
    category: {type: mongoose.Schema.Types.ObjectId, required: false },
    showInHeader: { type: Boolean, required: false, default : true },
    showInFooter: { type: Boolean, required: false, default: true },
    isActive: { type: Boolean, required: false, default: true }
},{ timestamps: true });

export default mongoose.model('SubMenu',SubMenuSchema, 'SubMenu');

