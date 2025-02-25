// src/Backend/index.js
import express from 'express';
import cors from 'cors';
import config from './config/env.js';
import connectDB from './config/db.js';

// Import routes
import userRoutes from './routes/userRoutes.js';

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Allows requests from other domains
app.use(express.json()); // Parses incoming JSON

// Routes
app.use('/api/users', userRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, ) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start the server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
});