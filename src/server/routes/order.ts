import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import Order from '../models/Order';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import { env } from '../env';

const router = express.Router();

const OrderItemSchema = z.object({
  name: z.string().min(1),
  grade: z.string().min(1),
  size: z.string().min(1),
  price: z.coerce.number().positive(),
  quantity: z.coerce.number().int().positive(),
});

const OrderSchema = z.object({
  customerName: z.string().min(2).max(200),
  email: z.string().email().max(255),
  phone: z.string().min(6).max(20),
  address: z.string().min(5).max(2000),
  items: z.array(OrderItemSchema).min(1),
  totalPrice: z.coerce.number().positive(),
});

// Create a new order and send notifications
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validated = OrderSchema.parse(req.body);
    const { customerName, email, phone, address, items, totalPrice } = validated;

    // 1. Save order to MongoDB FIRST (most important!)
    const order = new Order(validated);
    const savedOrder = await order.save();

    const orderIdShort = savedOrder._id.toString().slice(-8);
    const orderItemsHtml = items.map((item) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.grade}</td>
        <td>${item.size}</td>
        <td>₹${item.price.toFixed(2)}</td>
        <td>${item.quantity}</td>
        <td>₹${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    const orderItemsText = items.map((item) => 
      `- ${item.grade} (${item.size}) x ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    // 2. Send Email Notifications (don't fail order if notifications fail)
    try {
      if (env.EMAIL_USER && env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          host: env.EMAIL_HOST || 'smtp.gmail.com',
          port: env.EMAIL_PORT || 587,
          secure: env.EMAIL_PORT === 465,
          auth: {
            user: env.EMAIL_USER,
            pass: env.EMAIL_PASS,
          },
        });

        // Email to admin
        if (env.ADMIN_EMAIL) {
          await transporter.sendMail({
            from: `"Veltrix Orders" <${env.EMAIL_USER}>`,
            to: env.ADMIN_EMAIL,
            replyTo: email,
            subject: `New Order Received - Order #${orderIdShort}`,
            html: `
              <h1>New Order Received!</h1>
              <h3>Customer Details</h3>
              <p><strong>Name:</strong> ${customerName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Address:</strong> ${address}</p>
              <h3>Order Items</h3>
              <table border="1" cellpadding="10" cellspacing="0">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Grade</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>${orderItemsHtml}</tbody>
              </table>
              <h3>Total: ₹${totalPrice.toFixed(2)}</h3>
              <p>Order ID: ${savedOrder._id}</p>
            `,
          });
        }

        // Email to customer
        await transporter.sendMail({
          from: `"Veltrix Global Trading" <${env.EMAIL_USER}>`,
          to: email,
          subject: `Order Confirmation - Veltrix Global Trading`,
          html: `
            <h1>Thank you for your order, ${customerName}!</h1>
            <p>Your order has been received successfully.</p>
            <h3>Order Details</h3>
            <table border="1" cellpadding="10" cellspacing="0">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Grade</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>${orderItemsHtml}</tbody>
            </table>
            <h3>Total: ₹${totalPrice.toFixed(2)}</h3>
            <p>We&apos;ll update you once your order is processed!</p>
            <p>Order ID: #${orderIdShort}</p>
            <p>Best regards,<br>Veltrix Global Trading</p>
          `,
        });
      }
    } catch (emailError) {
      console.warn('Failed to send email notifications:', emailError);
    }

    // 3. Send WhatsApp Notification (don't fail order if notifications fail)
    try {
      if (env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN && env.TWILIO_WHATSAPP_FROM && env.ADMIN_WHATSAPP_NUMBER) {
        const client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
        const whatsappMessage = `
New Order Received! 🌟

Customer: ${customerName}
Phone: ${phone}
Email: ${email}
Address: ${address}

Items:
${orderItemsText}

Total: ₹${totalPrice.toFixed(2)}

Order ID: #${orderIdShort}
        `;

        await client.messages.create({
          body: whatsappMessage.trim(),
          from: env.TWILIO_WHATSAPP_FROM,
          to: env.ADMIN_WHATSAPP_NUMBER,
        });
      }
    } catch (whatsappError) {
      console.warn('Failed to send WhatsApp notification:', whatsappError);
    }

    res.status(201).json({ success: true, orderId: savedOrder._id });
  } catch (error) {
    next(error);
  }
});

export default router;
