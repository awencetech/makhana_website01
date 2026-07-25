import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  grade?: string;
  description: string;
  image: string;
  price: number;
  tags: string[];
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  grade: { type: String },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  tags: { type: [String], default: [] },
}, {
  timestamps: true
});

export default mongoose.model<IProduct>('Product', ProductSchema);
