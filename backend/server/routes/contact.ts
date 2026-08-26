import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import ContactSubmission from '../models/ContactSubmission';
import nodemailer from 'nodemailer';
import { env } from '../env';
import { hasDB } from '../dbUtils';

const router = express.Router();

const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().email('Invalid email address').max(255),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message too long'),
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = ContactSchema.parse(req.body);

    if (hasDB()) {
      const newSubmission = new ContactSubmission(validated);
      await newSubmission.save();
    } else {
      console.warn('⚠️ No DB connected — contact submission stored in-memory only:', validated);
    }

    if (env.EMAIL_USER && env.EMAIL_PASS && env.ADMIN_EMAIL) {
      const transporter = nodemailer.createTransport({
        host: env.EMAIL_HOST || 'smtp.gmail.com',
        port: env.EMAIL_PORT || 587,
        secure: env.EMAIL_PORT === 465,
        auth: {
          user: env.EMAIL_USER,
          pass: env.EMAIL_PASS,
        },
      });

      const safeName = validated.name.replace(/[<>]/g, '');
      const safeEmail = validated.email.replace(/[<>]/g, '');
      const safeMessage = validated.message.replace(/[<>]/g, '');

      const mailOptions = {
        from: `"Veltrix Website" <${env.EMAIL_USER}>`,
        to: env.ADMIN_EMAIL,
        replyTo: safeEmail,
        subject: `New Contact Form Submission from ${safeName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #d97706;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: #fef3c7; padding: 15px; border-radius: 8px;">${safeMessage}</p>
          </div>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error('Failed to send contact email:', emailError);
      }
    }

    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (error) {
    next(error);
  }
});

export default router;
