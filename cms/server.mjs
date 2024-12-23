import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cron from 'node-cron';
import authrouter from './routes/authroute.mjs'
import articlerouter from './routes/articlesroutes.mjs';
import Article from './model/Article.mjs';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/auth', authrouter);
app.use('/articles', articlerouter);

cron.schedule('0 * * * *', async () => {
  await Article.updateMany(
    { publishAt: { $lte: new Date() }, status: 'scheduled' },
    { status: 'published' }
  );
  console.log('Scheduled articles published');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
