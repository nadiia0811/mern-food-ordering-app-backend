import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

//POST api/my/restaurant
 const createMyRestaurant = async (req: Request, res: Response) => {
  
  try { 
    const existingRestaurant = await Restaurant.findOne({user: req.userId});
      if(existingRestaurant) {
       return  res.status(409).json({message: "User restaurant already exists"});
    }  

    const image = req.file as Express.Multer.File;   
    if (!image) {
      return res.status(400).json({ message: "No image file provided" });
    }
   
    const restaurant = new Restaurant(req.body);
    const imageUrl = await uploadImage(image);
    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
  
    await restaurant.save();
    console.log("Restaurant saved");
    res.status(201).send(restaurant);
  } catch (error) { 
    res.status(500).json({message: "An error occurred while creating the restaurant" });
  }
};


//GET api/my/restaurant
const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({user: req.userId});
    if(!restaurant) {
      return res.status(404).json({message: "Restaurant not found"});
    }
    res.json(restaurant);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({message: "Error fetching restaurant"});
  }
};

const updateMyRestaurant = async (req: Request, res: Response) => { 
  try {
    const restaurant = await Restaurant.findOne({user: req.userId}); 
    console.log(restaurant)
    if(!restaurant) {
      return res.status(400).json({message: "Restaurant didnt found"});
    }
   
    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.menuItems = req.body.menuItems;
    restaurant.cuisines = req.body.cuisines;
    restaurant.lastUpdated = new Date();

    if(req.file) {
     const imageUrl = await uploadImage(req.file as Express.Multer.File);
     restaurant.imageUrl = imageUrl;
    }

    await restaurant.save();
    res.status(200).send(restaurant);  

  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({message: "Something went wrong"});
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;   
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
}

export default {createMyRestaurant, getMyRestaurant,updateMyRestaurant};


 

