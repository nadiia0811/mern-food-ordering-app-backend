import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import myUserRoute from "./routs/MyUserRoute";


mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
        .then(() => console.log("Connected to db"))
        
const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
        res.send({message: "Health OK!"});
})

// /api/my/user
app.use("/api/my/user", myUserRoute);

app.listen(7000, () => {
console.log("Server is running on port 7000")
}) 