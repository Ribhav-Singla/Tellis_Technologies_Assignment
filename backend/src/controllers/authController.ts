import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const generateToken = (id: string) =>
    jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const user = new User({ email, password });
        await user.save();

        res.status(201).json({
            _id: user._id,
            email: user.email,
            //@ts-ignore
            token: generateToken(user._id.toString())
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        res.json({
            _id: user._id,
            email: user.email,
            //@ts-ignore
            token: generateToken(user._id.toString())
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
