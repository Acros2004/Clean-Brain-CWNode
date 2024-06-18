import * as Yup from "yup";
import validateRequest from "../utils/ValidateRequest.js";

export const OnlyIdPsychologistSchema = Yup.object({
    params: Yup.object({
        Id_Psychologist: Yup.number().required()
    })   
})

class  PsychologistValidator {
  static async getAllPsychologists(req, res, next) {
    return validateRequest(req, res, next);
  }
  static async getPsychologist(req, res, next) {
    return validateRequest(req, res, next,OnlyIdPsychologistSchema);
  }
}

export default PsychologistValidator;
