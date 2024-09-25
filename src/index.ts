import express, { NextFunction, Request, Response } from "express";
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
//app.use(cors());

const allowedOrigins = ["https://mern-food-ordering-app-frontend-c7fh.onrender.com", 
                        "http://localhost:5173"];

app.use(cors({
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true 
}));




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

//errors logging
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).json({ message: 'Internal Server Error' });
    });
    


