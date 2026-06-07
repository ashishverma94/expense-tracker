import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'

const signToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  } as jwt.SignOptions)
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body

    const existing = await User.findOne({ email })
    if (existing) {
      res.status(409).json({ message: 'An account with this email already exists.' })
      return
    }

    const user = await User.create({ name, email, password })
    const token = signToken(String(user._id))

    res.status(201).json({
      message: 'Account created successfully.',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (err) {
    console.error('[register]', err)
    res.status(500).json({ message: 'Internal server error.' })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password.' })
      return
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password.' })
      return
    }

    const token = signToken(String(user._id))

    res.status(200).json({
      message: 'Login successful.',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (err) {
    console.error('[login]', err)
    res.status(500).json({ message: 'Internal server error.' })
  }
}
