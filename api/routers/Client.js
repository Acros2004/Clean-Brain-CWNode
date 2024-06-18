import { Router } from "express";
import ClientController from "../controllers/Client.js";
import TokenService from "../services/Token.js";
import ClientValidator from "../validators/Client.js";

const router = Router();

router.post("/update", ClientValidator.updateClientInfo, ClientController.updateClientInfo);
router.post("/booking", ClientValidator.createBookingClient, ClientController.createBookingClient);
router.get("/booking", ClientValidator.getBookingsClient, ClientController.getBookingsClient);
router.post("/review", ClientValidator.createReviewClient, TokenService.checkAccessNotAdmin, ClientController.createReviewClient);
router.delete("/deletereview/:Id_Review", ClientValidator.deleteReviewClient, ClientController.deleteReviewClient);
router.delete("/booking/:ID_Booking", ClientValidator.deleteBookingClient, ClientController.deleteBookingClient);

export default router;
