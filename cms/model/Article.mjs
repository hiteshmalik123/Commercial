import mongoose from 'mongoose';

// Define the schema for articles
const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is required
  },
  content: {
    type: String,
    required: true, // Content is required
  },
  author: {
    type:String, // Reference to a user
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

// Create the model
const createArticle = mongoose.model('Article', ArticleSchema);

export default createArticle;
