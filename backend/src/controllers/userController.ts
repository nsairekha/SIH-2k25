import { Request, Response } from 'express';
import User from '../models/User';

// Update user profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;
    const { name, age } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { name, age } },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          age: user.age,
          avatar: user.avatar,
          preferences: user.preferences
        }
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
};

// Update user preferences
export const updatePreferences = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;
    const preferences = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { preferences } },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Preferences updated successfully',
      data: {
        preferences: user.preferences
      }
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating preferences'
    });
  }
};

// Upload avatar
export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Here you would typically upload the file to a cloud storage service
    // For now, we'll just save the filename
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { avatar: avatarUrl } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Avatar uploaded successfully',
      data: {
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while uploading avatar'
    });
  }
};

// Delete account
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;

    // Here you would typically delete all user data from all collections
    // For now, we'll just delete the user
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting account'
    });
  }
};

// Get user stats
export const getStats = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;

    // Here you would typically get comprehensive user statistics
    // For now, we'll return mock data
    const stats = {
      totalMoodEntries: 0,
      totalActivities: 0,
      totalSurveys: 0,
      currentStreak: 0,
      longestStreak: 0,
      pointsEarned: 0,
      achievementsUnlocked: 0,
      joinDate: new Date(),
      lastActive: new Date()
    };

    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user stats'
    });
  }
};
