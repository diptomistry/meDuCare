// /photo-gallery
import express from 'express';
import pool from '../../database.js'; // Import your database connection pool
import multer from 'multer';
import fs from 'fs';
import { promisify } from 'util';


const unlinkAsync = promisify(fs.unlink); // Convert fs.unlink to a promise-based function
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });

const router = express.Router();

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// POST /api/public/photo-gallery
router.post('/photo-gallery', upload.single('file'), async (req, res) => {
    const { title } = req.body;

   

    try {
        var filePath;
        if (req.file) {
            const host = req.hostname;
            const protocol = req.protocol;
            // Ensure that this path matches how you serve static files
            filePath = `${protocol}://${host}:8000/${req.file.path}`;
            console.log(filePath);
        }
        else {
            filePath = req.protocol + "://" + req.get('host') + '/public/' + 'avatar.jpg';
            console.log(filePath);
        }

        // Insert photo into PhotoGallery table
        const photoInsertQuery = 'INSERT INTO PhotoGallery (Title, Image) VALUES (?, ?)';
        const [result] = await pool.query(photoInsertQuery, [title,  filePath]);

        return res.status(200).json({ success: true, message: 'Photo added successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


// GET /api/public/photo-gallery

router.get('/photo-gallery', async (req, res) => {
    try {
        // Get all photos from PhotoGallery table
        const [photos] = await pool.query('SELECT * FROM PhotoGallery');
        return res.status(200).json({ success: true, photos });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}   );


// delete photo from gallery
router.delete('/photo-gallery/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        // Delete photo from PhotoGallery table
        const [photo] = await pool.query('SELECT Image FROM PhotoGallery WHERE PhotoID = ?', [id]);
        if (photo.length === 0) {
            return res.status(200).json({ success: false, message: 'Photo not found' });
        }
       // console.log(photo);

        // Now delete the photo record
        const [result] = await pool.query('DELETE FROM PhotoGallery WHERE PhotoID = ?', [id]);
        if (result.affectedRows === 0) {
                 res.status(200).json({ success: false, message: 'Photo not found' });
        }
        console.log(photo[0].Image);
        const filePath = new URL(photo[0].Image).pathname; // This extracts the pathname like `/public/fb399d7210b5f19d5b20e6465c9273ba`
        const fullPath = path.join(__dirname, '../../../', filePath); 
        console.log(fullPath);
        await unlinkAsync(fullPath);

        return res.status(200).json({ success: true, message: 'Photo deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

export default router;