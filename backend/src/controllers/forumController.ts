import { Request, Response } from 'express';
import ForumPost from '../models/ForumPost';

// Get forum posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    const {
      category,
      page = 1,
      limit = 20,
      sort = 'newest'
    } = req.query;

    const query: any = {};

    if (category) query.category = category;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    let sortOptions: any = { createdAt: -1 };
    switch (sort) {
      case 'oldest':
        sortOptions = { createdAt: 1 };
        break;
      case 'most_liked':
        sortOptions = { likes: -1 };
        break;
      case 'most_replied':
        sortOptions = { 'replies.length': -1 };
        break;
    }

    const posts = await ForumPost.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit as string))
      .lean();

    const total = await ForumPost.countDocuments(query);

    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          currentPage: parseInt(page as string),
          totalPages: Math.ceil(total / parseInt(limit as string)),
          totalPosts: total,
          hasNext: skip + posts.length < total,
          hasPrev: parseInt(page as string) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching posts'
    });
  }
};

// Get post by ID
export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await ForumPost.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      data: { post }
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching post'
    });
  }
};

// Create post
export const createPost = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id;
    const postData = {
      ...req.body,
      author: userId,
      likes: 0,
      replies: []
    };

    const post = new ForumPost(postData);
    await post.save();

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: { post }
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating post'
    });
  }
};

// Update post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!._id;

    const post = await ForumPost.findOneAndUpdate(
      { _id: id, author: userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found or you do not have permission to update it'
      });
    }

    res.json({
      success: true,
      message: 'Post updated successfully',
      data: { post }
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating post'
    });
  }
};

// Delete post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!._id;

    const post = await ForumPost.findOneAndDelete({ _id: id, author: userId });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found or you do not have permission to delete it'
      });
    }

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting post'
    });
  }
};

// Like post
export const likePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await ForumPost.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      message: 'Post liked successfully',
      data: { likes: post.likes }
    });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while liking post'
    });
  }
};

// Reply to post
export const replyToPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!._id;
    const { content, isAnonymous } = req.body;

    const reply = {
      content,
      author: userId,
      isAnonymous: isAnonymous || false,
      likes: 0,
      createdAt: new Date()
    };

    const post = await ForumPost.findByIdAndUpdate(
      id,
      { $push: { replies: reply } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      message: 'Reply added successfully',
      data: { post }
    });
  } catch (error) {
    console.error('Reply to post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding reply'
    });
  }
};

// Search posts
export const searchPosts = async (req: Request, res: Response) => {
  try {
    const { q, page = 1, limit = 20 } = req.query;

    const query = {
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q as string, 'i')] } }
      ]
    };

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const posts = await ForumPost.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit as string))
      .lean();

    const total = await ForumPost.countDocuments(query);

    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          currentPage: parseInt(page as string),
          totalPages: Math.ceil(total / parseInt(limit as string)),
          totalPosts: total,
          hasNext: skip + posts.length < total,
          hasPrev: parseInt(page as string) > 1
        }
      }
    });
  } catch (error) {
    console.error('Search posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching posts'
    });
  }
};

// Get categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = [
      { name: 'general', label: 'General Discussion' },
      { name: 'anxiety', label: 'Anxiety Support' },
      { name: 'depression', label: 'Depression Support' },
      { name: 'recovery', label: 'Recovery Stories' },
      { name: 'crisis', label: 'Crisis Support' },
      { name: 'tips', label: 'Tips & Strategies' },
      { name: 'success', label: 'Success Stories' }
    ];

    res.json({
      success: true,
      data: { categories }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories'
    });
  }
};
