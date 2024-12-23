import multer from 'multer';
import sharp from 'sharp';
import Article from '../model/Article.mjs';

const upload = multer({ dest: '/upload' });

export const newArticle = async (req, res) => {
    const { title, content, category, status, author } = req.body;
    
    // Log the authenticated user's details
    console.log('Authenticated user:', req.user);  

    // Use the authenticated user's ID as the author
    const article = new Article({ 
        title, 
        content, 
        category, 
        status, 
        author
    });

    try {
        if (req.file) {
            const image = await sharp(req.file.path).resize(300, 200).toBuffer();
            article.image = image;
        }

        await article.save();
        res.status(201).send('New article created');
    } catch (error) {
        console.log('Article creation error:', error);  // Log the detailed error
        res.status(500).send('Error creating article');
    }
};
