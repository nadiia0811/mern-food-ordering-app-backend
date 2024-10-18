import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";



// path = /api/restaurant/search/:city
const router = express.Router();
router.get("/search/:city", param("city").isString()
                                         .trim()
                                         .notEmpty()
                                         .withMessage("City parameter must be a valid string"),
                                         RestaurantController.searchRestaurants);

router.get("/:restaurantId", param("restaurantId").isString()
                                                  .trim()
                                                  .notEmpty()
                                                  .withMessage("RestaurantId parameter must be a valid string"),
                                                   RestaurantController.getRestaurant);
export default  router;