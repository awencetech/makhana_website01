import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { z } from 'zod';
import { env } from './env';
import contactRoutes from './routes/contact';
import cartRoutes from './routes/cart';
import orderRoutes from './routes/order';
import newsletterRoutes from './routes/newsletter';
import productRoutes from './routes/products';
import Product from './models/Product';

const app = express();
const PORT = env.PORT || 5000;
const isProduction = env.NODE_ENV === 'production';

// MongoDB connection caching for serverless
let cachedDb: typeof mongoose | null = null;

async function connectDB() {
  if (cachedDb) return cachedDb;
  
  if (!env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }
  
  const opts = {
    bufferCommands: false,
    maxPoolSize: isProduction ? 10 : 1,
  };
  
  cachedDb = await mongoose.connect(env.MONGODB_URI, opts);
  return cachedDb;
}

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: isProduction ? undefined : false,
}));
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 100 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Strict rate limit for contact/newsletter (prevent spam)
const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: isProduction ? 10 : 100,
  message: { error: 'Too many submissions, please try again later.' },
});

// CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  env.FRONTEND_URL,
  'https://veltrix-global-trading.vercel.app',
  isProduction ? /\.vercel\.app$/ : undefined,
].filter(Boolean) as (string | RegExp)[];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const isAllowed = allowedOrigins.some(o => 
      typeof o === 'string' ? o === origin : o.test(origin)
    );
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(null, isProduction ? true : true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// DB middleware - ensure connection
app.use(async (req, res, next) => {
  try {
    await connectDB();
    
    // Seed products if needed
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const products = [
        {
          name: "1st Grade",
          grade: "Premium Export Quality",
          description: "Highest quality makhana, perfect for export markets.",
          image: "https://images.unsplash.com/photo-1598899625753-3e3e8452d0fa?w=800&auto=format&fit=crop",
          price: 1650,
          tags: ["1st Grade", "Export Quality", "Premium"]
        },
        {
          name: "2nd Grade",
          grade: "Premium Standard Quality",
          description: "Premium standard quality makhana.",
          image: "https://images.unsplash.com/photo-1633918720125-9f5f56b24400?w=800&auto=format&fit=crop",
          price: 1250,
          tags: ["2nd Grade", "Standard Quality", "Premium"]
        },
        {
          name: "3rd Grade",
          grade: "Economy Quality",
          description: "Economy quality makhana at a great price.",
          image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop",
          price: 1000,
          tags: ["3rd Grade", "Economy", "Value"]
        }
      ];
      await Product.insertMany(products);
    }
    
    next();
  } catch (err) {
    next(err);
  }
});

// Logging middleware (non-production)
if (!isProduction) {
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.use('/api/products', productRoutes);
app.use('/api/contact', strictLimiter, contactRoutes);
app.use('/api/newsletter', strictLimiter, newsletterRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Error:', err);
  
  if (err instanceof z.ZodError) {
    return res.status(400).json({ 
      error: 'Validation error', 
      details: err.flatten().fieldErrors 
    });
  }
  
  const statusCode = err.statusCode || err.status || 500;
  const message = isProduction && statusCode === 500 
    ? 'Internal server error' 
    : err.message || 'Something went wrong';
  
  res.status(statusCode).json({ 
    error: message,
    ...(isProduction ? {} : { stack: err.stack })
  });
});

// Conditionally start server for non-serverless environments
if (typeof window === 'undefined' && !process.env.VERCEL && require.main === module) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT} (${env.NODE_ENV})`);
      });
    })
    .catch((err) => {
      console.error('❌ Failed to start server:', err);
      process.exit(1);
    });
}

export default app;
