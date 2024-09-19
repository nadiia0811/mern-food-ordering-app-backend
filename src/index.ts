import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import myUserRoute from "./routs/MyUserRoute";
import {v2 as cloudinary} from "cloudinary";
import myRestaurantRoute from "./routs/MyRestaurantRoute";


mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
        .then(() => console.log("Connected to db"))
        
const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
        res.send({message: "Health OK!"});
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);


cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      })
      
app.listen(7000, () => {
console.log("Server is running on port 7000")
});


