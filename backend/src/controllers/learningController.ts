import { Request, Response } from 'express';
import LearningContent from '../models/LearningContent';

// Get learning content
export const getContent = async (req: Request, res: Response) => {
  try {
    const {
      type,
      category,
      difficulty,
      page = 1,
      limit = 20,
      sort = 'newest'
    } = req.query;

    const query: any = {};

    if (type) query.type = type;
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    let sortOptions: any = { createdAt: -1 };
    switch (sort) {
      case 'oldest':
        sortOptions = { createdAt: 1 };
        break;
      case 'most_read':
        sortOptions = { readCount: -1 };
        break;
      case 'highest_rated':
        sortOptions = { averageRating: -1 };
        break;
    }

    const content = await LearningContent.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit as string))
      .lean();

    const total = await LearningContent.countDocuments(query);

    res.json({
      success: true,
      data: {
        content,
        pagination: {
          currentPage: parseInt(page as string),
          totalPages: Math.ceil(total / parseInt(limit as string)),
          totalContent: total,
          hasNext: skip + content.length < total,
          hasPrev: parseInt(page as string) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching content'
    });
  }
};

// Get content by ID
export const getContentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const content = await LearningContent.findById(id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    res.json({
      success: true,
      data: { content }
    });
  } catch (error) {
    console.error('Get content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching content'
    });
  }
};

// Create content (admin only)
export const createContent = async (req: Request, res: Response) => {
  try {
    const contentData = req.body;

    const content = new LearningContent(contentData);
    await content.save();

    res.status(201).json({
      success: true,
      message: 'Content created successfully',
      data: { content }
    });
  } catch (error) {
    console.error('Create content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating content'
    });
  }
};

// Update content (admin only)
export const updateContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const content = await LearningContent.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    res.json({
      success: true,
      message: 'Content updated successfully',
      data: { content }
    });
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating content'
    });
  }
};

// Delete content (admin only)
export const deleteContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const content = await LearningContent.findByIdAndDelete(id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    res.json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    console.error('Delete content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting content'
    });
  }
};

// Mark content as read
export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!._id;
    const { timeSpent, rating, notes } = req.body;

    // Here you would typically save the reading history to a separate collection
    // For now, we'll just return success
    res.json({
      success: true,
      message: 'Content marked as read successfully',
      data: {
        contentId: id,
        userId,
        readAt: new Date(),
        timeSpent,
        rating,
        notes
      }
    });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while marking content as read'
    });
  }
};

// Get reading history
export const getReadingHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;

    // Here you would typically get reading history from a separate collection
    // For now, we'll return mock data
    res.json({
      success: true,
      data: {
        history: [],
        totalRead: 0,
        totalTimeSpent: 0
      }
    });
  } catch (error) {
    console.error('Get reading history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching reading history'
    });
  }
};

// Get recommendations
export const getRecommendations = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;

    // Here you would typically get personalized recommendations
    // For now, we'll return some general content
    const recommendations = await LearningContent.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    res.json({
      success: true,
      data: { recommendations }
    });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching recommendations'
    });
  }
};
