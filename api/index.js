import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./api/routes/UserRoute.js";
import authRouter from "./api/routes/AuthRoute.js";
import listingRouter from "./api/routes/listingRoute.js";
import cookieParser from "cookie-parser";
import ServerlessHttp from "serverless-http";

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Export the Express app wrapped with serverless-http
export const handler = ServerlessHttp(app);
