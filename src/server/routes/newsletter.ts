import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import NewsletterSignup from '../models/NewsletterSignup';
import { hasDB } from '../dbUtils';

const router = express.Router();

const NewsletterSchema = z.object({
  email: z.string().email('Invalid email address').max(255),
});

let inMemorySubscribers: Set<string> = new Set();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = NewsletterSchema.parse(req.body);

    if (hasDB()) {
      const existingSignup = await NewsletterSignup.findOne({ email });
      if (existingSignup) {
        return res.status(400).json({ message: 'Email already subscribed!' });
      }
      const newSignup = new NewsletterSignup({ email });
      await newSignup.save();
    } else {
      if (inMemorySubscribers.has(email)) {
        return res.status(400).json({ message: 'Email already subscribed!' });
      }
      inMemorySubscribers.add(email);
      console.warn('⚠️ No DB connected — newsletter signup stored in-memory only:', email);
    }

    res.status(201).json({ message: 'Successfully subscribed to newsletter!' });
  } catch (error) {
    next(error);
  }
});

export default router;
