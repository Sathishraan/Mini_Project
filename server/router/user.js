import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { Address } from '../Models/Address.js';
import { Fuser } from '../Models/Fuser.js';
import { User } from '../Models/User.js';

// Initialize both routers separately

const Userrouter = express.Router();
const Addressrouter = express.Router();
const Fuserrouter = express.Router();// Separate router for address routes

// Signup route
Userrouter.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log('Signup request body:', req.body);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        return res.status(201).json({
            status: true,
            message: 'User created successfully'
        });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'An error occurred during registration', error: error.message });
    }
});

Fuserrouter.post('/farmersign', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log('Signup request body:', req.body);

        const existingUser = await Fuser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Fuser({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        return res.status(201).json({
            status: true,
            message: 'User created successfully'
        });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'An error occurred during registration', error: error.message });
    }
});
// Login route
Userrouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not registered' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Password incorrect' });
        }

        if (!process.env.KEY) {
            throw new Error('JWT secret key is not defined');
        }

        const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        return res.json({
            status: true,
            message: 'Login successful'
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'An error occurred during login', error: error.message });
    }
});

Fuserrouter.post('/farmerlogin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Fuser.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not registered' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Password incorrect' });
        }

        if (!process.env.KEY) {
            throw new Error('JWT secret key is not defined');
        }

        const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        return res.json({
            status: true,
            message: 'Login successful'
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'An error occurred during login', error: error.message });
    }
});

Fuserrouter.post('/navbar', async (req, res) => {
    const { username } = req.body;
    console.log(req.body);


    try {
        const user = await Fuser.findOne({ username: { $regex: new RegExp('^' + username + '$', 'i') } });


        if (user) {
            res.json({
                username: user.username,
                message: 'User found!'
            });
        } else {
            res.json({
                username: null,
                message: 'User not found.'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});


// Forgot password route
Userrouter.post('/forgotpassword', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ status: false, message: "User not registered" });
        }

        let transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            auth: {
                user: process.env.EMAIL_USER, // Use the email from Brevo
                pass: process.env.EMAIL_PASS, // Use the password from Brevo
            },
        });

        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const resetLink = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

        let mailOptions = {
            from: `"AGRI TECH" <${process.env.EMAIL_ID}>`,
            to: email,
            subject: 'Password Reset Request',
            text: `Hello, please reset your password using this link: ${resetLink}`,
            html: `<p>Hello,</p><p>Please reset your password using this link: <a href="${resetLink}">Reset Password</a></p>`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ status: true, message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error during password reset:', error.message);
        return res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
});

// Reset password route
Userrouter.post('/resetPassword/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ status: true, message: "Password reset successful" });
    } catch (error) {
        console.error('Error during password reset:', error.message);
        return res.status(500).json({ status: false, message: 'Invalid or expired token' });
    }
});

// Address route
Addressrouter.post('/address', async (req, res) => {
    const { street, city, zip } = req.body;

    // Simple validation
    if (!street || !city || !zip) {
        return res.status(400).json({ error: 'Please fill in all required fields.' });

    }

    try {
        // Create a new address document
        const newAddress = new Address({ street, city, zip });


        // Save the address to the database
        await newAddress.save();

        res.status(200).json({ message: 'Address saved successfully.' });
    } catch (error) {


        console.error('Error saving address:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Export both routers
export { Addressrouter, Fuserrouter, Userrouter };

//post router









import mongoose from 'mongoose';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

import Post from '../Models/Posts.js';

const router = express.Router();


const mongoURI = 'mongodb+srv://sathishraana0701:WyyW2uImlU2MNB55@cluster0.7ajazsu.mongodb.net/Mini_Project';

// Create a connection
const conn = mongoose.createConnection(mongoURI);

let gfs;

conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'uploads' });

    gfs.on('file', (f) => {
        if (!f || !f._id) {
            console.error('File upload error: File object is undefined or missing _id');
        }
    });
});


// Multer GridFS Storage
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        console.log('File being processed:', file);
        return {
            bucketName: 'uploads',
            filename: `${Date.now()}-${file.originalname}`,
        };
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
        if (allowedTypes.includes(file.mimetype)) cb(null, true);
        else cb(new Error('Only images and videos are allowed'), false);
    },
});

export { conn, gfs, upload };



// Create a new post
router.post('/post', upload.single('file'), async (req, res) => {
    try {
        const { caption, price } = req.body;

        if (!req.file) return res.status(400).json({ message: 'File is required' });
        if (!caption || !price) return res.status(400).json({ message: 'Caption and price are required' });

        const post = new Post({
            caption,
            price,
            fileId: req.file.id, // Reference to the GridFS file
            fileType: req.file.mimetype,
        });

        await post.save();
        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ message: 'Failed to create post' });
    }
});


router.get('/post', async (req, res) => {
    console.log("Fetching all posts...");
    try {
        const posts = await Post.find().sort({ createdAt: -1 });

        if (posts.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
        }

        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ message: 'Failed to fetch posts' });
    }
});




// Serve file from GridFS
router.get('/post/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if `id` is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid file ID' });
        }

        const fileId = new mongoose.Types.ObjectId(id);

        // Create a GridFSBucket instance
        const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'uploads', // Make sure this matches your bucket name
        });

        const downloadStream = gfs.openDownloadStream(fileId);

        // Pipe the file to the response
        downloadStream.on('error', (err) => {
            console.error('Stream error:', err.message);
            res.status(404).json({ message: 'File not found' });
        });

        res.set('Content-Type', 'application/octet-stream'); // Set the default content type
        downloadStream.pipe(res);
    } catch (error) {
        console.error('Error fetching file:', error.message);
        res.status(500).json({ message: 'Failed to fetch file' });
    }
});


// Delete a post
router.delete('/post/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Remove file from GridFS
        const fileId = new mongoose.Types.ObjectId(post.fileId);
        gfs.delete(fileId, (err) => {
            if (err) return res.status(500).json({ message: 'Failed to delete file' });
        });

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error.message);
        res.status(500).json({ message: 'Failed to delete post' });
    }
});

export default router;