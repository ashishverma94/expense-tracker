import { Response } from 'express'
import { AuthRequest } from '../middleware/auth.middleware'
import User from '../models/User'

export const getDashboard = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      res.status(404).json({ message: 'User not found.' })
      return
    }

    res.status(200).json({
      message: 'Dashboard data',
      user: { id: user._id, name: user.name, email: user.email },
      stats: {
        users: 0,
        sessions: 0,
        analytics: 0,
      },
    })
  } catch (err) {
    console.error('[getDashboard]', err)
    res.status(500).json({ message: 'Internal server error.' })
  }
}
