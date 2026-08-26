import mongoose, { Schema, Document } from 'mongoose';

interface IReview extends Document {
  name: string;
  rating: number;
  feedback: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  rating: { 
    type: Number, 
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  feedback: { 
    type: String, 
    required: [true, 'Feedback is required'],
    trim: true,
    minlength: [10, 'Feedback must be at least 10 characters'],
    maxlength: [500, 'Feedback cannot exceed 500 characters']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true,
  collection: 'reviews',
});

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
