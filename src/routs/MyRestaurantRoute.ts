import  express  from "express";
import MyRestaurantController from "../controllers/MyRestaurantController";
import multer from "multer";


const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024  // 5MB
    },
});

// path = api/my/restaurant
router.post("/", upload.single("imageFile"), MyRestaurantController.createMyRestaurant);

export default router;