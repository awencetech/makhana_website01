import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { z } from 'zod';
import { env } from './env';
import { connectDB } from './dbUtils';
import contactRoutes from './routes/contact';
import cartRoutes from './routes/cart';
import orderRoutes from './routes/order';
import newsletterRoutes from './routes/newsletter';
import productRoutes from './routes/products';
import reviewRoutes from './routes/reviews';

const app = express();
const PORT = env.PORT || 5000;
const isProduction = env.NODE_ENV === 'production';

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

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// DB middleware - ensure connection (non-blocking, no per-request seeding)
app.use(async (req, res, next) => {
  try {
    await connectDB();
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
app.use('/api/reviews', reviewRoutes);

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
