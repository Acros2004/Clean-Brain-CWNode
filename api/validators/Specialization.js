import * as Yup from "yup";
import validateRequest from "../utils/ValidateRequest.js";

class  SpecializationValidator {
  static async getAllSpecializations(req, res, next) {
    return validateRequest(req, res, next);
  }
}

export default SpecializationValidator;
