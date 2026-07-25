
import mongoose, { Schema, Document } from 'mongoose';

interface OrderItem {
  name: string;
  grade: string;
  size: string;
  price: number;
  quantity: number;
}

interface IOrder extends Document {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
  totalPrice: number;
  status: string;
  createdAt: Date;
}

const OrderItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  grade: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const OrderSchema: Schema = new Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  items: [OrderItemSchema],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] },
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', OrderSchema);
