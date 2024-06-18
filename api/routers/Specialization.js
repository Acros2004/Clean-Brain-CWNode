import { Router } from "express";
import SpecializationController from "../controllers/Specialization.js";
import SpecializationValidator from "../validators/Specialization.js";

const router = Router();

router.get("/getAll", SpecializationValidator.getAllSpecializations, SpecializationController.getAllSpecializations);

export default router;
