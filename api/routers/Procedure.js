import { Router } from "express";
import ProcedureController from "../controllers/Procedure.js";
import ProcedureValidator from "../validators/Procedure.js";

const router = Router();

router.get("/getAll", ProcedureValidator.getAllProcedures, ProcedureController.getAllProcedures);
router.get("/:Id_Procedure", ProcedureValidator.getProcedure, ProcedureController.getProcedure);

export default router;
