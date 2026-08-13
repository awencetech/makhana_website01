import mongoose, { Schema, Document } from 'mongoose';

interface INewsletterSignup extends Document {
  email: string;
}

const NewsletterSignupSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
}, {
  timestamps: true
});

export default mongoose.models.NewsletterSignup || mongoose.model<INewsletterSignup>('NewsletterSignup', NewsletterSignupSchema);
