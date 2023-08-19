import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    text: { type: String, required: true },
    isActive: { type: Boolean, required: false, default: true }
},{ timestamps: true });

export default mongoose.model('Testimonial',TestimonialSchema, 'Testimonial');

