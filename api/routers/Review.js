import { Router } from "express";
import ReviewController from "../controllers/Review.js";
import ReviewValidator from "../validators/Review.js";


const router = Router();

router.get("/getAll", ReviewValidator.getAllReviews, ReviewController.getAllReviews);


export default router;
