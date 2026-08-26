import mongoose from 'mongoose';
import { env } from './env';
import Product from './models/Product';

const isProduction = env.NODE_ENV === 'production';

export const SEED_PRODUCTS = [
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

let cachedDb: typeof mongoose | null = null;
let dbReady = false;
let seedDone = false;

export async function seedProducts() {
  if (seedDone || !cachedDb) return;
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany(SEED_PRODUCTS);
      console.log('✅ Seeded products into DB');
    }
    seedDone = true;
  } catch (e) {
    console.warn('⚠️ Product seeding skipped:', e instanceof Error ? e.message : e);
  }
}

export async function connectDB() {
  if (cachedDb) return cachedDb;

  if (!env.MONGODB_URI) {
    if (!dbReady) {
      console.warn('⚠️ MONGODB_URI not set — running in fallback mode with in-memory data.');
      dbReady = true;
    }
    return null;
  }

  const opts = {
    bufferCommands: false,
    maxPoolSize: isProduction ? 10 : 1,
  };

  try {
    cachedDb = await mongoose.connect(env.MONGODB_URI, opts);
    dbReady = true;
    console.log('✅ Connected to MongoDB');
    await seedProducts();
    return cachedDb;
  } catch (e) {
    console.warn('⚠️ MongoDB connection failed — running in fallback mode:', e instanceof Error ? e.message : e);
    dbReady = true;
    return null;
  }
}

export const hasDB = () => !!cachedDb;
export const getSeedProducts = () => SEED_PRODUCTS;
