import { Request, Response } from 'express';
import Activity from '../models/Activity';

// Get activities
export const getActivities = async (req: Request, res: Response) => {
  try {
    const {
      type,
      category,
      difficulty,
      page = 1,
      limit = 20
    } = req.query;

    const query: any = {};

    if (type) query.type = type;
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const activities = await Activity.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit as string))
      .lean();

    const total = await Activity.countDocuments(query);

    res.json({
      success: true,
      data: {
        activities,
        pagination: {
          currentPage: parseInt(page as string),
          totalPages: Math.ceil(total / parseInt(limit as string)),
          totalActivities: total,
          hasNext: skip + activities.length < total,
          hasPrev: parseInt(page as string) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching activities'
    });
  }
};

// Get activity by ID
export const getActivityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const activity = await Activity.findById(id);
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    res.json({
      success: true,
      data: { activity }
    });
  } catch (error) {
    console.error('Get activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching activity'
    });
  }
};

// Create activity (admin only)
export const createActivity = async (req: Request, res: Response) => {
  try {
    const activityData = req.body;

    const activity = new Activity(activityData);
    await activity.save();

    res.status(201).json({
      success: true,
      message: 'Activity created successfully',
      data: { activity }
    });
  } catch (error) {
    console.error('Create activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating activity'
    });
  }
};

// Update activity (admin only)
export const updateActivity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const activity = await Activity.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    res.json({
      success: true,
      message: 'Activity updated successfully',
      data: { activity }
    });
  } catch (error) {
    console.error('Update activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating activity'
    });
  }
};

// Delete activity (admin only)
export const deleteActivity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    res.json({
      success: true,
      message: 'Activity deleted successfully'
    });
  } catch (error) {
    console.error('Delete activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting activity'
    });
  }
};

// Complete activity
export const completeActivity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!._id;
    const { duration, notes, rating } = req.body;

    const activity = await Activity.findById(id);
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    // Here you would typically save the completion to a separate collection
    // For now, we'll just return success
    res.json({
      success: true,
      message: 'Activity completed successfully',
      data: {
        activityId: id,
        userId,
        completedAt: new Date(),
        duration,
        notes,
        rating
      }
    });
  } catch (error) {
    console.error('Complete activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while completing activity'
    });
  }
};

// Get activity stats
export const getActivityStats = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;

    // Here you would typically get stats from a completions collection
    // For now, we'll return mock data
    res.json({
      success: true,
      data: {
        totalActivities: 0,
        completedActivities: 0,
        favoriteType: 'meditation',
        totalTimeSpent: 0,
        streak: 0
      }
    });
  } catch (error) {
    console.error('Get activity stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching activity stats'
    });
  }
};
