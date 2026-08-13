import express, { Request, Response } from 'express';
import Product from '../models/Product';
import { hasDB, getSeedProducts } from '../dbUtils';

const router = express.Router();

interface MockProduct {
  _id: string;
  name: string;
  grade: string;
  description: string;
  image: string;
  price: number;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const FALLBACK_PRODUCTS: MockProduct[] = getSeedProducts().map((p, i) => ({
  _id: `fallback-${i + 1}`,
  ...p,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

router.get('/', async (req: Request, res: Response) => {
  try {
    if (hasDB()) {
      const products = await Product.find();
      return res.status(200).json(products);
    }
    return res.status(200).json(FALLBACK_PRODUCTS);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    if (!hasDB()) {
      return res.status(200).json(FALLBACK_PRODUCTS);
    }
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    if (hasDB()) {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    }
    const fallback = FALLBACK_PRODUCTS.find((p) => p._id === req.params.id);
    if (fallback) {
      return res.status(200).json(fallback);
    }
    return res.status(404).json({ message: 'Product not found' });
  } catch (error: any) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

export default router;
