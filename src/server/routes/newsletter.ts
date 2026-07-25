import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import NewsletterSignup from '../models/NewsletterSignup';

const router = express.Router();

const NewsletterSchema = z.object({
  email: z.string().email('Invalid email address').max(255),
});

// Subscribe to newsletter
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = NewsletterSchema.parse(req.body);
    const existingSignup = await NewsletterSignup.findOne({ email });
    if (existingSignup) {
      return res.status(400).json({ message: 'Email already subscribed!' });
    }
    const newSignup = new NewsletterSignup({ email });
    await newSignup.save();
    res.status(201).json({ message: 'Successfully subscribed to newsletter!' });
  } catch (error) {
    next(error);
  }
});

export default router;
