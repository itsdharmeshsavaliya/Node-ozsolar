import mongoose from "mongoose";

const GenerationUnitSchema = new mongoose.Schema({
    unitName: { type: String, required: true },
    slug: { type: String, required: false },
    sortOrder: { type: Number, required: true },
    isActive: { type: Boolean, required: false, default: true }

},{ timestamps: true });

// GenerationUnitSchema.pre('save', function(next) {
//     this.slug = slug(this.unitName, { lower: true });
//     next();
//   });
export default mongoose.model('GenerationUnit',GenerationUnitSchema, 'GenerationUnit');

