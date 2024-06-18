import { Router } from "express";
import PsychologistController from "../controllers/Psychologist.js";
import PsychologistValidator from "../validators/Psychologist.js";

const router = Router();

router.get("/getAll", PsychologistValidator.getAllPsychologists, PsychologistController.getAllPsychologists);
router.get("/:Id_Psychologist", PsychologistValidator.getPsychologist, PsychologistController.getPsychologist);

export default router;
