import express, { Request, Response } from 'express';
import Cart from '../models/Cart';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, grade, size, price, quantity } = req.body;

    if (!name || !grade || !size || typeof price !== 'number' || typeof quantity !== 'number') {
      return res.status(400).json({ message: 'Missing or invalid cart item fields' });
    }

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
  } catch (error) {
    return res.status(500).json({ message: 'Error saving cart item', error });
  }
});

router.get('/', async (_req: Request, res: Response) => {
  try {
    const cartItems = await Cart.find().sort({ createdAt: -1 });
    return res.status(200).json(cartItems);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching cart items', error });
  }
});

export default router;
