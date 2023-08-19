import mongoose from 'mongoose';
import { APP_URL } from '../config';

const BrandSchema = new mongoose.Schema({
  sortOrder: { type: Number, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  brand_image: {
    type: String,
    required: false,
    get: (image) => {
        return (image) ? `${APP_URL}${image}` : '';
    },
},
  isActive: { type: Boolean, required: false, default: true }
},{timestamps:true,toJSON:{getters:true},id:false});

export default mongoose.model('Brand', BrandSchema, 'Brand');
