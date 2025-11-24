import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Test route
app.get('/', (req, res) => res.send('API is running'));

// Start server
const start = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

start();
