import { Router } from "express";
import AcademicDegreeController from "../controllers/AcademicDegree.js";
import AcademicDegreeValidator from "../validators/AcademicDegree.js";

const router = Router();

router.get("/getAll",AcademicDegreeValidator.getAllAcademicDegree, AcademicDegreeController.getAllAcademicDegree);

export default router;
