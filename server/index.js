// Import required modules
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import path from 'path';
import twilio from 'twilio';
import postRouter, { Addressrouter, Fuserrouter, Userrouter } from './router/user.js';
import { fileURLToPath } from 'url';

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware configuration
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for development; enable in production
  crossOriginResourcePolicy: { policy: "cross-origin" } // Allow cross-origin resource sharing
}));

// CORS configuration for API routes
app.use(cors({
  origin: (origin, callback) => {
    // Always allow requests regardless of origin
    callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Custom middleware for handling image requests in uploads folder
app.use('/uploads', (req, res, next) => {
  // Allow all origins for image requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle OPTIONS requests explicitly
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
}, express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res) => {
    // Ensure proper headers for static files
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));


// Standard middleware
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

// Route configurations
app.use('/auth', Userrouter);
app.use('/auth', Fuserrouter);
app.use('/auth', Addressrouter);
app.use('/auth', postRouter); // Separate endpoint for posts

// MongoDB connection with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

connectDB();

// Create HTTP server
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Ensure this matches your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('sendMessage', (msg) => {
    io.emit('receiveMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Test route
app.get('/test', (req, res) => res.send('Server is running'));

// Twilio configuration for OTP
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const userOTP = {}; // Store OTP temporarily in memory

app.post('/auth/send-otp', (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate random OTP
  userOTP[phone] = otp;

  client.messages
    .create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    })
    .then(() => res.status(200).json({ message: 'OTP sent successfully' }))
    .catch((error) => res.status(500).json({ error: 'Failed to send OTP', details: error.message }));
});

app.post('/auth/verify-otp', (req, res) => {
  const { phone, otp } = req.body;

  if (userOTP[phone] === otp) {
    delete userOTP[phone]; // Remove OTP after successful verification
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

// Error handling middleware
app.use((req, res) => res.status(404).json({ message: 'Resource not found', error: true }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An internal server error occurred', error: true });
});

// Start the server
const PORT = process.env.PORT || 7007;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
