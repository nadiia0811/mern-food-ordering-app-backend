import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import OrderController from "../controllers/OrderController";

const route = express.Router();

route.get("/", jwtParse, jwtCheck, OrderController.getMyOrders);

route.post("/checkout/create-checkout-session",
           jwtCheck, 
           jwtParse,
           OrderController.createCheckoutSession);

route.post("/checkout/webhook", OrderController.stripeWebhookHandler)           

export default route;           