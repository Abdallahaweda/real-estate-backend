import express from "express";
import mongoose from "mongoose";
import dontenv from "dotenv";
import userRouter from "./routes/UserRoute.js";
import authRouter from "./routes/AuthRoute.js";
import listinRouter from "./routes/listingRoute.js";
import cookieParser from "cookie-parser";
import ServerlessHttp from "serverless-http";

const router = express.Router();

dontenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listinRouter);

// router.get("/demo", (req, res) => {
//   res.json({ message: "API is running" });
// });
// app.use("/.netlify/functions/", router);

// module.exports.handler = ServerlessHttp(app);
// const handler = ServerlessHttp(app);
// module.exports.handler = async (event, context) => {
//   const result = await handler(event, context);
//   return result;
// };

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
