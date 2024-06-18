import * as Yup from "yup";
import validateRequest from "../utils/ValidateRequest.js";

export const OnlyIdProcedureSchema = Yup.object({
    params: Yup.object({
        Id_Procedure: Yup.number().required()
    })   
})

class  ProcedureValidator {
  static async getAllProcedures(req, res, next) {
    return validateRequest(req, res, next);
  }
  static async getProcedure(req, res, next) {
    return validateRequest(req, res, next,OnlyIdProcedureSchema);
  }
}

export default ProcedureValidator;
