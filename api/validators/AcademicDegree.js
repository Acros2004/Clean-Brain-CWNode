import * as Yup from "yup";
import validateRequest from "../utils/ValidateRequest.js";

class AcademicDegreeValidator {
  static async getAllAcademicDegree(req, res, next) {
    return validateRequest(req, res, next);
  }
}

export default AcademicDegreeValidator;
