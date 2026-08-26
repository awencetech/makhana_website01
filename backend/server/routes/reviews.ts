import express, { Request, Response } from 'express';
import { z } from 'zod';
import Review from '../models/Review';
import { hasDB } from '../dbUtils';

const router = express.Router();

interface MockReview {
  _id: string;
  name: string;
  rating: number;
  feedback: string;
  createdAt: Date;
  updatedAt?: Date;
}

let inMemoryReviews: MockReview[] = [];

const reviewSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .trim(),
  rating: z.number()
    .int()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5'),
  feedback: z.string()
    .min(10, 'Feedback must be at least 10 characters')
    .max(500, 'Feedback cannot exceed 500 characters')
    .trim(),
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const validatedData = reviewSchema.parse(req.body);

    if (hasDB()) {
      const review = new Review({
        name: validatedData.name,
        rating: validatedData.rating,
        feedback: validatedData.feedback,
      });
      await review.save();
      return res.status(201).json({
        success: true,
        message: 'Review submitted successfully',
        data: review,
      });
    }

    const newReview: MockReview = {
      _id: `inmem-${Date.now()}`,
      name: validatedData.name,
      rating: validatedData.rating,
      feedback: validatedData.feedback,
      createdAt: new Date(),
    };
    inMemoryReviews = [newReview, ...inMemoryReviews];
    return res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: newReview,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.flatten().fieldErrors,
      });
    }

    console.error('Error submitting review:', error);
    res.status(500).json({
      error: 'Failed to submit review',
      message: error.message,
    });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    if (hasDB()) {
      const reviews = await Review.find({})
        .sort({ createdAt: -1 })
        .exec();

      return res.status(200).json({
        success: true,
        data: reviews,
      });
    }

    const sorted = [...inMemoryReviews].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return res.status(200).json({
      success: true,
      data: sorted,
    });
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      error: 'Failed to fetch reviews',
      message: error.message,
    });
  }
});

export default router;
