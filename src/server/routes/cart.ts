import express, { Request, Response } from 'express';
import Cart from '../models/Cart';
import { hasDB } from '../dbUtils';

const router = express.Router();

interface MockCartItem {
  _id: string;
  name: string;
  grade: string;
  size: string;
  price: number;
  quantity: number;
  totalPrice: number;
  createdAt: Date;
}

let inMemoryCart: MockCartItem[] = [];

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, grade, size, price, quantity } = req.body;

    if (!name || !grade || !size || typeof price !== 'number' || typeof quantity !== 'number') {
      return res.status(400).json({ message: 'Missing or invalid cart item fields' });
    }

    if (hasDB()) {
      const cartItem = new Cart({
        name,
        grade,
        size,
        price,
        quantity,
        totalPrice: price * quantity,
      });
      await cartItem.save();
      return res.status(201).json({
        message: 'Cart item saved successfully',
        cartItem,
      });
    }

    const newItem: MockCartItem = {
      _id: `cart-${Date.now()}`,
      name,
      grade,
      size,
      price,
      quantity,
      totalPrice: price * quantity,
      createdAt: new Date(),
    };
    inMemoryCart.unshift(newItem);
    console.warn('⚠️ No DB connected — cart item stored in-memory only:', newItem);
    return res.status(201).json({
      message: 'Cart item saved successfully',
      cartItem: newItem,
    });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error saving cart item', error: error.message });
  }
});

router.get('/', async (_req: Request, res: Response) => {
  try {
    if (hasDB()) {
      const cartItems = await Cart.find().sort({ createdAt: -1 });
      return res.status(200).json(cartItems);
    }
    return res.status(200).json(inMemoryCart);
  } catch (error: any) {
    return res.status(500).json({ message: 'Error fetching cart items', error: error.message });
  }
});

export default router;
