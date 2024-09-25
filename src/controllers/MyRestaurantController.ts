import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({user: req.userId});
    if(existingRestaurant) {
      return res.status(409).json({message: "User restaurant already exists"});
    }

    const image = req.file as Express.Multer.File;

    if (!image) {
      return res.status(400).json({ message: "No image file provided" });
    }
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    console.log(uploadResponse);
   
    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = uploadResponse.url;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
  
    await restaurant.save();
    console.log("Restaurant saved");
    res.status(201).send(restaurant);

  } catch (error) {
    res.status(500).json({message: "An error occurred while creating the restaurant" });
  }
}

export default {createMyRestaurant};

 

