import { Router } from "express";
import AdminController from "../controllers/Admin.js";
import AdminValidator from "../validators/Admin.js";

const router = Router();

router.post("/createpsychologist", AdminValidator.createPsychologist, AdminController.createPsychologist);
router.post("/updatepsychologist", AdminValidator.updatePsychologist, AdminController.updatePsychologist);
router.post("/createprocedure", AdminValidator.createProcedure, AdminController.createProcedure);
router.post("/updateprocedure", AdminValidator.updateProcedure, AdminController.updateProcedure);
router.post("/createvoucher", AdminValidator.createPsychologistVoucher,  AdminController.createPsychologistVoucher);
router.delete("/deletepsychologist/:Id_Psychologist", AdminValidator.deletePsychologist ,  AdminController.deletePsychologist);
router.delete("/deleteprocedure/:Id_Procedure", AdminValidator.deleteProcedure , AdminController.deleteProcedure);
router.delete("/deletereview/:Id_Review", AdminValidator.deleteReviewClient , AdminController.deleteReviewClient);

export default router;
