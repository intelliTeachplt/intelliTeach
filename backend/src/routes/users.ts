import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/User';
import { auth, roleAuth } from '../middleware/auth';

interface AuthRequest extends Request {
  user?: any;
}

const router = express.Router();

// Register new user
router.post(
  '/register',
  asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      res.status(400);
      throw new Error('Email already registered');
    }

    const user = new User(req.body);
    await user.save();
    
    const token = user.generateToken();
    res.status(201).json({ user, token });
  })
);

// Login
router.post(
  '/login',
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      res.status(401);
      throw new Error('Invalid credentials');
    }
    
    const token = user.generateToken();
    res.json({ user, token });
  })
);

// Get all users (admin only)
router.get(
  '/',
  auth,
  roleAuth(['admin']),
  asyncHandler(async (_req: Request, res: Response) => {
    const users = await User.find().select('-password');
    res.json(users);
  })
);

// Get user profile
router.get(
  '/profile',
  auth,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    res.json(user);
  })
);

// Update user profile
router.patch(
  '/profile',
  auth,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'profileData'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    
    if (!isValidOperation) {
      res.status(400);
      throw new Error('Invalid updates');
    }

    const user = await User.findByIdAndUpdate(req.user._id, req.body, { 
      new: true, 
      runValidators: true 
    }).select('-password');
    
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    
    res.json(user);
  })
);

export default router;
