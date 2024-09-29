import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import myUserRoute from "./routs/MyUserRoute";
import { v2 as cloudinary } from "cloudinary";
import myRestaurantRoute from "./routs/MyRestaurantRoute";


mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to db"))
  .catch((error) => console.error("Failed to connect to db", error));

const app = express();
app.use(express.json());


const allowedOrigins = [
  "https://mern-food-ordering-app-frontend-c7fh.onrender.com", 
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],  
  credentials: true,  
  allowedHeaders: ['Content-Type', 'Authorization'],  
}));


app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health OK!" });
});


app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


app.listen(7000, () => {
  console.log("Server is running on port 7000");
});


app.use((err: Error, req: Request, res: Response) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
