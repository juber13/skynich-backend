import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import multer from 'multer'; // Uncomment if you're handling file uploads
import cloudinary from 'cloudinary'; // Uncomment if using Cloudinary for image uploads
dotenv.config();

mongoose
  .connect(process.env.URI)
  .then(() => console.log("DB is connected 🚀"))
  .catch((err) => console.error("DB connection error:", err));



cloudinary.v2.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_NAME,
});


const app = express();
app.use(cors());

// Properly configure body parsing middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file + "inside the multer");
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Import routes
import employeeRouter from "./routes/employeeRoutes.js";


app.use("/api" ,upload.single("image"), employeeRouter);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err);
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log("Server is running at port " + process.env.PORT);
});
