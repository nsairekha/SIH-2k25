import { Request, Response } from 'express';
import MoodEntry from '../models/MoodEntry';
import { io } from '../server';

// Create mood entry
export const createMoodEntry = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;
    const moodData = {
      ...req.body,
      userId,
      timestamp: req.body.timestamp || new Date()
    };

    const moodEntry = new MoodEntry(moodData);
    await moodEntry.save();

    // Emit real-time update
    io.emit('mood-updated', {
      userId,
      moodEntry: {
        id: moodEntry._id,
        mood: moodEntry.mood,
        timestamp: moodEntry.timestamp
      }
    });

    res.status(201).json({
      success: true,
      message: 'Mood entry created successfully',
      data: { moodEntry }
    });
  } catch (error) {
    console.error('Create mood entry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating mood entry'
    });
  }
};

// Get mood entries
export const getMoodEntries = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;
    const {
      page = 1,
      limit = 20,
      startDate,
      endDate,
      moodValue,
      tags
    } = req.query;

    const query: any = { userId };

    // Date range filter
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate as string);
      if (endDate) query.timestamp.$lte = new Date(endDate as string);
    }

    // Mood value filter
    if (moodValue) {
      query['mood.value'] = parseInt(moodValue as string);
    }

    // Tags filter
    if (tags) {
      const tagArray = (tags as string).split(',').map(tag => tag.trim());
      query.tags = { $in: tagArray };
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const moodEntries = await MoodEntry.find(query)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(parseInt(limit as string))
      .lean();

    const total = await MoodEntry.countDocuments(query);

    res.json({
      success: true,
      data: {
        moodEntries,
        pagination: {
          currentPage: parseInt(page as string),
          totalPages: Math.ceil(total / parseInt(limit as string)),
          totalEntries: total,
          hasNext: skip + moodEntries.length < total,
          hasPrev: parseInt(page as string) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get mood entries error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching mood entries'
    });
  }
};

// Get mood entry by ID
export const getMoodEntryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!._id;

    const moodEntry = await MoodEntry.findOne({ _id: id, userId });
    if (!moodEntry) {
      return res.status(404).json({
        success: false,
        message: 'Mood entry not found'
      });
    }

    res.json({
      success: true,
      data: { moodEntry }
    });
  } catch (error) {
    console.error('Get mood entry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching mood entry'
    });
  }
};

// Update mood entry
export const updateMoodEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!._id;

    const moodEntry = await MoodEntry.findOneAndUpdate(
      { _id: id, userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!moodEntry) {
      return res.status(404).json({
        success: false,
        message: 'Mood entry not found'
      });
    }

    // Emit real-time update
    io.emit('mood-updated', {
      userId,
      moodEntry: {
        id: moodEntry._id,
        mood: moodEntry.mood,
        timestamp: moodEntry.timestamp
      }
    });

    res.json({
      success: true,
      message: 'Mood entry updated successfully',
      data: { moodEntry }
    });
  } catch (error) {
    console.error('Update mood entry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating mood entry'
    });
  }
};

// Delete mood entry
export const deleteMoodEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!._id;

    const moodEntry = await MoodEntry.findOneAndDelete({ _id: id, userId });
    if (!moodEntry) {
      return res.status(404).json({
        success: false,
        message: 'Mood entry not found'
      });
    }

    res.json({
      success: true,
      message: 'Mood entry deleted successfully'
    });
  } catch (error) {
    console.error('Delete mood entry error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting mood entry'
    });
  }
};

// Get mood analytics
export const getMoodAnalytics = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;
    const { period = 'month', startDate, endDate } = req.query;

    let dateFilter: any = {};
    
    if (startDate && endDate) {
      dateFilter = {
        timestamp: {
          $gte: new Date(startDate as string),
          $lte: new Date(endDate as string)
        }
      };
    } else {
      const now = new Date();
      switch (period) {
        case 'week':
          dateFilter = {
            timestamp: {
              $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            }
          };
          break;
        case 'month':
          dateFilter = {
            timestamp: {
              $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
            }
          };
          break;
        case 'quarter':
          dateFilter = {
            timestamp: {
              $gte: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
            }
          };
          break;
        case 'year':
          dateFilter = {
            timestamp: {
              $gte: new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
            }
          };
          break;
      }
    }

    const query = { userId, ...dateFilter };

    // Get mood entries
    const moodEntries = await MoodEntry.find(query).lean();

    // Calculate analytics
    const totalEntries = moodEntries.length;
    const averageMood = moodEntries.reduce((sum, entry) => sum + entry.mood.value, 0) / totalEntries || 0;
    
    // Mood distribution
    const moodDistribution = [1, 2, 3, 4, 5].map(value => ({
      value,
      count: moodEntries.filter(entry => entry.mood.value === value).length,
      percentage: totalEntries > 0 ? (moodEntries.filter(entry => entry.mood.value === value).length / totalEntries) * 100 : 0
    }));

    // Emotion analysis
    const emotionCounts: { [key: string]: number } = {};
    moodEntries.forEach(entry => {
      entry.emotions.forEach(emotion => {
        emotionCounts[emotion.name] = (emotionCounts[emotion.name] || 0) + 1;
      });
    });

    const topEmotions = Object.entries(emotionCounts)
      .map(([name, count]) => ({ name, count, percentage: (count / totalEntries) * 100 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Trigger analysis
    const triggerCounts: { [key: string]: number } = {};
    moodEntries.forEach(entry => {
      entry.triggers?.forEach(trigger => {
        triggerCounts[trigger] = (triggerCounts[trigger] || 0) + 1;
      });
    });

    const topTriggers = Object.entries(triggerCounts)
      .map(([trigger, count]) => ({ trigger, count, percentage: (count / totalEntries) * 100 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Weekly patterns
    const weeklyPatterns = [0, 1, 2, 3, 4, 5, 6].map(day => {
      const dayEntries = moodEntries.filter(entry => entry.timestamp.getDay() === day);
      const avgMood = dayEntries.length > 0 
        ? dayEntries.reduce((sum, entry) => sum + entry.mood.value, 0) / dayEntries.length 
        : 0;
      return {
        day,
        dayName: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day],
        averageMood: avgMood,
        entryCount: dayEntries.length
      };
    });

    res.json({
      success: true,
      data: {
        summary: {
          totalEntries,
          averageMood: Math.round(averageMood * 100) / 100,
          period: period as string
        },
        moodDistribution,
        topEmotions,
        topTriggers,
        weeklyPatterns
      }
    });
  } catch (error) {
    console.error('Get mood analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching mood analytics'
    });
  }
};

// Get mood trends
export const getMoodTrends = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;
    const { period = 'month', startDate, endDate } = req.query;

    let dateFilter: any = {};
    
    if (startDate && endDate) {
      dateFilter = {
        timestamp: {
          $gte: new Date(startDate as string),
          $lte: new Date(endDate as string)
        }
      };
    } else {
      const now = new Date();
      switch (period) {
        case 'week':
          dateFilter = {
            timestamp: {
              $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            }
          };
          break;
        case 'month':
          dateFilter = {
            timestamp: {
              $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
            }
          };
          break;
        case 'quarter':
          dateFilter = {
            timestamp: {
              $gte: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
            }
          };
          break;
        case 'year':
          dateFilter = {
            timestamp: {
              $gte: new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
            }
          };
          break;
      }
    }

    const query = { userId, ...dateFilter };

    // Get mood entries grouped by date
    const moodEntries = await MoodEntry.aggregate([
      { $match: query },
      {
        $group: {
          _id: {
            year: { $year: '$timestamp' },
            month: { $month: '$timestamp' },
            day: { $dayOfMonth: '$timestamp' }
          },
          averageMood: { $avg: '$mood.value' },
          averageIntensity: { $avg: '$intensity' },
          averageStress: { $avg: '$stressLevel' },
          averageEnergy: { $avg: '$energyLevel' },
          entryCount: { $sum: 1 },
          emotions: { $push: '$emotions' },
          triggers: { $push: '$triggers' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);

    // Format data for charts
    const trendData = moodEntries.map(entry => ({
      date: new Date(entry._id.year, entry._id.month - 1, entry._id.day).toISOString().split('T')[0],
      mood: Math.round(entry.averageMood * 100) / 100,
      intensity: Math.round(entry.averageIntensity * 100) / 100,
      stress: entry.averageStress ? Math.round(entry.averageStress * 100) / 100 : null,
      energy: entry.averageEnergy ? Math.round(entry.averageEnergy * 100) / 100 : null,
      entryCount: entry.entryCount
    }));

    res.json({
      success: true,
      data: {
        trends: trendData,
        period: period as string
      }
    });
  } catch (error) {
    console.error('Get mood trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching mood trends'
    });
  }
};

// Get mood insights (AI-powered)
export const getMoodInsights = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;
    const { period = 'month' } = req.query;

    // Get recent mood entries
    const now = new Date();
    let dateFilter: any = {};
    
    switch (period) {
      case 'week':
        dateFilter = {
          timestamp: {
            $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          }
        };
        break;
      case 'month':
        dateFilter = {
          timestamp: {
            $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          }
        };
        break;
      case 'quarter':
        dateFilter = {
          timestamp: {
            $gte: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
          }
        };
        break;
      case 'year':
        dateFilter = {
          timestamp: {
            $gte: new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
          }
        };
        break;
    }

    const moodEntries = await MoodEntry.find({ userId, ...dateFilter })
      .sort({ timestamp: -1 })
      .limit(50)
      .lean();

    // Generate insights based on patterns
    const insights = [];
    
    if (moodEntries.length > 0) {
      const averageMood = moodEntries.reduce((sum, entry) => sum + entry.mood.value, 0) / moodEntries.length;
      
      // Mood trend insight
      if (moodEntries.length >= 2) {
        const recentMood = moodEntries.slice(0, 7).reduce((sum, entry) => sum + entry.mood.value, 0) / Math.min(7, moodEntries.length);
        const olderMood = moodEntries.slice(7, 14).reduce((sum, entry) => sum + entry.mood.value, 0) / Math.min(7, moodEntries.length - 7);
        
        if (recentMood > olderMood + 0.5) {
          insights.push({
            type: 'positive_trend',
            title: 'Improving Mood Trend',
            message: 'Your mood has been improving over the past week. Keep up the great work!',
            confidence: 0.8
          });
        } else if (recentMood < olderMood - 0.5) {
          insights.push({
            type: 'declining_trend',
            title: 'Mood Decline Notice',
            message: 'Your mood has been declining recently. Consider reaching out for support or trying some coping strategies.',
            confidence: 0.7
          });
        }
      }

      // Trigger patterns
      const triggerCounts: { [key: string]: number } = {};
      moodEntries.forEach(entry => {
        entry.triggers?.forEach(trigger => {
          triggerCounts[trigger] = (triggerCounts[trigger] || 0) + 1;
        });
      });

      const topTrigger = Object.entries(triggerCounts).sort((a, b) => b[1] - a[1])[0];
      if (topTrigger && topTrigger[1] >= 3) {
        insights.push({
          type: 'trigger_pattern',
          title: 'Common Trigger Identified',
          message: `"${topTrigger[0]}" appears frequently in your mood entries. Consider developing specific coping strategies for this trigger.`,
          confidence: 0.6
        });
      }

      // Emotion patterns
      const emotionCounts: { [key: string]: number } = {};
      moodEntries.forEach(entry => {
        entry.emotions.forEach(emotion => {
          emotionCounts[emotion.name] = (emotionCounts[emotion.name] || 0) + 1;
        });
      });

      const topEmotion = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0];
      if (topEmotion && topEmotion[1] >= 5) {
        insights.push({
          type: 'emotion_pattern',
          title: 'Frequent Emotion',
          message: `You've been experiencing "${topEmotion[0]}" frequently. This might be worth exploring with a mental health professional.`,
          confidence: 0.7
        });
      }

      // Consistency insight
      const entryFrequency = moodEntries.length / (period === 'week' ? 7 : period === 'month' ? 30 : period === 'quarter' ? 90 : 365);
      if (entryFrequency < 0.5) {
        insights.push({
          type: 'consistency',
          title: 'Tracking Consistency',
          message: 'Consider logging your mood more regularly to get better insights into your patterns.',
          confidence: 0.9
        });
      } else if (entryFrequency > 0.8) {
        insights.push({
          type: 'consistency',
          title: 'Great Tracking Habit',
          message: 'You\'re doing an excellent job tracking your mood regularly. This consistency will help you identify patterns.',
          confidence: 0.9
        });
      }
    }

    res.json({
      success: true,
      data: {
        insights,
        period: period as string,
        totalEntries: moodEntries.length
      }
    });
  } catch (error) {
    console.error('Get mood insights error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while generating mood insights'
    });
  }
};


