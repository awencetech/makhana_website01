
import mongoose, { Schema, Document } from 'mongoose';

interface ICart extends Document {
  name: string;
  grade: string;
  size: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

const CartSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    grade: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICart>('Cart', CartSchema);
